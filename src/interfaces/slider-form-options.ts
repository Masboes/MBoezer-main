import {BaseFormOptions} from './base-form-options';


export interface SliderFormOptions extends BaseFormOptions {
    min: number;
    max: number;
    step?: number;
}
