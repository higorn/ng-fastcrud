
import { ControlType } from '../model/control-type';
import { Type } from '@angular/core';

export abstract class WidgetResolver {
    abstract resolveWidget(type: ControlType): Type<any>;
}
