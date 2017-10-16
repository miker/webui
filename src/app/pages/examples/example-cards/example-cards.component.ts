import { Component, OnInit, Input } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { EntityModule } from '../../common/entity/entity.module';
import { RestService } from '../../../services/';

interface CardConfig {
  header: string;
  body: string;
  footer: string;
}

interface UserProfile {
  username: string;
  fullname: string;
  uid: string;
  gid: string;
  homeDirectory: string;
  shell: string;
}

@Component({
  selector: 'example-cards',
  templateUrl: './example-cards.component.html',
  styleUrls: ['./example-cards.component.css']
})
export class ExampleCardsComponent implements OnInit {

  @Input() cards = [];
  constructor(protected rest: RestService) {}

  ngOnInit() {
    this.getUserList();
    //this.init(16);
    //this.gridCols = 1;
  }

  getUserList() {
    this.rest.get('account/users', {}).subscribe((res) => {
      console.log(res);
      for(var i = 0; i < res.total; i++){
	var card: UserProfile = {
	  username: res.data[i].bsdusr_username,
	  fullname: res.data[i].bsdusr_full_name,
	  uid: res.data[i].bsdusr_uid,
	  gid: res.data[i].bsdusr_group,
	  homeDirectory: res.data[i].bsdusr_home,
	  shell: res.data[i].bsdusr_shell
	}
	console.log(card);
	this.cards.push(card);
      }
    })
  }

  private init(num:number){
    for(var i = 0; i < num; i++){
      var card: CardConfig = {
	header: "HEADER: Card #" + i,
	body: "",
	footer: ""
      }
      this.cards.push(card);
    }
  }
}
