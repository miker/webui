import 'rxjs/add/operator/map';

import {Injectable, EventEmitter} from '@angular/core';
import {Http} from '@angular/http';
import {Observable, Subject, Subscription} from 'rxjs/Rx';

import {Tooltip} from '../pages/common/tooltip';
import {TOOLTIPS} from '../pages/common/tooltips';

@Injectable()
export class TooltipsService {
  getTooltips(): Promise<Tooltip[]> { return Promise.resolve(TOOLTIPS); }

  getTooltip(tooltip_id): Promise<Tooltip> {
    for (var i = TOOLTIPS.length - 1; i >= 0; i--) {
      if (TOOLTIPS[i]['id'] == tooltip_id) {
        return Promise.resolve(TOOLTIPS[i]);
      }
    }
  }

  guideRoute = new EventEmitter<string>();

  passMessage(message: string) {
    console.log('Logged from tooltips.service - ' + message);
  }
}