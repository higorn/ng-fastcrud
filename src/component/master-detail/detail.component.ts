import { Component } from '@angular/core';

import { Modelable } from '../../model/modelable';

@Component({
    selector: 'd1-detail',
    template: `
        <p-panel>
            <p-header>
                <d1-actionbar-detail [listener]="form"></d1-actionbar-detail>
            </p-header>
            <div class="ui-grid ui-grid-responsive ui-fluid form-panel">
                <div class="error" *ngIf="errorMsg">{{errorMsg}}</div>
                <d1-form #form [cols]="2"></d1-form>
            </div>
        </p-panel>
    `,
})
export class DetailComponent<M extends Modelable> {
    errorMsg = null;
}
