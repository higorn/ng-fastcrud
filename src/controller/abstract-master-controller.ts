import { Modelable } from '../model/modelable';
import { Router } from '@angular/router';
import { Injector } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { AbstractCrudService } from '../service/abstract-crud.service';
import { BreadcrumbService } from '../service/breadcrumb.service';
import { MasterActionListener } from './master-action-listener';
import { AbstractBaseController } from './abstract-base-controller';

export abstract class AbstractMasterController<M extends Modelable> extends AbstractBaseController<M>
    implements MasterActionListener {

    private router: Router;
    private breadcrumb: BreadcrumbService;
    private searchQuery = new Subject<string>();
    modelList: Observable<M[]>;
    selected: M;
    isNew = false;

    constructor(
        injector: Injector,
        private service: AbstractCrudService<M>,
    ) {
        super(injector);
        this.router = injector.get(Router);
        this.breadcrumb = BreadcrumbService.getInstance();
    }

    init(): void {
        this.service.setEndPoint(this.getApiEndPoint());
        this.searchQuery
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(query => {
                this.modelList = this.service.search(query);
            });
        this.modelList = this.service.search('');

        this.breadcrumb.resetPages();
        this.breadcrumb.setPage({label: this.getModuleName()});
        // this.breadcrumb.addPage({label: this.getModelInstanceName(), routerLink: this.getAbsolutePath()});
    }

    onSearch(query): void {
        this.searchQuery.next(query);
    }

    getModel(): M {
        return this.selected;
    }

    abstract getModelInstanceName(): string;

    abstract getRouterLink(): string;

    abstract getModuleName(): string;

    abstract getModulePrefix(): string;

    getAbsolutePath(): string {
        return this.getModulePrefix() + '/' + this.getRouterLink();
    }

    getService(): AbstractCrudService<M> {
        return this.service;
    }

    add(): void {
        this.breadcrumb.addPage({label: 'new'});
        this.router.navigate([this.getAbsolutePath(), 'new']);
        this.isNew = true;
    }

    edit(): void {
        // this.breadcrumb.addPage({label: this.selected.id.toString()});
        this.router.navigate([this.getAbsolutePath(), this.selected.id]);
    }

    delete(): void {
        this.service.delete(this.selected)
            .then(() => {
                this.modelList = this.service.search('');
                this.selected = undefined;
            })
            .catch(error => {
                console.log(error);
            });
    }

    isAddDisabled(): boolean {
        return this.isNew;
    }

    isEditDisabled(): boolean {
        return this.selected === undefined;
    }

    isDeleteDisabled(): boolean {
        return this.selected === undefined;
    }

    onSelect(obj: M): void {
        this.selected = obj;
    }

    abstract getSearchFieldsName(): string;
}
