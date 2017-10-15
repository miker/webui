import { Component, OnInit, Input } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { EntityModule } from '../../common/entity/entity.module';

interface CardConfig {
  header: string;
  body: string;
  footer: string;
}

@Component({
  selector: 'example-cards',
  templateUrl: './example-cards.component.html',
  styleUrls: ['./example-cards.component.css']
})
export class ExampleCardsComponent implements OnInit {

  @Input() cards = [];
  constructor() {}

  ngOnInit() {
    this.init(16);
    //this.gridCols = 1;
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
