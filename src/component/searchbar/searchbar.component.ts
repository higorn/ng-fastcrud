import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'd1-search-bar',
    template: `
        <div class="search-bar-inner ui-g ui-fluid">
            <div class="ui-g-8 ui-md-12 ui-sm-12 ui-xs-12">
                <div class="ui-inputgroup">
                    <span class="ui-inputgroup-addon"><i class="fa fa-search"></i></span>
                    <input pInputText type="text" #searchBox id="search-box" (keyup)="search(searchBox.value)"
                           placeholder="{{searchFieldsName}}"/>
                    <button pButton type="button" icon="fa-close" class="ui-button-secondary"></button>
                    <button pButton type="button" icon="fa-chevron-down" class="ui-button-secondary"></button>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

    @Input() searchFieldsName: string;
    @Output() searchEvent: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    search(query: string): void {
        query ? this.searchEvent.emit(query) : this.searchEvent.emit('*');
    }
}
