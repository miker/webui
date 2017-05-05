import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { UUID } from 'angular2-uuid';

interface ExistingNotification {
  id: string;
  message: string;
  type: string;
}

@Injectable()
export class FreeNASNotifierService {
  public existingNotifications: ExistingNotification[];
  private notifier: NotifierService;

  public constructor( notifierService: NotifierService ) {
    this.notifier = notifierService;
    this.existingNotifications = [];
  }

  notify(notifyType: string, msg: string):string {
    // if type is outside what is allowed set it to default
    if (['default', 'error', 'info', 'success', 'warning'].indexOf(notifyType) < 0) {
      notifyType = 'default';
    }
    let notifyId = UUID.UUID();
    this.notifier.notify( notifyType, msg, notifyId );
    this.existingNotifications.push({
      id: notifyId,
      message: msg,
      type: notifyType
    });
    return notifyId;
  }

}