import { Injector, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { BreadcrumbService } from '../service/breadcrumb.service';
import { AbstractCrudService } from '../service/abstract-crud.service';
import { Modelable } from '../model/modelable';
import { DetailActionListener } from './detail-action-listener';
import { AbstractBaseController } from './abstract-base-controller';
import { Observable } from 'rxjs/Observable';

export abstract class AbstractDetailController<M extends Modelable> extends AbstractBaseController<M>
    implements DetailActionListener, OnDestroy {

    private route: ActivatedRoute;
    private location: Location;
    private breadcrumb: BreadcrumbService;
    isNew = false;
    model: M;

    constructor(
        injector: Injector,
        private service: AbstractCrudService<M>,
    ) {
        super(injector);
        this.route = injector.get(ActivatedRoute);
        this.location = injector.get(Location);
        this.breadcrumb = BreadcrumbService.getInstance();
    }

    init(): void {
        this.service.setEndPoint(this.getApiEndPoint());
        this.route.params
            .switchMap((params: Params) => {
                if (params['id'] === 'new') {
                    this.isNew = true;
                    return Promise.resolve(this.newModelInstance());
                }
                return this.service.get(+params['id']);
            })
            .subscribe(model => {
                this.model = model;
                this.processModel(model);
                // return this.model;
            });
    }

    getModel(): M {
        return this.model;
    }

    abstract newModelInstance(): M;
    abstract getModelInstanceName(): string;
    abstract processModel(model: M): void;
    abstract validate(): void;
    abstract confirmSave(): void;

    add(): void {
        this.isNew = true;
        this.model = this.newModelInstance();
        this.breadcrumb.getPages().pop();
        this.breadcrumb.addPage({label: this.getModelInstanceName()});
    }

    preSave(): void {
        this.validate();
        this.confirmSave();
    }

    save(): Observable<M> {
        let action = 'update';
        if (this.model.id === undefined || this.model.id === null) {
            action = 'create';
        }
        return this.service[action](this.model);
    }

    protected postSave(): void {
        this.location.back();
    }

    delete(): void {
        this.service.delete(this.model)
            .then(() => {
                this.location.back();
                this.breadcrumb.getPages().pop();
            })
            .catch(error => {
                console.log(error);
            });
    }

    isAddDisabled(): boolean {
        return true;
    }

    isSaveDisabled(): boolean {
        return false;
    }

    isDeleteDisabled(): boolean {
        return this.isNew;
    }

    getService(): AbstractCrudService<M> {
        return this.service;
    }
}
