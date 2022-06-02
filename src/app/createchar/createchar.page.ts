import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import { Character } from '../../classes/character';
import { RaceType } from '../../classes/race';
import {PlayerClass} from '../../classes/classes';
import {ModalController} from '@ionic/angular';
import {InfoModalComponent} from '../components/info-modal/info-modal.component';
import {Backgrounds} from '../../classes/backgrounds';
import {Alignments} from '../../classes/alignment';
import {Skills} from '../../classes/skills';
import {CharAvatarService} from '../services/char-avatar.service';
import {DatabaseService} from '../services/database.service';
import {AppRoutingModule} from '../app-routing.module';
import {ApiService} from '../services/api.service';
import {CharacterService} from '../services/character.service';
import {SkillChoiceComponent} from '../components/skill-choice/skill-choice.component';
import {Capacitor} from '@capacitor/core';

@Component({
  selector: 'app-createchar',
  templateUrl: './createchar.page.html',
  styleUrls: ['./createchar.page.scss'],
})
export class CreatecharPage implements OnInit {

  newCharacter: Character = new Character();
  newSkills: Skills = new Skills();
  charName: string;
  charBackground: string;
  selectedRace: string;
  selectedClass: string;
  selectedBG: string;
  selectedAlign: string;
  raceList = Object.values(RaceType) as RaceType[];
  classList = Object.values(PlayerClass) as PlayerClass[];
  bgList = Object.values(Backgrounds) as Backgrounds[];
  alignmentList = Object.values(Alignments) as Alignments[];
  canModif = false;
  canSkills = false;
  canSave = false;
  startingProficiencies: string[] = [];
  selectableProficienciesClass: string[] = [];
  selectableProfCountClass = 0;

  constructor(private modalController: ModalController, private routerOutlet: IonRouterOutlet,
              public charAvatar: CharAvatarService, public dbService: DatabaseService, public approuter: AppRoutingModule,
              public apiService: ApiService, public charService: CharacterService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.newCharacter = new Character();
    this.newSkills = new Skills();
    this.charName = '';
    this.charBackground = '';
    this.selectedRace =  '';
    this.selectedClass = '';
    this.selectedBG = '';
    this.selectedAlign = '';
    delete(this.charAvatar.avatar);
    this.startingProficiencies = [];
    this.selectableProficienciesClass = [];
    this.selectableProfCountClass = 0;
  }

  isNative(): boolean {
    return Capacitor.isNativePlatform();
  }

  async generateRandomAbilities(): Promise<void>  {

    this.clearAll();
    const abilityScore = this.generateRandoms();
    console.log(abilityScore);
    this.implementAbilities(abilityScore);
    await this.getRaceData();
    await this.getClassData();
    abilityScore.length = 0;
    this.canModif = true;
  }

  generateRandoms(): number[] {

    const rolls: number[]  = [];
    const abilityScore: number [] = [];

    for (let i = 0; i < 6; i++){
      for (let x = 0; x < 4; x++) {
        const score = Math.floor(Math.random() * 6) + 1;
        rolls.push(score);
      }
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      rolls.sort(function(y,z) {
        return z-y;
      });
      //console.log(rolls);
      const finalSum = rolls[0] + rolls[1] + rolls[2];
      rolls.length = 0;
      abilityScore.push(finalSum);
    }

    return abilityScore;
  }

  implementModifs(): void {
    this.newCharacter.strengthModif = this.checkForModifs(this.newCharacter.strength);
    this.newCharacter.dexterityModif = this.checkForModifs(this.newCharacter.dexterity);
    this.newCharacter.constitutionModif = this.checkForModifs(this.newCharacter.constitution);
    this.newCharacter.intelligenceModif = this.checkForModifs(this.newCharacter.intelligence);
    this.newCharacter.wisdomModif = this.checkForModifs(this.newCharacter.wisdom);
    this.newCharacter.charismaModif = this.checkForModifs(this.newCharacter.charisma);

    this.newCharacter.stStrength += this.newCharacter.strengthModif;
    this.newCharacter.stDexterity += this.newCharacter.dexterityModif;
    this.newCharacter.stConstitution += this.newCharacter.constitutionModif;
    this.newCharacter.stIntelligence += this.newCharacter.intelligenceModif;
    this.newCharacter.stWisdom += this.newCharacter.wisdomModif;
    this.newCharacter.stCharisma += this.newCharacter.charismaModif;

    if (this.newCharacter.playerClass === 'Barbarian') {
      this.newCharacter.armorClass = 10 + this.newCharacter.dexterityModif + this.newCharacter.constitutionModif;
    } else if (this.newCharacter.playerClass === 'Monk') {
      this.newCharacter.armorClass = 10 + this.newCharacter.dexterityModif + this.newCharacter.wisdomModif;
    } else {
      this.newCharacter.armorClass = 10 + this.newCharacter.dexterityModif;
    }
    this.newCharacter.maxHitPoints = this.newCharacter.constitutionModif + this.newCharacter.hitDie;
    this.newCharacter.hitPoints = this.newCharacter.maxHitPoints;
    this.newCharacter.proficiencyBonus = Math.floor( 2 + ((this.newCharacter.level - 1)/4));
    this.canSkills = true;
    console.log(this.newCharacter);
    console.log(this.startingProficiencies);
  }

  async presentModal(type: string) {
    const modal = await this.modalController.create({
      component: InfoModalComponent,
      componentProps: {passingType: type},
      presentingElement: this.routerOutlet.nativeEl,
      canDismiss: true,
    });
    return await modal.present();
  }

  async presentSkillModal(amount: number, list: string[], check: string[]) {
    const modal = await this.modalController.create({
      component: SkillChoiceComponent,
      componentProps: {passingNumber: amount, passingList: list, passingCheckList: check},
      presentingElement: this.routerOutlet.nativeEl,
      canDismiss: true,
    });
    modal.onDidDismiss()
      .then((data) => {
        for (const x of data.data){
          this.startingProficiencies.push(x);
        }
      });
    await modal.present();
    return modal.onDidDismiss();
  }

  async createCharacter(): Promise<void> {
    this.newCharacter.playerClass = this.selectedClass;
    this.newCharacter.race = this.selectedRace;
    this.newCharacter.background = this.selectedBG;
    this.newCharacter.alignment = this.selectedAlign;
    this.newCharacter.name = this.charName;
    this.newCharacter.picture = this.charAvatar.avatar.base64String;
    this.newCharacter.skills = this.newSkills;
    this.newCharacter.userID = '';
    this.newCharacter.gold = this.charService.calculateStartingGold(this.selectedClass);
    console.log(this.newCharacter);
    await this.dbService.createCharacter(this.newCharacter);
    this.approuter.openCharacterPage();
  }

  checkIfReadyForRandom(): boolean {
    return (this.selectedAlign === '' || this.selectedBG === '' || this.selectedClass === '' || this.selectedRace === '');
  }

  checkIfCanCreate(): boolean {
    return (this.charName === '');
  }

  async getRaceData(): Promise<void> {
    const race = await this.apiService.getRace(this.selectedRace.toLowerCase());

    race.subscribe(x => {
      console.log(x);
      this.newCharacter.speed = x.speed;
      if (x.starting_proficiencies.length > 0 && x.name === 'Elf') {
        for (const p of x.starting_proficiencies) {
          this.startingProficiencies.push(p.name.substring(7));
        }
      }
      for (const m of x.ability_bonuses) {
          switch (m.ability_score.name) {
            case 'STR': {
              this.newCharacter.strength += m.bonus;
              break;
            }
            case 'DEX': {
              this.newCharacter.dexterity += m.bonus;
              break;
            }
            case 'CON': {
              this.newCharacter.constitution += m.bonus;
              break;
            }
            case 'INT': {
              this.newCharacter.intelligence += m.bonus;
              break;
            }
            case 'WIS': {
              this.newCharacter.wisdom += m.bonus;
              break;
            }
            case 'CHA': {
              this.newCharacter.charisma += m.bonus;
              break;
            }
          }
        }
    });
    race.subscribe().unsubscribe();
  }

  async getClassData(): Promise<void> {
    const playerclass = await this.apiService.getClass(this.selectedClass.toLowerCase());

    playerclass.subscribe(x => {
      console.log(x);
      this.newCharacter.hitDie = x.hit_die;
      if (x.proficiency_choices.length > 0) {
        this.selectableProfCountClass = x.proficiency_choices[0].choose;
        for (const p of x.proficiency_choices[0].from) {
          this.selectableProficienciesClass.push(p.name.substring(7));
        }
        console.log(this.selectableProfCountClass + ' ' + this.selectableProficienciesClass);
      }
      for (const m of x.saving_throws) {
        switch (m.name) {
          case 'STR': {
            this.newCharacter.stStrength += 2;
            break;
          }
          case 'DEX': {
            this.newCharacter.stDexterity += 2;
            break;
          }
          case 'CON': {
            this.newCharacter.stConstitution += 2;
            break;
          }
          case 'INT': {
            this.newCharacter.stIntelligence += 2;
            break;
          }
          case 'WIS': {
            this.newCharacter.stWisdom += 2;
            break;
          }
          case 'CHA': {
            this.newCharacter.stCharisma += 2;
            break;
          }
        }
      }
    });
    playerclass.subscribe().unsubscribe();
  }

  async implementSkills(): Promise<void> {
    await this.charService.getBackgroundData(this.selectedBG, this.startingProficiencies);
    console.log(this.startingProficiencies);
    await this.presentSkillModal(this.selectableProfCountClass, this.selectableProficienciesClass, this.startingProficiencies);
    this.canSkills = false;
    this.canModif = false;
    this.charService.generateSkills(this.startingProficiencies, this.newSkills, this.newCharacter);
  }

  public clearAll(): void {
    this.newSkills = new Skills();
    this.newCharacter.strengthModif = 0;
    this.newCharacter.stStrength = 0;
    this.newCharacter.strength = 0;
    this.newCharacter.wisdomModif = 0;
    this.newCharacter.stWisdom = 0;
    this.newCharacter.wisdom = 0;
    this.newCharacter.charismaModif = 0;
    this.newCharacter.stCharisma = 0;
    this.newCharacter.charisma = 0;
    this.newCharacter.intelligenceModif = 0;
    this.newCharacter.stIntelligence = 0;
    this.newCharacter.intelligence = 0;
    this.newCharacter.dexterityModif = 0;
    this.newCharacter.stDexterity = 0;
    this.newCharacter.dexterity = 0;
    this.newCharacter.constitutionModif = 0;
    this.newCharacter.stConstitution = 0;
    this.newCharacter.constitution= 0;
    this.startingProficiencies = [];
    this.selectableProficienciesClass = [];
    this.selectableProfCountClass = 0;
  }

  private checkForModifs(value: number): number {
    let modifValue = 0;
    switch (true) {
      case value <= 3: {
        modifValue = -4;
        break;
      }
      case value <= 5: {
        modifValue = -3;
        break;
      }
      case value <= 7: {
        modifValue = -2;
        break;
      }
      case value <= 9: {
        modifValue = -1;
        break;
      }
      case value <= 11: {
        modifValue = 0;
        break;
      }
      case value <= 13: {
        modifValue = 1;
        break;
      }
      case value <= 15: {
        modifValue = 2;
        break;
      }
      case value <= 17: {
        modifValue = 3;
        break;
      }
      case value <= 19: {
        modifValue = 4;
        break;
      }
      case value <= 21: {
        modifValue = 5;
        break;
      }
      case value <= 23: {
        modifValue = 6;
        break;
      }
    }
    console.log(value + '-' + modifValue);
    return modifValue;
  }

  private implementAbilities(abilityScore: number[]): void {
    this.newCharacter.strength += abilityScore[0];
    this.newCharacter.dexterity += abilityScore[1];
    this.newCharacter.constitution += abilityScore[2];
    this.newCharacter.intelligence += abilityScore[3];
    this.newCharacter.wisdom += abilityScore[4];
    this.newCharacter.charisma += abilityScore[5];
  }
}
