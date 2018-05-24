import { Component, Input } from '@angular/core';
import { FormField } from '../../metadata/form/form-field';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'd1-form-field',
    templateUrl: './form-field.component.html'
})
export class FormFieldComponent {
    @Input() field: FormField<any>;
    @Input() form: FormGroup;

    // get isValid() { return this.form-view.controls[this.field.key].valid; }
}
