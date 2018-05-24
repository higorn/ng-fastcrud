import { ElementRef, Injectable } from '@angular/core';

@Injectable()
export class ListCustomCellHandler {
    handle(el: ElementRef, key: string, row: any): void { }
}
