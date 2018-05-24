import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { WidgetComponent } from './widget.component';

@Component({
    template: `
        <div [style.display]="data.hidden ? 'none' : 'flex'" [formGroup]="form" class="d1-form-field-container">
            <mat-form-field>
                <input matInput #input currencyMask (focus)="showHint = true" (blur)="showHint = false"
                       [options]="data.options"
                       [id]="'df_' + data.key"
                       [formControlName]="data.key"
                       [placeholder]="data.label"
                       [type]="data.type"
                       [attr.maxlength]="data.maxlength"
                       [required]="data.required">
                <mat-hint [class.show-hint]="showHint">{{data.hint}}</mat-hint>
                <mat-error *ngIf="form.controls[data.key].invalid">{{getErrorMessage()}}</mat-error>
            </mat-form-field>
        </div>
    `
})
export class CurrencyFieldWidgetComponent implements WidgetComponent, OnInit {
    @Input() data: any;
    @Input() form: FormGroup;
    showHint = false;

    ngOnInit(): void {
    }

    getErrorMessage(): string {
        return this.form.controls[this.data.key].hasError('required') && 'Campo requerido.' || '';
    }
}
