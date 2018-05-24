
import { FormField } from './form-field';

export class Textarea extends FormField<string> {
    controlType = 'textarea';

    constructor(options: {} = {}) {
        super(options);
    }
}
