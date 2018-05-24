import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { WidgetComponent } from './widget.component';

@Component({
    template: `
        <div [formGroup]="form" class="d1-form-field-container">
            <mat-form-field>
                <textarea matInput
                      [id]="'df_' + data.key"
                      [formControlName]="data.key"
                      [placeholder]="data.label"
                      [required]="data.required">
                </textarea>
            </mat-form-field>
        </div>
    `
})
export class TextareaWidgetComponent implements WidgetComponent {
    @Input() data: any;
    @Input() form: FormGroup;
}
