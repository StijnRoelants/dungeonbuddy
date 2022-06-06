import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../services/database.service';
import {Unsubscribe} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import {Character} from '../../../classes/character';
import { AlertController } from '@ionic/angular';
import {CharacterService} from '../../services/character.service';


@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  character: Character = new Character();
  imgURL = '';
  charID?: string = undefined;
  message = '';
  showMessageBox = false;
  alertResult: number;
  percentage: number;
  private unsubscribe: Unsubscribe;


  constructor(public dbService: DatabaseService, public activatedRoute: ActivatedRoute, public alertController: AlertController,
              public charService: CharacterService) { }

  async ngOnInit() {
    await this.getID();
    await this.loadData();
  }

  getID(): void {
    const result = this.activatedRoute.snapshot.paramMap.get('id');

    if (result !== undefined){
      this.charID = result;
    }
  }

    calculateXP(): void {
    if (this.character.xp === 0) {
      this.percentage = 0;
      return;
    }
    this.percentage = parseInt(String(this.character.xp),10) / parseInt(String(this.character.xpToNextLevel),10);
    return;
  }

  async characterHeal(): Promise<void> {
    await this.showAlert('heal');
    let result = parseInt(String(this.character.hitPoints), 10) + parseInt(String(this.alertResult), 10);
    if (isNaN(result)) {
      result = this.character.hitPoints;
    }
    if (result > this.character.maxHitPoints) {
      result = this.character.maxHitPoints;
    }
    this.character.hitPoints = result;
    await this.dbService.updateCharacter(this.charID, this.character);
    this.alertResult = 0;
  }

  async characterDamage(): Promise<void> {
    await this.showAlert('hit');
    let result = parseInt(String(this.character.hitPoints), 10) - parseInt(String(this.alertResult), 10);
    if (isNaN(result)) {
      result = 0;
    }
    if (result < 0) {
      result = 0;
    }
    this.character.hitPoints = result;
    await this.dbService.updateCharacter(this.charID, this.character);
    this.alertResult = 0;
  }

  async characterXP(): Promise<void> {
    await this.showAlert('xp');
    let result = parseInt(String(this.character.xp), 10) + parseInt(String(this.alertResult), 10);
    if (isNaN(result)) {
      result = 0;
    }
    if (result >= this.character.xpToNextLevel){
      this.charService.levelUp(this.character);
    }
    this.character.xp = result;
    await this.dbService.updateCharacter(this.charID, this.character);
    this.alertResult = 0;
  }

  private async showAlert(type: string): Promise<void> {
    let header = '';
    let message = '';
    let done = false;

    switch (type) {
      case 'heal': {
        header = 'Healing';
        message = 'Heal for:';
        break;
      }
      case 'hit': {
        header = 'Take damage';
        message = 'Smack! you got hit for:';
        break;
      }
      case 'xp': {
        header = 'Earned XP';
        message = 'Amount of XP earned:';
        break;
      }
    }

      const alert  = await this.alertController.create(({
        inputs: [
          {
            name: 'amount',
            type: 'number',
            placeholder: '0'
          }
        ],
        header,
        message,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Ok',
            handler: value => {
              if (value.amount > 0){
                this.alertResult = value.amount;
                done = true;
              } else {
                this.alertResult = 0;
                done = true;
              }
            },
            role: 'destructive'
          }
        ]
      }));
      await alert.present();

    // eslint-disable-next-line arrow-body-style
      await alert.onDidDismiss().then(() => {
        return;
      });
  }

  private async loadData(): Promise<void> {
    this.unsubscribe = await this.dbService.getCharacterByID(this.charID, x => {
      this.imgURL = `data:image/png;base64,${x.picture}`;
      this.character = x;
      this.calculateXP();
    });
    return;
  }
}
