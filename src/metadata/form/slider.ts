
import { FormField } from './form-field';

export class Slider extends FormField<number> {
    controlType = 'slider';
    min: number;
    max: number;
    step: number;
    thumbLabel: boolean;
    tickInterval: number;
    vertical: boolean;

    constructor(options: {} = {}) {
        super(options);
        this.min = options['min'] || 0;
        this.max = options['max'] || 100;
        this.step = options['step'] || 1;
        this.thumbLabel = options['thumbLabel'] === undefined ? true : options['thumbLabel'];
        this.tickInterval = options['tickInterval'] || 1;
        this.vertical = options['vertical'] === undefined ? false : options['vertical'];
    }
}