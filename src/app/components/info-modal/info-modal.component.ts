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


  constructor(public modalController: ModalController) {

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
          'Strength: measuring physical power<br>' +
          'Dexterity: measuring agility<br>' +
          'Constitution: measuring endurance<br>' +
          'Intelligence: measuring reasoning and memory<br>' +
          'Wisdom: measuring Perception and Insight<br>' +
          'Charisma: measuring force of Personality<br>' +
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
      break;
      }
      case 'SkillsInfo': {
        this.title = 'Skills';
        // eslint-disable-next-line max-len
        this.message = 'Each ability covers a broad range of capabilities, including skills that a character or a monster can be proficient in. A skill represents a specific aspect of an ability score, and an individual’s proficiency in a skill demonstrates a focus on that aspect. (A character’s starting skill proficiencies are determined at character creation, and a monster’s skill proficiencies appear in the monster’s stat block.)<br>' +
          '<br>' +
          // eslint-disable-next-line max-len
          'For example, a Dexterity check might reflect a character’s attempt to pull off an acrobatic stunt, to palm an object, or to stay hidden. Each of these aspects of Dexterity has an associated skill: Acrobatics, Sleight of Hand, and Stealth, respectively. So a character who has proficiency in the Stealth skill is particularly good at Dexterity checks related to sneaking and hiding.<br>' +
          '<br>' +
          // eslint-disable-next-line max-len
          'The skills related to each ability score are shown in the following list. (No skills are related to Constitution.) See an ability’s description in the later sections of this section for examples of how to use a skill associated with an ability.<br>' +
          '<br>' +
          '<u>Strength</u><br>' +
          '• Athletics<br>' +
          '<br>' +
          '<u>Dexterity</u><br>' +
          '• Acrobatics<br>' +
          '• Sleight of Hand<br>' +
          '• Stealth<br>' +
          '<br>' +
          '<u>Intelligence</u><br>' +
          '• Arcana<br>' +
          '• History<br>' +
          '• Investigation<br>' +
          '• Nature<br>' +
          '• Religion<br>' +
          '<br>' +
          '<u>Wisdom</u><br>' +
          '• Animal Handling<br>' +
          '• Insight<br>' +
          '• Medicine<br>' +
          '• Perception<br>' +
          '• Survival<br>' +
          '<br>' +
          '<u>Charisma</u><br>' +
          '• Deception<br>' +
          '• Intimidation<br>' +
          '• Performance<br>' +
          '• Persuasion';
      }
    }}

  }
  async dismissModal() {
      await this.modalController.dismiss();
  }
}
