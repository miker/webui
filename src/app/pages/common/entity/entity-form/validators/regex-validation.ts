import { AbstractControl } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms'

export const IPV4_REGEXP: RegExp = new RegExp(/^(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})(.(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})){3}$/);
export const IPV6_REGEXP: RegExp = new RegExp(/^([0-9a-f]|:){1,4}(:([0-9a-f]{0,4})*){1,7}$/i);

export function regexValidator(regexString: RegExp) {

  let thisControl: FormControl;

  return function regexValidate(control: FormControl) {

    if (!control.parent) {
      return null;
    }

    // Initializing the validator.
    if (!thisControl) {
      thisControl = control;
    }

    if(thisControl.value == "" || thisControl.value == undefined) {
      return null;
    }

    if (!regexString.test(thisControl.value)) {
      return {regex : true};
    }

    return null;
  }
}