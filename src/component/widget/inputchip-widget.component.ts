import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';

import { WidgetComponent } from './widget.component';
import { WidgetValueResolver } from '../../service/widget-value-resolver';

@Component({
    template: `
        <div [formGroup]="form" class="d1-form-field-container">
            <mat-form-field [floatPlaceholder]="data.value ? 'always' : 'auto'">
                <input matInput [id]="'df_' + data.key" (focus)="showHint = true" (blur)="showHint = false"
                       [mask]="data.mask"
                       [style.display]="data.value ? 'none': 'block'"
                       [matChipInputFor]="chip"
                       [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
                       [matChipInputAddOnBlur]="addOnBlur"
                       (matChipInputTokenEnd)="add($event)"
                       [required]="data.required"
                       [disabled]="formControl.disabled">
                <mat-placeholder>{{data.label}}</mat-placeholder>
                <mat-hint [class.show-hint]="showHint">{{data.hint}}</mat-hint>
                <mat-chip-list #chip class="mat-chip-list-stacked d1-input-list"
                               aria-orientation="vertical">
                    <mat-chip *ngIf="data.value"
                              [selectable]="selectable"
                              [removable]="!formControl.disabled"
                              (remove)="remove()">
                        <label>
                            <i class="fa fa-cog fa-spin fa-fw"
                               [style.display]="loaded ? 'none' : 'inline-block'"></i>
                            <div [style.display]="errorMessage ? 'inline-block' : 'none'" class="mat-error">
                                <i class="fa fa-exclamation-circle fa-fw"></i>
                                {{errorMessage}}
                            </div>
                            {{getDisplayName()}}
                        </label>
                        <mat-icon matChipRemove *ngIf="!formControl.disabled">cancel</mat-icon>
                    </mat-chip>
                </mat-chip-list>
            </mat-form-field>
        </div>
    `
})
export class InputchipWidgetComponent implements WidgetComponent, OnInit {
    @Input() data: any;
    @Input() form: FormGroup;
    selectable = true;
    addOnBlur = true;
    showHint = false;
    separatorKeysCodes = [ENTER];
    loaded = false;
    errorMessage: string;

    constructor(private valueResolver: WidgetValueResolver) {
    }

    ngOnInit(): void {
        if (this.data.value) {
            this.resolveValue(this.data.value);
        }
    }

    get formControl(): AbstractControl {
        return this.form.get(this.data.key);
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            this.resolveValue(value);
        }

        if (input) {
            input.value = '';
        }
    }

    remove(): void {
        this.data.value = null;
    }

    getDisplayName(): string {
        if (typeof this.data.value === 'string' || typeof this.data.value === 'number') {
            return this.data.value;
        }

        return this.data.value.displayName;
    }

    private resolveValue(value: string): void {
        this.loaded = false;
        this.data.value = ' ';
        this.errorMessage = '';
        this.valueResolver.resolve(this.data, this.form, value.trim()).then(data => {
            this.data.value = data;
            this.form.controls[this.data.key].setValue(this.data.value);
            this.loaded = true;
        }, error => {
            this.errorMessage = error;
            this.loaded = true;
        });
    }
}
