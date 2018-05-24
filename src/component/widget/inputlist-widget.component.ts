import { Component, Injector, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';
import { WidgetValueResolver } from '../../service/widget-value-resolver';
import { AbstractWidgetComponent } from './abstract-widget-component';

const COMMA = 188;

@Component({
    template: `
        <div [formGroup]="form" class="d1-form-field-container">
            <mat-form-field [floatPlaceholder]="data.value.length > 0 ? 'always' : 'auto'">
                <input matInput #input [id]="'df_' + data.key" (focus)="showHint = true" (blur)="showHint = false"
                       [mask]="data.mask"
                       [attr.maxlength]="data.maxlength"
                       [matChipInputFor]="chipList"
                       [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
                       [matChipInputAddOnBlur]="addOnBlur"
                       (matChipInputTokenEnd)="add($event)"
                       [required]="data.required"
                       [disabled]="formControl.disabled">
                <mat-placeholder>{{data.label}}</mat-placeholder>
                <mat-hint [class.show-hint]="showHint">{{data.hint}}</mat-hint>
                <mat-chip-list #chipList class="mat-chip-list-stacked d1-input-list"
                               aria-orientation="vertical">
                    <mat-chip *ngFor="let val of data.value"
                              [selectable]="selectable"
                              [removable]="!formControl.disabled"
                              (remove)="remove(val)">
                        <label>
                            <i class="fa fa-cog fa-spin fa-fw"
                               [style.display]="isLoading(val) ? 'inline-block' : 'none'"></i>
                            <div [class.mat-error]="val.error">
                                <i *ngIf="val.error" class="fa fa-exclamation-circle fa-fw"></i>
                                {{val.displayName}}
                            </div>
                        </label>
                        <mat-icon matChipRemove *ngIf="!formControl.disabled">cancel</mat-icon>
                    </mat-chip>
                </mat-chip-list>
            </mat-form-field>
        </div>
    `
})
export class InputlistWidgetComponent extends AbstractWidgetComponent implements OnInit {
    @Input() data: any;
    @Input() form: FormGroup;
    selectable = true;
    addOnBlur = true;
    showHint = false;
    separatorKeysCodes = [ENTER, COMMA];
    errorMessage: string;

    constructor(
        private valueResolver: WidgetValueResolver,
        injector: Injector,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.data.value = this.data.value || [];
        this.data.value.forEach(val => {
            if (typeof val === 'string') {
                this.resolveValue(val, false);
            } else {
                setTimeout(() => this.emitEvent('postAdd', val), 100);
            }
        });
    }

    get formControl(): AbstractControl {
        return this.form.get(this.data.key);
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            this.resolveValue(value, true);
        }

        if (input) {
            input.value = '';
        }
    }

    remove(val: any): void {
        const index = this.data.value.indexOf(val);
        if (index >= 0) {
            this.data.value.splice(index, 1);
        }
        this.emitEvent('postRemove', val);
    }

    isLoading(val: string): boolean {
        return typeof (val) === 'string';
    }

    private resolveValue(value: string, fromAdd: boolean): void {
        this.errorMessage = '';
        /*
         * Não permite valores duplicados
         */
        if (this.findDuplicated(value)) {
            return;
        }

        if (fromAdd) {
            this.data.value.push(value);
        }
        this.valueResolver.resolve(this.data, this.form, value.trim()).then(result => {
            const i = this.data.value.indexOf(value);
            this.data.value.splice(i, 1, result);
            this.form.controls[this.data.key].setValue(this.data.value);
            this.emitEvent('postAdd', value);
        }, error => {
            const i = this.data.value.indexOf(value);
            this.data.value.splice(i, 1, {error: true, displayName: error});
        });
    }

    private findDuplicated(value: string) {
        return this.data.value.find(val => {
            for (let key of Object.keys(val)) {
                if (val[key] === value) {
                    return true;
                }
            }
            return false;
        });
    }
}
