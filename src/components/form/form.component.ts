import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Form} from '../../models/form/form';
import {FormType} from '../../enums/form/form-type';
import {debounceTime} from "rxjs/operators";
import {ChoiceFormOptions} from '../../interfaces/form/choice-form-options';
import {FormField} from '../../interfaces/form/form-field';
import {SliderFormOptions} from '../../interfaces/form/slider-form-options';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  @Input() public form: Form;
  @Input() private debounceTime: number = 100; // time to wait when the user has changed something
  @Output() private valueChanges: EventEmitter<object> = new EventEmitter<object>();

  // fix for Angular templating enums
  public FormType = FormType;

  ngOnInit(): void {
    // output when form value has changed
    this.form.valueChanges.pipe(debounceTime(this.debounceTime)).subscribe((value: object) => {
      if (this.form.isValid()) {
        this.valueChanges.next(value);
      }
    });
  }

  getChoiceOptions(field: FormField): ChoiceFormOptions {
    return field.options as ChoiceFormOptions;
  }

  getSliderOptions(field: FormField): SliderFormOptions {
    return field.options as SliderFormOptions;
  }
}
