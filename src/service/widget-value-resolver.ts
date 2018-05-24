import { WidgetMeta } from '../metadata/widget-meta';
import { Displayable } from '../model/displayable';
import { FormGroup } from '@angular/forms';

export abstract class WidgetValueResolver {
    abstract resolve(widgetMeta: WidgetMeta<any>, form: FormGroup, value: any): Promise<Displayable>;
}
