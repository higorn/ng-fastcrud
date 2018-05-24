import { WidgetEvent } from '../';

export abstract class WidgetEventHandler {
    abstract onEvent(event: WidgetEvent): void;
}
