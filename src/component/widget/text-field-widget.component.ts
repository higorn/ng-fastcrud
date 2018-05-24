import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { WidgetComponent } from './widget.component';

@Component({
    template: `
        <div [style.display]="data.hidden ? 'none' : 'flex'" [formGroup]="form" class="d1-form-field-container">
            <mat-form-field>
                <input matInput #input (focus)="showHint = true" (blur)="showHint = false"
                       [id]="'df_' + data.key"
                       [formControlName]="data.key"
                       [placeholder]="data.label"
                       [type]="data.type"
                       [attr.maxlength]="data.maxlength"
                       [mask]="data.mask"
                       [required]="data.required">
                <mat-hint [class.show-hint]="showHint">{{data.hint}}</mat-hint>
                <mat-error *ngIf="form.controls[data.key].invalid">{{getErrorMessage()}}</mat-error>
            </mat-form-field>
        </div>
    `
})
export class TextFieldWidgetComponent implements WidgetComponent, OnInit {
    @Input() data: any;
    @Input() form: FormGroup;
    @ViewChild('input') input: ElementRef;
    showHint = false;

    ngOnInit(): void {
        this.input.nativeElement.min = this.data.min;
        this.input.nativeElement.max = this.data.max;
    }

    getErrorMessage(): string {
        return this.form.controls[this.data.key].hasError('required') && 'Campo requerido.' || '';
    }
}
