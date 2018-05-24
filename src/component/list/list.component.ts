import { Component, Injectable, Injector, OnInit, Type, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Modelable } from '../../model/modelable';
import { AbstractMasterController } from '../../controller/abstract-master-controller';
import { AbstractCrudService } from '../../service/abstract-crud.service';
import { Visibility } from '../../metadata/field.annotation';
import { WidgetMeta } from '../../metadata/widget-meta';

@Injectable()
@Component({
    selector: 'd1-list',
    template: `
        <div class="d1-list">
            <div [style.diplay]="empty ? 'none' : 'block'">
                <ng-content select=".search-bar"></ng-content>
                <mat-table #table [dataSource]="dataSource" matSort>
                    <ng-container *ngFor="let header of headers" [matColumnDef]="header.key">
                        <mat-header-cell *matHeaderCellDef mat-sort-header>{{header.label}}</mat-header-cell>
                        <mat-cell *matCellDef="let row" [d1ListCustomCell]="row" [d1ListCustomCellKey]="header.key">
                            {{row[header.key]}}
                        </mat-cell>
                    </ng-container>
                    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
                    <mat-row *matRowDef="let row; columns: displayedColumns;"
                             (click)="onSelect(row)"
                             [class.selected]="row === selected">
                    </mat-row>
                </mat-table>
            </div>
            <div *ngIf="empty">
                <d1-empty-page [loaded]="loaded" [icon]="icon" [title]="emptyTitle" [message]="emptyMessage"></d1-empty-page>
            </div>
        </div>
    `,
    styleUrls: ['./list.component.css']
})
export class ListComponent<M extends Modelable> extends AbstractMasterController<M> implements OnInit {
    private modelType: Type<M>;
    private routerLink: string;
    private modulePrefix: string;
    private moduleName: string;
    private apiEndPoint: string;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: ListDataSource<M>;
    displayedColumns = [];
    headers = [];
    searchFieldsName = '';
    label = '';
    icon = 'view_list';
    emptyTitle = 'Carregando...';
    emptyMessage = 'Por favor aguarde.';
    responseStatus: number;
    loaded = false;
    empty = true;

    constructor(
        private route: ActivatedRoute,
        injector: Injector,
        service: AbstractCrudService<M>
    ) {
        super(injector, service);
        this.modelType = this.route.snapshot.data.model;
        this.label = this.route.snapshot.data.label;
        this.icon = this.route.snapshot.data.icon || this.icon;
        this.routerLink = this.route.snapshot.data.routerLink;
        this.modulePrefix = this.route.snapshot.data.modulePrefix;
        this.moduleName = this.route.snapshot.data.moduleName;
        this.apiEndPoint = this.route.snapshot.data.apiEndPoint;
    }

    ngOnInit(): void {
        this.init();
        this.modelList.toPromise().then(data => {
            if (data === undefined || data === null || data.length === 0) {
                this.emptyTitle = this.route.snapshot.data.title || '';
                this.emptyMessage = this.route.snapshot.data.message || 'Nenhuma informação encontrada';
            } else {
                const widgets: WidgetMeta<M>[] = [];
                for (let key of Object.keys(data[0])) {
                    const fieldMeta = Reflect.getMetadata('Field', this.modelType.prototype, key);
                    if (fieldMeta !== undefined && fieldMeta.visibility & Visibility.LIST) {
                        const widget = new WidgetMeta<M>(fieldMeta);
                        widget.key = key
                        widgets.push(widget);
                    }
                }
                widgets.sort((a, b) => a.colOrder - b.colOrder);
                this.headers = widgets.map(widget => { return {key: widget.key, label: widget.label}; });
                this.displayedColumns = widgets.map(widget => widget.key);
                this.searchFieldsName = widgets.map(widget => widget.label).join(', ');

                this.applyTransformations(data);
                this.empty = data.length === 0;
                this.dataSource = new ListDataSource(new ChangeableDataBase(data), this.sort, this.modelType);
            }
            this.loaded = true;
            this.responseStatus = 200;
        }, error => {
            console.log(error);
            this.loaded = true;
            this.empty = true;
            this.icon = 'error';
            this.emptyTitle = '';
            try {
                this.responseStatus = error.status;
                this.emptyTitle = error.statusText;
                this.emptyMessage = JSON.parse(error._body)['data'];
            } catch (e) {
                this.emptyMessage = 'Tivemos um problema com a comunicação. Se persistir, entre em contato com o suporte.';
            }
        });
    }

    private applyTransformations(data) {
        data.forEach(d => {
            for (let key of Object.keys(d)) {
                const metaData = Reflect.getMetadata('Field', this.modelType.prototype, key);
                if (metaData !== undefined && metaData.visibility & Visibility.LIST) {
                    if (metaData.pipe) {
                        d[key] = metaData.pipe.transform(d[key]);
                    }
                }
            }
        });
    }

    onSearch(query): void {
        super.onSearch(query);
        setTimeout(() => {
            this.modelList.subscribe(data => {
                console.log(data);
                // this.dataSource = new ListDataSource(data);
                this.applyTransformations(data);
                this.dataSource = new ListDataSource(new ChangeableDataBase(data), this.sort, this.modelType);
            });
        }, 500);
    }

    getModelInstanceName(): string {
        let label = this.selected.id.toString();
        for (let key of Object.keys(this.selected)) {
            if (Reflect.hasMetadata('InstanceName', this.modelType.prototype, key)) {
                label = this.selected[key] + ', ';
            }
        }
        return label.replace(/, $/g, '');
    }

    onSelect(obj: M): void {
        super.onSelect(obj);
        setTimeout(() => this.edit(), 100);
    }

    getApiEndPoint(): string {
        return this.apiEndPoint;
    }

    getRouterLink(): string {
        return this.routerLink;
    }

    getModulePrefix(): string {
        return this.modulePrefix;
    }

    getModuleName(): string {
        return this.moduleName;
    }

    getSearchFieldsName(): string {
        return this.searchFieldsName;
    }

}

export class ChangeableDataBase<M extends Modelable> {
    dataChange: BehaviorSubject<M[]> = new BehaviorSubject<M[]>([]);
    get data(): M[] {
        return this.dataChange.value;
    }

    constructor(dataArray: M[]) {
        dataArray.forEach(data => {
            const copiedData = this.data.slice();
            copiedData.push(data);
            this.dataChange.next(copiedData);
        });
        // this.dataChange = new BehaviorSubject<M[]>(dataArray);
    }
}

export class ListDataSource<M extends Modelable> extends DataSource<M> {
    private _filterChange = new BehaviorSubject('');
    get filter(): string {
        return this._filterChange.value;
    }
    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    constructor(
        private dataBase: ChangeableDataBase<M>,
        private sort: MatSort,
        private modelType: Type<M>,
    ) {
        super();
    }
    connect(collectionViewer: CollectionViewer): Observable<M[]> {
        const displayDataChanges = [
            this.dataBase.dataChange,
            this.sort.sortChange,
            this._filterChange,
        ];
        return Observable.merge(...displayDataChanges).map(() => {
            return this.getSortedData();
        });
        // return Observable.of(this.data);
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

    getSortedData(): M[] {
        const data = this.dataBase.data.slice().filter((item: M) => {
            let searchStr = '';
            for (let key of Object.keys(item)) {
                const metaData = Reflect.getMetadata('Field', this.modelType.prototype, key);
                if (metaData !== undefined && metaData.visibility & Visibility.LIST) {
                    searchStr += item[key];
                }
            }
            return searchStr.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
        });

        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number|string = '';
            let propertyB: number|string = '';

            [propertyA, propertyB] = [a[this.sort.active], b[this.sort.active]];

            let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
        });
    }
}

