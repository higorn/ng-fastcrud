import { Component } from '@angular/core';

import { Modelable } from '../../model/modelable';

@Component({
    selector: 'd1-master',
    template: `
        <p-panel>
            <p-header>
                <d1-actionbar-master [listener]="list">
                    <d1-search-bar class="search-bar" (searchEvent)="list.onSearch($event)"
                                   [searchFieldsName]="list.getSearchFieldsName()"></d1-search-bar>
                </d1-actionbar-master>
            </p-header>
            <d1-list #list>
            </d1-list>
        </p-panel>
    `
})
export class MasterComponent<M extends Modelable> {
}
