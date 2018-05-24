
import { DetailActionListener } from './detail-action-listener';
import { ActionService } from '../service/action.service';
import { Input } from '@angular/core';

export class DetailActionController implements DetailActionListener {
    @Input() listener: DetailActionListener;

    constructor(private actionService: ActionService) {
    }

    add(): void {
        this.actionService.emit({name: 'add'});
    }

    save(): void {
        this.actionService.emit({name: 'preSave'});
    }

    delete(): void {
        this.actionService.emit({name: 'confirmDelete'});
    }

    isAddDisabled(): boolean {
        return this.listener.isAddDisabled();
    }

    isSaveDisabled(): boolean {
        return this.listener.isSaveDisabled();
    }

    isDeleteDisabled(): boolean {
        return this.listener.isDeleteDisabled();
    }
}
