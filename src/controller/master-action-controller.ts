import { Input } from '@angular/core';

import { MasterActionListener } from './master-action-listener';
import { ActionService } from '../service/action.service';

export class MasterActionController implements MasterActionListener {
    @Input() listener: MasterActionListener;

    constructor(private actionService: ActionService) {
    }

    add(): void {
        // this.listener.add();
        this.actionService.emit({name: 'add'});
    }

    edit(): void {
        // this.listener.edit();
        this.actionService.emit({name: 'edit'});
    }

    delete(): void {
        this.actionService.emit({name: 'confirmDelete'});
        // this.listener.delete();
    }

    isAddDisabled(): boolean {
        return this.listener.isAddDisabled();
    }

    isEditDisabled(): boolean {
        return this.listener.isEditDisabled();
    }

    isDeleteDisabled(): boolean {
        return this.listener.isDeleteDisabled();
    }
}
