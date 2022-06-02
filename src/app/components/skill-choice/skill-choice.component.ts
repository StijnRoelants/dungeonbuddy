import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-skill-choice',
  templateUrl: './skill-choice.component.html',
  styleUrls: ['./skill-choice.component.scss'],
})

export class SkillChoiceComponent implements OnInit {

  public passingNumber: number;
  public passingList: string[];
  public passingCheckList: string[];
  amount = 0;
  selectedAmount = 0;
  skillChoices = [];
  choices: string[] = [];
  done = true;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.amount = this.passingNumber;
    this.generateList();
  }

  async dismissModalAndSave() {
    for (const skill of this.skillChoices) {
      if (skill.isChecked === true) {
        this.choices.push(skill.val);
      }
    }
    await this.modalController.dismiss(this.choices);
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }

  generateList(): void {
    for (const skill of this.passingList) {
      if (!this.passingCheckList.includes(skill)){
        this.skillChoices.push({val: skill, isChecked: false});
      }
    }
  }

  check(skill) {
    if (!skill.isChecked) {
      this.selectedAmount++;
      skill.isChecked = true;
    } else {
      this.selectedAmount--;
      skill.isChecked = false;
    }
  }
}
