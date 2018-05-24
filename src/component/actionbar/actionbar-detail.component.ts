import { Component, Input } from '@angular/core';

import { DetailActionController } from '../../controller/detail-action-controller';
import { ActionService } from '../../service/action.service';

@Component({
    selector: 'd1-actionbar-detail',
    template: `
        <div class="ui-helper-clearfix d1-actionbar">
            <p-toolbar>
                <div class="ui-toolbar-group-left">
                    <button pButton type="button" icon="fa-plus"
                            [title]="addHint || ''"
                            [label]="addLabel"
                            (click)="add()"
                            [disabled]="isAddDisabled()"></button>
                    <button pButton type="submit" icon="fa-save"
                            [title]="saveHint || ''"
                            [label]="saveLabel"
                            (click)="save()"
                            [disabled]="isSaveDisabled()"></button>
                    <button pButton type="button" icon="fa-trash"
                            [title]="deleteHint || ''"
                            [label]="deleteLabel"
                            (click)="delete()"
                            [disabled]="isDeleteDisabled()"></button>
                    <p-splitButton icon="fa-wrench"></p-splitButton>
                </div>
            </p-toolbar>
        </div>
    `
})
export class ActionbarDetailComponent extends DetailActionController {
    @Input() addHint: string;
    @Input() addLabel: string;
    @Input() saveHint: string;
    @Input() saveLabel: string;
    @Input() deleteHint: string;
    @Input() deleteLabel: string;

    constructor(actionService: ActionService) {
        super(actionService);
    }
}
