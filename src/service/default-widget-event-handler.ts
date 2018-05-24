import { WidgetEventHandler } from './widget-event-handler';
import { WidgetEvent } from '../';
import { Injectable } from '@angular/core';

@Injectable()
export class DefaultWidgetEventHandler extends WidgetEventHandler {

    onEvent(event: WidgetEvent): void {
    }
}
