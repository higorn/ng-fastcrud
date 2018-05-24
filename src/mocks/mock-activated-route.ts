import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRouteSnapshot } from '@angular/router';


export class MockActivatedRoute {
    private paramsSubject = new BehaviorSubject(this.testParams);
    private _testParams: {};

    params = this.paramsSubject.asObservable();
    snapshot = new ActivatedRouteSnapshot();

    get testParams() {
        return this._testParams;
    }

    set testParams(newParams: any) {
        this._testParams = newParams;
        this.paramsSubject.next(newParams);
    }
}
