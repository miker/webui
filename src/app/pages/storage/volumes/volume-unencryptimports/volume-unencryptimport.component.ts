import { ApplicationRef, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

import { RestService, WebSocketService } from '../../../../services/';
import { EntityUtils } from '../../../common/entity/utils';
import { EntityJobComponent } from '../../../common/entity/entity-job/entity-job.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FieldConfig } from '../../../common/entity/entity-form/models/field-config.interface';
import { ZfsPoolData } from '../volumes-list/volumes-list.component';
import { DialogService } from 'app/services/dialog.service';
import { AppLoaderService } from '../../../../services/app-loader/app-loader.service';
import { Formconfiguration } from '../../../common/entity/entity-form/entity-form.component';
import { T } from '../../../../translate-marker';
import { Validators } from '@angular/forms';

@Component({
  selector: 'volume-unencryptimport',
  templateUrl: './volume-unencryptimport.component.html'
})

/** 
 * Note this class has a missing apip for the post.. Which in the old UI is
 * 
 * RL:http://192.168.1.3/legacy/storage/auto-import/?X-Progress-ID=6013ea8d-2871-4b9d-8098-60b192beb23f
 * 
 * 
 */
export class VolumeUnencryptImportListComponent implements Formconfiguration {
  public route_success: string[] = ['storage', 'pools'];
  public isEntity = true;
  public isNew = true;
  public fieldConfig: FieldConfig[] = [];
  public initialized = true;
  public saveSubmitText = T("Decrypt Pool");

  constructor(protected router: Router, protected route: ActivatedRoute,
    protected rest: RestService, protected ws: WebSocketService,
    protected _injector: Injector, protected _appRef: ApplicationRef,
    protected dialogService: DialogService,
    protected loader: AppLoaderService) {

    this.fieldConfig = [
      {
        type: 'upload',
        name: 'key',
        placeholder: T('Encryption Key File'),
        tooltip: T('Encryption key used to decrypt pools to be imported.'),
        acceptedFiles: ',.key',
        fileLocation: '',
        validation: [Validators.required],
        required: true
        
      },
      {
        type: 'input',
        inputType: 'password',
        name: 'passphrase',
        label: T('Passphrase'),
        placeholder: T('Passphrase'),
        tooltip: T('Geli Passphrase'),
        validation: [Validators.required],
        required: true
      }
    ];


  }

  ngAfterViewInit(): void {

    this.rest.get("storage/volume_import", {}).subscribe((res) => {
      res.data.forEach((volume) => {

        this.fieldConfig[0].options.push({
          label: volume.id,
          value: volume.id
        });
        this.initialized = true;

      }, (res) => {
        this.dialogService.errorReport(T("Error getting pool data"), res.message, res.stack);
        this.initialized = true;
      });


    });
  }

  customSubmit(value) {
    this.loader.open();
    console.log("VALUE", value);
    return this.rest.post("_upload", { body: JSON.stringify(value) }, false ).subscribe((restPostResp) => {
      console.log("restPostResp", restPostResp);
      this.loader.close();
      this.dialogService.Info(T("Uploaded key"), T("Uploaded Key"));

      this.router.navigate(new Array('/').concat(
        this.route_success));
    }, (res) => {
      this.loader.close();
      this.dialogService.errorReport(T("Error decrypting pool"), res.message, res.stack);
    });
  }

}
