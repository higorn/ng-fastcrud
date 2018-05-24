import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Action } from '../model/action';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class ActionService {
    private actionSource = new Subject<Action>();
    private actionObserver$ = this.actionSource.asObservable();

    subscribe(observer: any): Subscription {
        return this.actionObserver$.subscribe(observer);
    }

    emit(action: Action): void {
        this.actionSource.next(action);
    }
}
