import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { EntityModule } from '../../common/entity/entity.module';
import { RestService } from '../../../services/';


interface UserProfile {
  index:number;
  isFlipped:boolean;
  username: string;
  fullname: string;
  id: string;
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
  public tpl = "users";

  constructor(protected rest: RestService){}

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.rest.get('account/users', {}).subscribe((res) => {
      console.log(res);
      for(var i = 0; i < res.data.length; i++){
	var card: UserProfile = {
	  index: i,
	  isFlipped:false,
	  username: res.data[i].bsdusr_username,
	  fullname: res.data[i].bsdusr_full_name,
	  id: res.data[i].id,
	  uid: res.data[i].bsdusr_uid,
	  gid: res.data[i].bsdusr_group,
	  homeDirectory: res.data[i].bsdusr_home,
	  shell: res.data[i].bsdusr_shell
	}
	if(res.data[i].bsdusr_full_name == ""){
	  card.fullname = res.data[i].bsdusr_username;
	}
	console.log(card);
	this.cards.push(card);
      }
    })
  }

  toggleForm(state, card){
    // load #cardBack template with code here
    card.isFlipped = state;
  }
}
