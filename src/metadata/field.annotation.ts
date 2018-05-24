import { PipeTransform, Type } from '@angular/core';
import { ControlType } from '../model/control-type';
import { WidgetComponent } from '../component/widget/widget.component';

export interface FieldMeta {
    label: string;
    required?: boolean;
    order?: number;
    colOrder?: number;
    type?: string;
    visibility?: Visibility;
    col?: number;               // coluna que o campo é posicionado
    width?: string;
    controlType?: ControlType;
    hint?: string;
    widget?: Type<WidgetComponent>;
    dependsOn?: string;
    pipe?: PipeTransform;
    mask?: string;
    min?: number;
    max?: number;
    maxlength?: number;
    hidden?: boolean;
    options?: any;
}

export function Field(data: FieldMeta) {
    let _data: FieldMeta = {
        label: '',
        required: false,
        order: 0,
        colOrder: 0,
        type: 'text',
        visibility: Visibility.ALL,
        col: 1,
        width: '100%',
        controlType: ControlType.TEXT,
        hint: null,
        widget: null,
        dependsOn: null,
        pipe: null,
        mask: null,
        min: null,
        max: null,
        maxlength: null,
        hidden: false,
        options: null,
    };
    if (data === undefined || data === null) {
        _data = data;
    } else {
        for (let key of Object.keys(data)) {
            _data[key] = data[key];
        }
    }
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata('Field', _data, target, propertyKey);
    };
}

export function InstanceName() {
    return (target, propertyKey) => Reflect.defineMetadata('InstanceName', null, target, propertyKey);
}

export enum Visibility {
    NONE     = 0b00000,
    LIST     = 0b00001,
    FORM     = 0b00010,
    NEW      = 0b00100,
    EDIT     = 0b01000,
    DISABLED = 0b10000,
    ALL = LIST | FORM
}
