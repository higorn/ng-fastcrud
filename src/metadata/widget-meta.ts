import { Visibility } from './field.annotation';
import { ControlType } from '../model/control-type';
import { WidgetComponent } from '../component/widget/widget.component';
import { PipeTransform, Type } from '@angular/core';

export class WidgetMeta<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    disabled: boolean;
    order: number;
    colOrder: number;
    visibility: Visibility;
    col: number;
    width: string;
    type: string;
    controlType: ControlType;
    hint: string;
    modelName: string;
    widget: Type<WidgetComponent>;
    dependsOn: string;
    pipe: PipeTransform;
    mask: string;
    min: number;
    max: number;
    maxlength: number;
    hidden: boolean;
    options: any;

    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        disabled?: boolean,
        order?: number,
        colOrder?: number,
        visibility?: Visibility,
        col?: number,
        width?: string,
        type?: string,
        controlType?: ControlType,
        hint?: string,
        modelName?: string,
        widget?: Type<WidgetComponent>,
        dependsOn?: string,
        pipe?: PipeTransform,
        mask?: string,
        min?: number,
        max?: number,
        maxlength?: number,
        hidden?: boolean,
        options?: any,
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.disabled = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.colOrder = options.colOrder === undefined ? 1 : options.colOrder;
        this.visibility = options.visibility;
        this.col = options.col;
        this.width = options.width;
        this.type = options.type || '';
        this.controlType = options.controlType;
        this.hint = options.hint;
        this.modelName = options.modelName;
        this.widget = options.widget;
        this.dependsOn = options.dependsOn;
        this.pipe = options.pipe;
        this.mask = options.mask;
        this.min = options.min;
        this.max = options.max;
        this.maxlength = options.maxlength || 256;
        this.hidden = !!options.hidden;
        this.options = options.options;
    }
}
