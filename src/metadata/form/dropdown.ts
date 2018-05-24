import { FormField } from './form-field';

export class Dropdown extends FormField<string> {
    controlType = 'dropgdown';
    options: {key: string, value: string}[] = [];

    constructor(data: {} = {}) {
        super(data);
        this.options = data['options'] || [];
    }
}
