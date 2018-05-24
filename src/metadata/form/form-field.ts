import { Type } from '@angular/core';

import { Visibility } from '../field.annotation';

export class FormField<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    disabled: boolean;
    order: number;
    visibility: Visibility;
    col: number;
    width: string;
    controlType: string;

    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        disabled?: boolean,
        order?: number,
        visibility?: Visibility,
        col?: number,
        width?: string,
        controlType?: string,
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.disabled = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.visibility = options.visibility;
        this.col = options.col;
        this.width = options.width;
        this.controlType = options.controlType || '';
    }
}
