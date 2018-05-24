import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { WidgetMeta } from '../metadata/widget-meta';

@Injectable()
export class FormControlFactory {

    createForm(widgets: WidgetMeta<any>[]): FormGroup {
        let group: any = {};

        widgets.forEach(widget => {
            group[widget.key] = new FormControl({
                value: widget.value || '', disabled: widget.disabled
            }, widget.required ? Validators.required : null);
        });

        return new FormGroup(group);
    }
}
