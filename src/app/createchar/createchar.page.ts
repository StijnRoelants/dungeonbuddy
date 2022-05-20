import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import {Character} from '../../classes/character';
import { RaceType } from '../../classes/race';
import {PlayerClass} from '../../classes/classes';
import {ModalController} from '@ionic/angular';
import {InfoModalComponent} from '../components/info-modal/info-modal.component';
import {Backgrounds} from '../../classes/backgrounds';
import {Alignments} from '../../classes/alignment';
import {Skills} from '../../classes/skills';
import {CharAvatarService} from '../services/char-avatar.service';

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
  charXP = 0;
  selectedRace: string;
  selectedClass: string;
  selectedBG: string;
  selectedAlign: string;
  raceList = Object.values(RaceType) as RaceType[];
  classList = Object.values(PlayerClass) as PlayerClass[];
  bgList = Object.values(Backgrounds) as Backgrounds[];
  alignmentList = Object.values(Alignments) as Alignments[];

  constructor(private modalController: ModalController, private routerOutlet: IonRouterOutlet,
              public charAvatar: CharAvatarService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

    this.newCharacter = new Character();
    this.newSkills = new Skills();
    this.charName = '';
    this.charBackground = '';
    this.charXP = 0;
    this.selectedRace =  '';
    this.selectedClass = '';
    this.selectedBG = '';
    this.selectedAlign = '';
    delete(this.charAvatar.avatar);
    console.log(this.charAvatar.avatar);
  }

  generateRandomAbilities() {

    const abilityScore = this.generateRandoms(6,4);

    this.newCharacter.strength = abilityScore[0];
    this.newCharacter.dexterity= abilityScore[1];
    this.newCharacter.constitution = abilityScore[2];
    this.newCharacter.intelligence = abilityScore[3];
    this.newCharacter.wisdom = abilityScore[4];
    this.newCharacter.charisma = abilityScore[5];
    //console.log(abilityScore);
    abilityScore.length = 0;
  }

  generateRandoms(i: number, x: number): number[] {

    const rolls: number[]  = [];
    const abilityScore: number [] = [];

    for ( i = 0; i < 6; i++){
      for ( x = 0; x < 4; x++) {
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


  async presentModal(type: string) {
    const modal = await this.modalController.create({
      component: InfoModalComponent,
      componentProps: {passingType: type},
      presentingElement: this.routerOutlet.nativeEl,
      canDismiss: true,
    });
    return await modal.present();

  }

}
