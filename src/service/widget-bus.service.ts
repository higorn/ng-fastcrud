import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { WidgetEvent } from '../model/widget-event';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class WidgetBusService {
    private eventSource = new Subject<WidgetEvent>();
    private eventSubscriber = this.eventSource.asObservable();

    subscribe(observer: any): Subscription {
        return this.eventSubscriber.subscribe(observer);
    }

    emit(event: WidgetEvent): void {
        this.eventSource.next(event);
    }
}
