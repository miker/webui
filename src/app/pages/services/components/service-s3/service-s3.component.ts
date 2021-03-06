import {ApplicationRef, Component, Injector, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import * as _ from 'lodash';
import {Subscription} from 'rxjs';
import {  DialogService } from '../../../../services/';

import {
  RestService,
  SystemGeneralService,
  WebSocketService
} from '../../../../services/';
import {
  FieldConfig
} from '../../../common/entity/entity-form/models/field-config.interface';
import {
  matchOtherValidator
} from '../../../common/entity/entity-form/validators/password-validation';
import { T } from '../../../../translate-marker';

@Component({
  selector : 's3-edit',
  template : `<entity-form [conf]="this"></entity-form>`,
  providers : [ SystemGeneralService ]
})

export class ServiceS3Component implements OnInit {
  protected resource_name: string = 'services/s3';
  protected addCall: string = 's3.update';
  protected route_success: string[] = [ 'services' ];
  private certificate: any;
  private ip_address: any;


  public fieldConfig: FieldConfig[] = [
    {
      type : 'select',
      name : 'bindip',
      placeholder : T('IP Address'),
      tooltip: T('The IP address on which to run the S3 service; 0.0.0.0\
       sets the server to listen on all addresses.'),
      options : [
        {label:'0.0.0.0', value: '0.0.0.0'}
      ]
    },
    {
      type : 'input',
      name : 'bindport',
      placeholder : T('Port'),
      tooltip: T('TCP port on which to provide the S3 service (default 9000).'),
      value: '9000'
    },
    {
      type : 'input',
      name : 'access_key',
      placeholder : T('Access Key'),
      tooltip: T('Enter the S3 username.'),
      required: true,
      validation: [Validators.minLength(5), Validators.maxLength(20), Validators.required]
    },
    {
      type : 'input',
      name : 'secret_key',
      placeholder : T('Secret Key'),
      tooltip: T('The password to be used by connecting S3 systems; must\
       be at least 8 but no more than 40 characters long.'),
      inputType : 'password',
      required : true,
      validation: [Validators.minLength(8), Validators.maxLength(40), Validators.required]
    },
    {
      type : 'input',
      name : 'secret_key2',
      placeholder : T('Confirm S3 Key'),
      tooltip: T('Re-enter the S3 password to confirm.'),
      inputType : 'password',
      required: true,
      validation : [ matchOtherValidator('secret_key'), Validators.required ],
    },
    {
      type : 'explorer',
      initial: '/mnt',
      explorerType: 'directory',
      name : 'storage_path',
      placeholder : T('Disk'),
      tooltip: T('S3 filesystem directory.'),
      required: true,
      validation: [ Validators.required]
    },
    {
      type : 'checkbox',
      name : 'browser',
      placeholder : T('Enable Browser'),
      tooltip: T('Enable the web user interface for the S3 service.'),
    },
/*  This is to be enabled when the mode feature is finished and fully implemented for S3
    {
      type : 'select',
      name : 'mode',
      placeholder : 'Mode',
      options : [
        {label : 'local'}
      ]
    },
*/
    {
      type : 'select',
      name : 'certificate',
      placeholder : T('Certificate'),
      tooltip : T('Add an SSL certificate to be used for secure S3\
       connections. To create a certificate, use <b>System/Certificates</b>.'),
      options : []
    },
  ];

  constructor(protected router: Router, protected route: ActivatedRoute,
              protected rest: RestService, protected ws: WebSocketService,
              protected _injector: Injector, protected _appRef: ApplicationRef,
              protected systemGeneralService: SystemGeneralService, private dialog:DialogService ) {}

  ngOnInit() {}

  afterInit(entityForm: any) {
    this.systemGeneralService.getCertificates().subscribe((res)=>{
      this.certificate = _.find(this.fieldConfig, {name:'certificate'});
      if (res.length > 0) {
        res.forEach(item => {
          this.certificate.options.push({label:item.name, value: item.id});
        });
      }
    });
    this.systemGeneralService.getIPChoices().subscribe(res=>{
      this.ip_address = _.find(this.fieldConfig,{name:'bindip'});
      if (res.length > 0) {
        res.forEach(element => {
          this.ip_address.options.push({label:element[1], value: element[0]});
        });
      }
    });
    entityForm.ws.call('s3.config').subscribe((res)=>{
      entityForm.formGroup.controls['bindip'].setValue(res.bindip);
      entityForm.formGroup.controls['bindport'].setValue(res.bindport);
      entityForm.formGroup.controls['access_key'].setValue(res.access_key);
      entityForm.formGroup.controls['storage_path'].setValue(res.storage_path);
      entityForm.formGroup.controls['browser'].setValue(res.browser);
      entityForm.formGroup.controls['mode'].setValue(res.mode);
      entityForm.formGroup.controls['certificate'].setValue(res.certificate);
    })
    entityForm.submitFunction = this.submitFunction;

  }

  clean(value) {
    delete value['secret_key2'];

    return value;
  }

  submitFunction(this: any, entityForm: any,){

    return this.ws.call('s3.update', [entityForm]);

  }
}
