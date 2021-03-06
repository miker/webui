import {
  ApplicationRef,
  Component,
  Injector,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import * as _ from 'lodash';
import {Subscription} from 'rxjs';

import {RestService, WebSocketService} from '../../../../services/';
import {
  FieldConfig
} from '../../../common/entity/entity-form/models/field-config.interface';
import { T } from '../../../../translate-marker';

@Component({
  selector : 'system-certificate-csr',
  template : `<entity-form [conf]="this"></entity-form>`
})

export class CertificateCSRComponent {

  protected resource_name: string = 'system/certificate/csr';
  protected route_success: string[] = [ 'system', 'certificates' ];
  protected isEntity: boolean = true;
  protected fieldConfig: FieldConfig[] = [
    {
      type : 'input',
      name : 'cert_name',
      placeholder : T('Identifier'),
      tooltip: T('Enter an alphanumeric name for the certificate.\
                  Underscore (_), and dash (-) characters are allowed.'),
      required: true,
      validation : [ Validators.required ]
    },
    {
      type : 'select',
      name : 'cert_key_length',
      placeholder : T('Key Length'),
      tooltip: T('<i>2048</i> is the minimum recommended value.'),
      options : [
        {label : '1024', value : 1024},
        {label : '2048', value : 2048},
        {label : '4096', value : 4096},
      ],
    },
    {
      type : 'select',
      name : 'cert_digest_algorithm',
      placeholder : T('Digest Algorithm'),
      tooltip: T('Use the default value unless a different algorithm is\
                  required.'),
      options : [
        {label : 'SHA1', value : 'SHA1'},
        {label : 'SHA224', value : 'SHA224'},
        {label : 'SHA256', value : 'SHA256'},
        {label : 'SHA384', value : 'SHA384'},
        {label : 'SHA512', value : 'SHA512'},
      ],
      value : 'SHA256',
    },
    {
      type : 'select',
      name : 'cert_country',
      placeholder : T('Country'),
      tooltip: T('Associate a country with the <b>Organization</b>.'),
      options : [],
    },
    {
      type : 'input',
      name : 'cert_state',
      placeholder : T('State'),
      tooltip: T('The state or province of the <b>Organization</b>.'),
    },
    {
      type : 'input',
      name : 'cert_city',
      placeholder : T('Locality'),
      tooltip: T('The specific location of the <b>Organization</b>.'),
    },
    {
      type : 'input',
      name : 'cert_organization',
      placeholder : T('Organization'),
      tooltip: T('Enter the name of the entity controlling this\
                  certificate.'),
    },
    {
      type : 'input',
      name : 'cert_email',
      placeholder : T('Email'),
      tooltip: T('Enter an email address for the person responsible for\
                  the CA'),
      validation : [ Validators.email ]
    },
    {
      type : 'input',
      name : 'cert_common',
      placeholder : T('Common Name'),
      tooltip: T('Enter the fully-qualified hostname (FQDN) of the\
                  system. This name must be unique within a\
                  certificate chain.'),
    },
    {
      type : 'textarea',
      name : 'cert_san',
      placeholder: T('Subject Alternate Names'),
      tooltip: T('Enter additional space-separated domains to enable\
                  multi-domain support.')
    }
  ];
  private cert_country: any;

  afterInit(entityEdit: any) {
    this.ws.call('notifier.choices', ['COUNTRY_CHOICES']).subscribe( (res) => {
      // console.log(res);
      this.cert_country = _.find(this.fieldConfig, {'name' : 'cert_country'});
      res.forEach((item) => {
        this.cert_country.options.push(
          { label : item[1], value : item[0]}
        );
      });
    });
  }

  constructor(
      protected router: Router,
      protected route: ActivatedRoute,
      protected rest: RestService,
      protected ws: WebSocketService,
      protected _injector: Injector,
      protected _appRef: ApplicationRef
  ) {}
}
