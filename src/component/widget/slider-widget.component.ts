import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { WidgetComponent } from './widget.component';

@Component({
    template: `
        <div [formGroup]="form" class="d1-form-field-container">
            <section>
                <label [attr.for]="'df_' + data.key">{{data.label}}
                    <span *ngIf="data.required">*</span>
                </label>
                <mat-slider [id]="'df_' + data.key"
                            [min]="data.min"
                            [max]="data.max"
                            [step]="data.step"
                            [thumb-label]="data.thumbLabel"
                            [vertical]="data.vertical"
                            [value]="data.value"
                            [disabled]="data.disabled"
                            (change)="onChange($event)">
                </mat-slider>
            </section>
        </div>
    `
})
export class SliderWidgetComponent implements WidgetComponent, OnInit {
    @Input() data: any;
    @Input() form: FormGroup;

    ngOnInit(): void {
        this.data.min = 0;
        this.data.max = 100;
        this.data.step = 1;
        this.data.thumbLabel = true;
        this.data.tickInterval = 1;
        this.data.vertical = false;
    }

    onChange(event): void {
        this.data.value = event.value;
        this.form.get(this.data.key).setValue(event.value);
    }
}
