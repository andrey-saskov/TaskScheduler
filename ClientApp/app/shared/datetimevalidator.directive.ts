import { Directive, OnChanges, Input, SimpleChanges } from '@angular/core';    
import { NG_VALIDATORS, Validator, ValidatorFn, Validators, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[datetimeValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: DateTimeValidatorDirective, multi: true}]
})
export class DateTimeValidatorDirective implements Validator, OnChanges {
  @Input() datetimeValidator: string;
  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
      const re = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})$/;
      this.valFn = dateTimeValidator(re);
  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}

export function dateTimeValidator(dateRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const date = control.value;
    const no = dateRe.test(date);
    return no ? {'invaliddate': {date}} : null;
  };
}
