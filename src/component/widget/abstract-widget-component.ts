import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { WidgetBusService } from '../../service/widget-bus.service';
import { WidgetEvent } from '../../model/widget-event';
import { WidgetMeta } from '../../';
import { WidgetComponent } from './widget.component';
import { Injector } from '@angular/core';
import { WidgetEventHandler } from '../../service/widget-event-handler';

export abstract class AbstractWidgetComponent implements WidgetComponent {
    private eventSubscription: Subscription;
    private busService: WidgetBusService;
    private eventHandler: WidgetEventHandler;
    data: WidgetMeta<any>;
    form: FormGroup;

    constructor(private injector: Injector) {
        this.eventHandler = injector.get(WidgetEventHandler);
        this.busService = injector.get(WidgetBusService);
        this.eventSubscription = this.busService.subscribe(event => {
            this.onWidgetEvent(event);
        });
    }

    protected onWidgetEvent(event: WidgetEvent): void {
        if (this.data.dependsOn === event.source.data.key) {
            this.eventHandler.onEvent(event);
        }
    }

    protected emitEvent(name: string, value: any): void {
        this.busService.emit({name: name, value: value, source: this});
    }
}
