import { Component, Inject, Injector, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { Modelable } from '../model/modelable';
import { ActionService } from '../service/action.service';
import { Action } from '../model/action';

export abstract class AbstractBaseController<M extends Modelable> implements OnDestroy {
    private actionSubscription: Subscription;
    private actionService: ActionService;
    private dialog: MatDialog;

    constructor(
        private injector: Injector,
    ) {
        this.dialog = injector.get(MatDialog);
        this.actionService = injector.get(ActionService);

        this.actionSubscription = this.actionService.subscribe(action => {
            this[action.name](action.args);
        });
    }

    ngOnDestroy(): void {
        this.actionSubscription.unsubscribe();
    }

    abstract getApiEndPoint(): string;

    abstract getModelInstanceName(): string;

    abstract getModel(): M;

    abstract delete(): void;

    confirmDelete(): void {
        let dialogRef = this.dialog.open(RemoveDialogComponent, {
            width: '350px',
            data: this.getModelInstanceName()
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.delete();
            }
        });
    }

    protected getDialog(): MatDialog {
        return this.dialog;
    }

    protected emit(action: Action): void {
        this.actionService.emit(action);
    }
}

@Component({
    selector: 'd1-remove-dialog',
    template: `
        <h2 mat-dialog-title>Remoção de item</h2>
        <mat-dialog-content>
            <p>Confirma remoção do item {{item}}?</p>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button [mat-dialog-close]="true">Sim</button>
            <button mat-button [mat-dialog-close]="false">Não</button>
        </mat-dialog-actions>
    `,
    styles: [`
        .mat-dialog-actions {
            direction: rtl;
        }
    `]

})
export class RemoveDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<RemoveDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public item: any
    ) { }
}
