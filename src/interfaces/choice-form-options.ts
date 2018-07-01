import {BaseFormOptions} from './base-form-options';

export interface ChoiceFormOptions extends BaseFormOptions {
    expanded: boolean;
    choices: { [s: string]: string; }; // key is the value returned, value is the label presented to the user
}
