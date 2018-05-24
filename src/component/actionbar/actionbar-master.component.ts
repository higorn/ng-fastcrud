import { Component, Input } from '@angular/core';

import { MasterActionController } from '../../controller/master-action-controller';
import { ActionService } from '../../service/action.service';

@Component({
    selector: 'd1-actionbar-master',
    template: `
        <div class="ui-helper-clearfix d1-actionbar">
            <p-toolbar>
                <div class="ui-toolbar-group-left">
                    <button pButton #addBtn type="button" icon="fa-plus"
                            [title]="addHint || ''"
                            [label]="addLabel"
                            (click)="add()"
                            [disabled]="isAddDisabled()"></button>
                    <button pButton #editBtn type="button" icon="fa-pencil"
                            [title]="editHint || ''"
                            [label]="editLabel"
                            (click)="edit()"
                            [disabled]="isEditDisabled()"></button>
                    <button pButton #deleteBtn type="button" icon="fa-trash"
                            [title]="deleteHint || ''"
                            [label]="deleteLabel"
                            (click)="delete()"
                            [disabled]="isDeleteDisabled()"></button>
                    <i class="fa fa-bars"></i>
                    <p-splitButton icon="fa-wrench"></p-splitButton>
                </div>
                <div class="ui-toolbar-group-right">
                    <ng-content select=".search-bar"></ng-content>
                </div>
            </p-toolbar>
        </div>
    `,
    styles: [`
        .ui-toolbar-group-right {
            /*flex: 1 1 auto;*/
        }
    `]
})
export class ActionbarMasterComponent extends MasterActionController {
    @Input() addHint: string;
    @Input() addLabel: string;
    @Input() editHint: string;
    @Input() editLabel: string;
    @Input() deleteHint: string;
    @Input() deleteLabel: string;

    constructor(actionService: ActionService) {
        super(actionService);
    }
}
