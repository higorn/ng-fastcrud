import 'reflect-metadata';
import { Injectable } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Http, HttpModule } from '@angular/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelModule, SplitButtonModule, ToolbarModule } from 'primeng/primeng';
import {
    MatDialogModule, MatFormFieldModule, MatGridListModule, MatInputModule, MatSelectModule,
    MatSliderModule
} from '@angular/material';

import { DetailComponent } from '../master-detail/detail.component';
import { FormViewComponent } from './form-view.component';
import { ModelForTest } from '../../model/model-for-test';
import { AbstractCrudService } from '../../service/abstract-crud.service';
import { ActionService } from '../../service/action.service';
import { MockActivatedRoute } from '../../mocks/mock-activated-route';
import { FormControlFactory } from '../../service/form-control-factory';
import { FormFieldComponent } from '../form-field/form-field.component';
import { ActionbarDetailComponent } from '../actionbar/actionbar-detail.component';

@Injectable()
class TestCrudService extends AbstractCrudService<ModelForTest> {

    constructor(http: Http) {
        super(http);
    }

    getBaseEndPoint(): string {
        return 'test';
    }
}

describe('For FormViewComponent', () => {
    let component: FormViewComponent<ModelForTest>;
    let fixture: ComponentFixture<FormViewComponent<ModelForTest>>;
    let activeRoute: MockActivatedRoute;

    const createComponent = () => {
        fixture = TestBed.createComponent(FormViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    };

    beforeEach(() => {
        activeRoute = new MockActivatedRoute();
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                HttpModule,
                RouterModule.forRoot([{path: 'test', component: DetailComponent, data: {model: ModelForTest}}]),
                BrowserModule,
                BrowserAnimationsModule,
                PanelModule,
                MatInputModule,
                MatSelectModule,
                SplitButtonModule,
                ToolbarModule,
                MatDialogModule,
                MatGridListModule,
                MatFormFieldModule,
                MatSliderModule,
            ],
            declarations: [
                FormViewComponent,
                FormFieldComponent,
                ActionbarDetailComponent,
            ],
            providers: [
                ActionService,
                FormControlFactory,
                {provide: AbstractCrudService, useClass: TestCrudService},
                {provide: ActivatedRoute, useValue: activeRoute},
                {provide: APP_BASE_HREF, useValue: '/'}
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        activeRoute.testParams = {id: 'new'};
        activeRoute.snapshot.data = {model: ModelForTest};
        createComponent();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /*
    describe('when new item', () => {

        it('should build FormFields', done => {
            const asyncCallback = () => {
                const model = component.newModelInstance();
                expect(model.name).toBe(null);

                const formFields: FormField<any>[] = component.fields;
                expect(formFields).not.toBe(undefined);
                expect(formFields.length).toBe(2);
                expect(formFields[0].key).toBe('name');
                expect(formFields[1].key).toBe('description');
                done();
            };
            setTimeout(asyncCallback);
        });

        it('should build a FormGroup', done => {
            const asyncCallback = () => {
                expect(undefined).not.toBe(component.form-view);
                expect(component.form-view.controls['name']).not.toBe(undefined);
                expect(component.form-view.controls['name']).not.toBe(null);
                expect(component.form-view.controls['description']).not.toBe(undefined);
                expect(component.form-view.controls['description']).not.toBe(null);
                done();
            };
            setTimeout(asyncCallback);
        });

        it('should render FormFields for ModelForTest model', done => {
            const asyncCallback = () => {
                const _fixture = TestBed.createComponent(FormFieldComponent);
                const formField = _fixture.componentInstance;
                formField.form-view = component.form-view;
                formField.field = component.fields[0];
                _fixture.detectChanges();
                expect(_fixture.debugElement.query(By.css('#df_name'))).toBeTruthy();
                formField.field = component.fields[1];
                _fixture.detectChanges();
                expect(_fixture.debugElement.query(By.css('#df_description'))).toBeTruthy();
                done();
            };
            setTimeout(asyncCallback);
        });

        it('should save a new model', done => {
            const actionBarFixture = TestBed.createComponent(ActionbarDetailComponent);
            const actionbar = actionBarFixture.componentInstance;
            actionbar.listener = component;
            const asyncCallback = () => {
                expect(component.model.name).toBe(null);
                expect(component.model.description).toBe(null);
                const formView = component;
                formView.form-view.controls['name'].setValue('abc');
                formView.form-view.controls['description'].setValue('abcd');
                expect(formView.form-view.valid).toBeTruthy();
                actionbar.save();
                expect(component.model.name).toBe('abc');
                expect(component.model.description).toBe('abcd');
                done();
            };
            setTimeout(asyncCallback);
        });

        it('should fail for invalid form-view', done => {
            const actionBarFixture = TestBed.createComponent(ActionbarDetailComponent);
            const actionbar = actionBarFixture.componentInstance;
            actionbar.listener = component;
            const asyncCallback = () => {
                expect(component.model.name).toBe(null);
                expect(component.model.description).toBe(null);
                const formView = component;
                formView.form-view.controls['name'].setValue('abc');
                actionbar.save();
                expect(component.errorMsg).toBe('Invalid form-view');
                done();
            };
            setTimeout(asyncCallback);
        });

        it('should get label', done => {
            const asyncCallback = () => {
                expect(component.getModelInstanceName()).toBe('new');
                done();
            };
            setTimeout(asyncCallback);
        });
    });

    describe('when editing item', () => {

        it('should update an existing item', done => {
            const actionBarFixture = TestBed.createComponent(ActionbarDetailComponent);
            const actionbar = actionBarFixture.componentInstance;
            actionbar.listener = component;

            const crudService = TestBed.get(AbstractCrudService);
            spy = spyOn(crudService, 'get').and.returnValue(Promise.resolve({name: 'abc', description: 'abcd'}));
            activeRoute.testParams = {id: 1};
            component.ngOnInit();
            const asyncCallback = () => {
                expect(component.model.name).toBe('abc');
                expect(component.model.description).toBe('abcd');
                const formView = component;
                formView.form-view.controls['name'].setValue('cba');
                formView.form-view.controls['description'].setValue('dcba');
                expect(formView.form-view.valid).toBeTruthy();
                actionbar.save();
                expect(component.model.name).toBe('cba');
                expect(component.model.description).toBe('dcba');
                done();
            };
            setTimeout(asyncCallback);
        });

        it('should show fields with visibility EDIT', done => {
            const crudService = TestBed.get(AbstractCrudService);
            spy = spyOn(crudService, 'get').and.returnValue(Promise.resolve({id: 1, name: 'abc', description: 'abcd'}));
            activeRoute.testParams = {id: 1};
            createComponent();

            const asyncCallback = () => {
                const form-view: FormViewComponent<ModelForTest> = component;
                expect(form-view).not.toBe(null);

                const formFields: FormField<any>[] = form-view.fields;
                expect(formFields).not.toBe(undefined);
                expect(formFields.length).toBe(3);
                expect(formFields[0].key).toBe('id');
                expect(formFields[1].key).toBe('name');
                expect(formFields[2].key).toBe('description');
                done();
            };
            setTimeout(asyncCallback);
        });

        it('should show disabled fields with visibility EDIT | DISABLED', done => {
            const crudService = TestBed.get(AbstractCrudService);
            spy = spyOn(crudService, 'get').and.returnValue(Promise.resolve({id: 1, name: 'abc', description: 'abcd'}));
            activeRoute.testParams = {id: 1};
            createComponent();

            const asyncCallback = () => {
                const form-view: FormViewComponent<ModelForTest> = component;
                expect(form-view).not.toBe(null);

                const formFields: FormField<any>[] = form-view.fields;
                expect(formFields).not.toBe(undefined);
                expect(formFields.length).toBe(3);
                expect(formFields[0].key).toBe('id');
                expect(formFields[0].disabled).toBeTruthy();
                done();
            };
            setTimeout(asyncCallback);
        });

        it('should get model view id', done => {
            const crudService = TestBed.get(AbstractCrudService);
            spy = spyOn(crudService, 'get').and.returnValue(Promise.resolve({id: 1, name: 'abc', description: 'abcd'}));
            activeRoute.testParams = {id: 1};
            createComponent();
            const asyncCallback = () => {
                expect(component.getModelInstanceName()).toBe('abc');
                done();
            };
            setTimeout(asyncCallback);
        });
    });
    */
});
