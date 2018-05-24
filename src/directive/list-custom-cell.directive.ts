import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ListCustomCellHandler } from '../service/list-custom-cell-handler';

@Directive({
    selector: '[d1ListCustomCell]'
})
export class ListCustomCellDirective implements OnInit {
    @Input('d1ListCustomCell') row: any;
    @Input('d1ListCustomCellKey') key: string;

    constructor(
        private el: ElementRef,
        private handler: ListCustomCellHandler
        ) { }

    ngOnInit(): void {
        this.handler.handle(this.el, this.key, this.row);
    }
}
