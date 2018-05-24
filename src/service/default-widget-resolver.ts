import { Type } from '@angular/core';

import { WidgetResolver } from './widget-resolver';
import { ControlType } from '../model/control-type';
import { SliderWidgetComponent } from '../component/widget/slider-widget.component';
import { TextFieldWidgetComponent } from '../component/widget/text-field-widget.component';
import { TextareaWidgetComponent } from '../component/widget/textarea-widget.component';
import { DropdownWidgetComponent } from '../component/widget/dropdown-widget.component';
import { InputlistWidgetComponent } from '../component/widget/inputlist-widget.component';
import { InputchipWidgetComponent } from '../component/widget/inputchip-widget.component';
import { CurrencyFieldWidgetComponent } from '../component/widget/currency-field-widget.component';

export class DefaultWidgetResolver extends WidgetResolver {

    resolveWidget(type: ControlType): Type<any> {
        switch (type) {
            case ControlType.TEXTAREA:
                return TextareaWidgetComponent;
            case ControlType.DROPDOWN:
                return DropdownWidgetComponent;
            case ControlType.SLIDER:
                return SliderWidgetComponent;
            case ControlType.INPUTLIST:
                return InputlistWidgetComponent;
            case ControlType.INPUTCHIP:
                return InputchipWidgetComponent;
            case ControlType.CURRENCY:
                return CurrencyFieldWidgetComponent;
            default:
                return TextFieldWidgetComponent;
        }
    }
}
