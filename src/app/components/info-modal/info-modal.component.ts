import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent implements OnInit {

  public passingType: string;
  message = '';
  title = '';


  constructor(private modalController: ModalController) {

  }

  ngOnInit() {

    if (this.passingType !== null)
    {switch (this.passingType) {
      case 'BasicInfo': {
        this.title = 'Basics';
        this.message = 'Start with the basics, choose a name for your character, a race, class background and XP';
        break;
      }
      case 'AbilitieInfo':{
        this.title = 'Abilities';
        this.message = 'Six Abilities provide a quick description of every creature’s physical and mental characteristics:<br>' + '<br>' +
          'Strength, measuring physical power<br>' +
          'Dexterity, measuring agility<br>' +
          'Constitution, measuring endurance<br>' +
          'Intelligence, measuring reasoning and memory<br>' +
          'Wisdom, measuring Perception and Insight<br>' +
          'Charisma, measuring force of Personality<br>' +
          '<br>' +
          // eslint-disable-next-line max-len
          'Is a character muscle-bound and insightful? Brilliant and charming? Nimble and hardy? Ability Scores define these qualities—a creature’s assets as well as weaknesses.<br>' +
          '<br>' +
          // eslint-disable-next-line max-len
          'The three main rolls of the game—the ability check, the saving throw, and the Attack roll—rely on The Six Ability Scores. The book’s Introduction describes the basic rule behind these rolls: roll a d20, add an ability modifier derived from one of The Six Ability Scores, and compare the total to a target number.';
        break;
      }
      case 'stInfo': {
        this.title = 'Saving Throws';
        // eslint-disable-next-line max-len
        this.message = 'A saving throw–also called a save–represents an attempt to resist a spell, a trap, a poison, a disease, or a similar threat. You don’t normally decide to make a saving throw; you are forced to make one because your character or monster is at risk of harm.';
      }
    }}

  }
  async dismissModal() {
      await this.modalController.dismiss();
  }
}
