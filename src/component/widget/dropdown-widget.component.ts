import { Component, Input, OnInit } from '@angular/core';

import { WidgetComponent } from './widget.component';
import { FormGroup } from '@angular/forms';
import { OptionsProvider } from '../../service/options-provider';
import { Option } from '../../model/option';

@Component({
    template: `
        <div [formGroup]="form" class="d1-form-field-container">
            <mat-form-field>
                <mat-select [id]="'df_' + data.key"
                            [formControlName]="data.key"
                            [placeholder]="data.label"
                            [required]="data.required">
                    <mat-option *ngFor="let opt of options" [value]="opt.value">{{opt.label}}</mat-option>
                </mat-select>
            </mat-form-field>
        </div>
    `
})
export class DropdownWidgetComponent implements WidgetComponent, OnInit {
    @Input() data: any;
    @Input() form: FormGroup;
    options: Option[] = [];

    constructor(private optionProvider: OptionsProvider) {
    }

    ngOnInit(): void {
        this.optionProvider.getOptions(this.data.key).then(options => this.options = options);
    }
}
