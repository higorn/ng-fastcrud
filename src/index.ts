import 'reflect-metadata';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseRequestOptions, HttpModule } from '@angular/http';
import {
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule, MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSliderModule, MatSortModule,
    MatTableModule
} from '@angular/material';
import { PanelModule, SplitButtonModule, ToolbarModule } from 'primeng/primeng';

import { ListComponent } from './component/list/list.component';
import { BreadcrumbService } from './service/breadcrumb.service';
import { FormViewComponent, SaveDialogComponent } from './component/form-view/form-view.component';
import { ActionbarMasterComponent } from './component/actionbar/actionbar-master.component';
import { MasterComponent } from './component/master-detail/master.component';
import { ActionService } from './service/action.service';
import { ActionbarDetailComponent } from './component/actionbar/actionbar-detail.component';
import { SearchbarComponent } from './component/searchbar/searchbar.component';
import { DetailComponent } from './component/master-detail/detail.component';
import { FormFieldComponent } from './component/form-field/form-field.component';
import { FormControlFactory } from './service/form-control-factory';
import { RemoveDialogComponent } from './controller/abstract-base-controller';
import { TextFieldWidgetComponent } from './component/widget/text-field-widget.component';
import { WidgetDirective } from './directive/widget.directive';
import { SliderWidgetComponent } from './component/widget/slider-widget.component';
import { WidgetResolver } from './service/widget-resolver';
import { DefaultWidgetResolver } from './service/default-widget-resolver';
import { TextareaWidgetComponent } from './component/widget/textarea-widget.component';
import { DropdownWidgetComponent } from './component/widget/dropdown-widget.component';
import { InputlistWidgetComponent } from './component/widget/inputlist-widget.component';
import { InputchipWidgetComponent } from './component/widget/inputchip-widget.component';
import { WidgetValueResolver } from './service/widget-value-resolver';
import { DefaultWidgetValueResolver } from './service/default-widget-value-resolver';
import { EmptyPageComponent } from './component/empty-page/empty-page.component';
import { WidgetBusService } from './service/widget-bus.service';
import { WidgetEventHandler } from './service/widget-event-handler';
import { DefaultWidgetEventHandler } from './service/default-widget-event-handler';
import { FileUploadComponent } from './component/file-upload/file-upload.component';
import { ListCustomCellHandler } from './service/list-custom-cell-handler';
import { ListCustomCellDirective } from './directive/list-custom-cell.directive';
import { InputMaskDirective } from './directive/input-mask.directive';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CurrencyFieldWidgetComponent } from './component/widget/currency-field-widget.component';

export * from './component/list/list.component';
export * from './component/form-view/form-view.component';
export * from './component/form-field/form-field.component';
export * from './component/actionbar/actionbar-master.component';
export * from './component/actionbar/actionbar-detail.component';
export * from './component/master-detail/master.component';
export * from './component/master-detail/detail.component';
export * from './component/searchbar/searchbar.component';
export * from './component/file-upload/file-upload.component';
export * from './component/widget/widget.component';
export * from './component/widget/abstract-widget-component';
export * from './component/widget/text-field-widget.component';
export * from './component/widget/textarea-widget.component';
export * from './component/widget/dropdown-widget.component';
export * from './component/widget/slider-widget.component';
export * from './component/widget/inputlist-widget.component';
export * from './component/widget/inputchip-widget.component';
export * from './component/widget/currency-field-widget.component';
export * from './controller/abstract-master-controller';
export * from './controller/abstract-detail-controller';
export * from './controller/detail-action-controller';
export * from './controller/master-action-controller';
export * from './controller/detail-action-listener';
export * from './controller/master-action-listener';
export * from './service/breadcrumb.service';
export * from './service/abstract-crud.service';
export * from './service/options-provider';
export * from './service/widget-value-resolver';
export * from './service/widget-bus.service';
export * from './service/widget-event-handler';
export * from './service/list-custom-cell-handler';
export * from './service/action.service';
export * from './model/modelable';
export * from './model/displayable';
export * from './model/control-type';
export * from './model/option';
export * from './model/option-group';
export * from './model/widget-event';
export * from './model/file-buffer';
export * from './metadata/model.annotation';
export * from './metadata/field.annotation';
export * from './metadata/widget-meta';
export * from './metadata/form/form-field';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        ReactiveFormsModule,
        ToolbarModule,
        SplitButtonModule,
        PanelModule,
        MatTableModule,
        MatSortModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatDialogModule,
        MatButtonModule,
        MatGridListModule,
        MatFormFieldModule,
        MatSliderModule,
        MatChipsModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        CurrencyMaskModule,
    ],
    declarations: [
        ListComponent,
        FormViewComponent,
        FormFieldComponent,
        ActionbarMasterComponent,
        ActionbarDetailComponent,
        MasterComponent,
        DetailComponent,
        SearchbarComponent,
        RemoveDialogComponent,
        SaveDialogComponent,
        WidgetDirective,
        ListCustomCellDirective,
        InputMaskDirective,
        TextFieldWidgetComponent,
        TextareaWidgetComponent,
        DropdownWidgetComponent,
        SliderWidgetComponent,
        InputlistWidgetComponent,
        InputchipWidgetComponent,
        EmptyPageComponent,
        FileUploadComponent,
        CurrencyFieldWidgetComponent,
    ],
    exports: [
        ListComponent,
        FormViewComponent,
        FormFieldComponent,
        ActionbarMasterComponent,
        ActionbarDetailComponent,
        MasterComponent,
        DetailComponent,
        SearchbarComponent,
        RemoveDialogComponent,
        TextFieldWidgetComponent,
        TextareaWidgetComponent,
        DropdownWidgetComponent,
        SliderWidgetComponent,
        InputlistWidgetComponent,
        InputchipWidgetComponent,
        EmptyPageComponent,
        FileUploadComponent,
        CurrencyFieldWidgetComponent,
    ],
    entryComponents: [
        RemoveDialogComponent,
        SaveDialogComponent,
        TextFieldWidgetComponent,
        TextareaWidgetComponent,
        DropdownWidgetComponent,
        SliderWidgetComponent,
        InputlistWidgetComponent,
        InputchipWidgetComponent,
        CurrencyFieldWidgetComponent,
    ],
    providers: [
        { provide: WidgetResolver, useClass: DefaultWidgetResolver },
        { provide: WidgetValueResolver, useClass: DefaultWidgetValueResolver },
        { provide: WidgetEventHandler, useClass: DefaultWidgetEventHandler },
        WidgetBusService,
        ListCustomCellHandler,
        BaseRequestOptions,
    ]
})
export class CrudModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CrudModule,
            providers: [
                ActionService,
                FormControlFactory,
            ]
        };
    }
    static forChild(): ModuleWithProviders {
        return {
            ngModule: CrudModule,
            providers: [
                BreadcrumbService,
                ActionService,
            ]
        };
    }
}

