import { FormField } from './form-field';

export class TextField extends FormField<string> {
    controlType = 'textfield';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}
