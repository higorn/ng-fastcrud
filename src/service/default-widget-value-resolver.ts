import { WidgetValueResolver } from './widget-value-resolver';
import { WidgetMeta } from '../metadata/widget-meta';
import { FormGroup } from '@angular/forms';

export class DefaultWidgetValueResolver extends WidgetValueResolver {

    resolve(widgetMeta: WidgetMeta<any>, form: FormGroup, value: any): Promise<any> {
        return Promise.resolve(value);
    }
}
