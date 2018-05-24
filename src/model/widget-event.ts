import { WidgetComponent } from '../';

export interface WidgetEvent {
    name: string;
    value: any;
    source: WidgetComponent;
}
