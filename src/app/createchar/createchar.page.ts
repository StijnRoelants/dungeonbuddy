import { Component, OnInit } from '@angular/core';
import {Character} from '../../classes/character';
import { RaceType } from '../../classes/race';
import {PlayerClass} from '../../classes/classes';
import {ModalController} from '@ionic/angular';
import {InfoModalComponent} from '../components/info-modal/info-modal.component';
import {Backgrounds} from '../../classes/backgrounds';
import {Alignments} from '../../classes/alignment';

@Component({
  selector: 'app-createchar',
  templateUrl: './createchar.page.html',
  styleUrls: ['./createchar.page.scss'],
})
export class CreatecharPage implements OnInit {

  newCharacter: Character = new Character();
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

  constructor(private modalController: ModalController) { }

  ngOnInit() {

  }

  ionViewWillEnter() {

    this.newCharacter = new Character();
    this.charName = '';
    this.charBackground = '';
    this.charXP = 0;
    this.selectedRace =  '';
    this.selectedClass = '';
    this.selectedBG = '';
    this.selectedAlign = '';

  }

  async presentModal(type: string) {
    const modal = await this.modalController.create({
      component: InfoModalComponent,
      componentProps: {passingType: type},
      canDismiss: true,
    });
    return await modal.present();

  }


}
