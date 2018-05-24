import { Component, EventEmitter, Inject, Injector, Input, OnInit, Output, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Modelable } from '../../model/modelable';
import { FormField } from '../../metadata/form/form-field';
import { FormControlFactory } from '../../service/form-control-factory';
import { AbstractDetailController } from '../../controller/abstract-detail-controller';
import { AbstractCrudService } from '../../service/abstract-crud.service';
import { Visibility } from '../../metadata/field.annotation';
import { WidgetMeta } from '../../metadata/widget-meta';

@Component({
    selector: 'd1-form',
    template: `
        <div>
            <div *ngIf="loaded; else elseBlock">
                <form [formGroup]="form">
                    <div class="ui-g">
                        <div *ngFor="let col of colsArray" class="ui-sm-12" [class]="'ui-g-' + (12/cols)">
                            <ng-template ngFor let-widget [ngForOf]="widgets">
                                <ng-container *ngIf="widget.col === col" d1Widget
                                              [data]="widget"
                                              [form]="form">
                                </ng-container>
                            </ng-template>
                        </div>
                    </div>
                </form>
            </div>
            <ng-template #elseBlock>
                <d1-empty-page [loaded]="loaded" [icon]="icon" [title]="title" [message]="message"></d1-empty-page>
            </ng-template>
        </div>
    `
})
export class FormViewComponent<M extends Modelable> extends AbstractDetailController<M>
    implements OnInit {
    private modelType: any;
    private apiEndPoint: string;
    private saveDialogComponent: Type<any>;
    private modelInstanceNameForNew = 'new';
    fields: FormField<any>[] = [];
    widgets: WidgetMeta<any>[] = [];
    form: FormGroup = new FormGroup({});
    errorMsg: string;
    modelInstanceName = '';
    @Output() loadCompleted: EventEmitter<WidgetMeta<any>[]> = new EventEmitter();
    @Input() cols = 1;
    colsArray: number[] = [];
    icon = 'view_list';
    title = 'Carregando...';
    message = 'Por favor aguarde.';
    loaded = false;

    constructor(
        private formFactory: FormControlFactory,
        service: AbstractCrudService<M>,
        route: ActivatedRoute,
        injector: Injector,
    ) {
        super(injector, service);

        this.modelType = route.snapshot.data.model;
        this.apiEndPoint = route.snapshot.data.apiEndPoint;
        this.saveDialogComponent = route.snapshot.data.saveDialogComponent;
        this.modelInstanceNameForNew = route.snapshot.data.instanceNameForNewItem || 'new';
        this.form.setErrors({'required': true});
    }

    ngOnInit() {
        this.colsArray = Array(this.cols).fill(this.cols).map((x, i) => i + 1);
        this.init();
    }

    setUpFields(): void {
        this.widgets.sort((a, b) => a.order - b.order);
        this.form = this.formFactory.createForm(this.widgets);
        this.loadCompleted.emit(this.widgets);
    }

    processModel(model: M): void {
        for (let key of Object.keys(model)) {
            const fieldMeta = Reflect.getMetadata('Field', this.modelType.prototype, key);
            if (fieldMeta !== undefined && fieldMeta.visibility & Visibility.FORM) {
                if (this.isNew && fieldMeta.visibility & Visibility.EDIT) {
                    continue;
                }
                const widget = new WidgetMeta(fieldMeta);
                widget.modelName = this.modelType.name;
                widget.key = key;
                widget.value = model[key];
                widget.disabled = (fieldMeta.visibility & Visibility.DISABLED) ? true : false;
                this.widgets.push(widget);
            }
            if (Reflect.hasMetadata('InstanceName', this.modelType.prototype, key)) {
                this.modelInstanceName = model[key] + ', ';
            }
        }
        if (this.isNew) {
            this.modelInstanceName = this.modelInstanceNameForNew;
        } else if (this.modelInstanceName === '') {
            this.modelInstanceName = model.id.toString();
        } else {
            this.modelInstanceName = this.modelInstanceName.replace(/, $/g, '');
        }
        this.setUpFields();
        this.loaded = true;
    }

    validate(): void {
        if (this.form.valid) {
            const formValue = this.form.value;
            for (let key of Object.keys(formValue)) {
                console.log(formValue[key]);
                this.model[key] = formValue[key];
            }
            return;
        }
        this.errorMsg = 'Invalid form-view';
        throw new Error(this.errorMsg);
    }

    confirmSave(): void {
        let dialogRef = this.getDialog().open(this.getDialogComponent(), {
            // width: '450px',
            disableClose: true,
            data: {
                title: 'Confirmação',
                message: 'Confirma inclusão/atualização do registro?',
                controller: this
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log('save result:');
                console.log(result);
                this.postSave();
            }
        });
    }

    getApiEndPoint(): string {
        return this.apiEndPoint;
    }

    newModelInstance(): M {
        return new this.modelType();
    }

    getModelInstanceName(): string {
        return this.modelInstanceName;
    }

    isSaveDisabled(): boolean {
        return this.form.invalid;
    }

    private getDialogComponent(): Type<any> {
        return this.saveDialogComponent || SaveDialogComponent;
    }
}

@Component({
    selector: 'd1-save-dialog',
    template: `
        <h2 mat-dialog-title>{{title}}</h2>
        <mat-dialog-content>
            <div *ngIf="!loading; else elseBlock">
                <p>{{message}}</p>
            </div>
            <ng-template #elseBlock>
                <div class="flex-panel"><div class="center-panel">
                    <mat-progress-spinner
                            mode="indeterminate">
                    </mat-progress-spinner>
                </div></div>
            </ng-template>
        </mat-dialog-content>
        <mat-dialog-actions *ngIf="!loading">
            <div *ngIf="done; else confirmActions">
                <button mat-button (click)="onDone()">Ok</button>
            </div>
            <ng-template #confirmActions>
                <button mat-button (click)="onConfirm()">Sim</button>
                <button mat-button [mat-dialog-close]="false">Não</button>
            </ng-template>
        </mat-dialog-actions>
    `,
    styles: [`
        .mat-dialog-content {
            font-family: Roboto,"Helvetica Neue",sans-serif;
        }
        .mat-dialog-actions {
            direction: rtl;
        }
        .flex-panel {
            display: flex;
            padding: 30px 16px;
            font-family: Roboto,"Helvetica Neue",sans-serif;
        }
        .center-panel {
            margin: auto;
            text-align: center;
        }
        .mat-progress-spinner {
            margin: auto;
        }
    `]

})
export class SaveDialogComponent {
    title: string;
    message: string;
    loading = false;
    done = false;
    private result: any;

    constructor(
        public dialogRef: MatDialogRef<SaveDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.title = data.title;
        this.message = data.message;
    }

    onConfirm(): void {
        this.loading = true;
        this.title = 'Salvando...';
        this.data.controller.save().subscribe(result => {
            this.done = true;
            this.loading = false;
            this.title = '';
            this.message = 'Salvo com sucesso.';
            this.result = result;
        });
    }

    onDone(): void {
        this.dialogRef.close(this.result);
    }
}
