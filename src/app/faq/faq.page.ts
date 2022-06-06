import { Component, OnInit } from '@angular/core';
import {Character} from '../../classes/character';
import {Subscription} from 'rxjs';
import {DatabaseService} from '../services/database.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  characterList: Character[] = [] ;
  userID: string;
  subscription: Subscription = new Subscription();
  gotCharacters = false;

  constructor(public dbService: DatabaseService, public router: Router, public authService: AuthService) { }

  async ionViewWillEnter(){
    await this.getData();
  }

  ionViewDidLeave() {
    /*console.log('I quit!');*/
    this.subscription.unsubscribe();
  }

  async getData(): Promise<void> {
    this.subscription = this.authService.getUser().subscribe(x => {
      if (x !== undefined){
        this.getCharacters().then(() => {
          if (this.characterList.length > 0){
            this.gotCharacters = true;
            console.log(this.gotCharacters);
          }
        });
      } else {
        this.router.navigate(['/', 'login']);
      }
    });
  }

  async getCharacters(): Promise<void> {
    await this.dbService.getCharactersByUserID().then(x => this.characterList = x);
  }

  ngOnInit(): void {
  }

}
