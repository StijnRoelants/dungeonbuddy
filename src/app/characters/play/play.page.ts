import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../services/database.service';
import {Unsubscribe} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import {Character} from '../../../classes/character';


@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  character: Character = new Character();
  imgURL = '';
  charID?: string = undefined;
  private unsubscribe: Unsubscribe;


  constructor(public dbService: DatabaseService, public activatedRoute: ActivatedRoute) { }

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


  private async loadData(): Promise<void> {
    this.unsubscribe = await this.dbService.getCharacterByID(this.charID, x => {
      this.imgURL = `data:image/png;base64,${x.picture}`;
      this.character = x;
    });
    return;
  }
}
