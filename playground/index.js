"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is only for local test
 */
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var http_1 = require("@angular/http");
var list_component_1 = require("../src/component/list/list.component");
var field_annotation_1 = require("../src/metadata/field.annotation");
var abstract_crud_service_1 = require("../src/service/abstract-crud.service");
var index_1 = require("../src/index");
var routes = [
    { path: 'tipo-assunto', component: list_component_1.ListComponent, data: {
            model: TipoAssunto, label: 'Tipo assunto', routerLink: 'tipo-assunto'
        } },
];
var TipoAssunto = (function () {
    function TipoAssunto() {
    }
    return TipoAssunto;
}());
__decorate([
    field_annotation_1.Field({
        label: 'Nome',
        type: 'text'
    })
], TipoAssunto.prototype, "nome", void 0);
__decorate([
    field_annotation_1.Field({
        label: 'Tipo',
        type: 'text'
    })
], TipoAssunto.prototype, "tipo", void 0);
__decorate([
    field_annotation_1.Field({
        label: 'Tipo numeração',
        type: 'text'
    })
], TipoAssunto.prototype, "tipoNumeracao", void 0);
exports.TipoAssunto = TipoAssunto;
var TipoAssuntoCrudService = (function (_super) {
    __extends(TipoAssuntoCrudService, _super);
    function TipoAssuntoCrudService(http) {
        return _super.call(this, http) || this;
    }
    TipoAssuntoCrudService.prototype.getBaseEndPoint = function () {
        return '/wkl';
    };
    return TipoAssuntoCrudService;
}(abstract_crud_service_1.AbstractCrudService));
TipoAssuntoCrudService = __decorate([
    core_1.Injectable()
], TipoAssuntoCrudService);
exports.TipoAssuntoCrudService = TipoAssuntoCrudService;
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_2.Component({
        selector: 'app-root',
        template: "<d1-list></d1-list>"
    })
], AppComponent);
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        bootstrap: [AppComponent],
        declarations: [AppComponent],
        imports: [
            platform_browser_1.BrowserModule,
            index_1.CrudModule.forRoot(),
            router_1.RouterModule.forRoot(routes),
            http_1.HttpModule,
        ],
        entryComponents: [
            list_component_1.ListComponent,
        ],
        providers: [
            { provide: abstract_crud_service_1.AbstractCrudService, useClass: TipoAssuntoCrudService }
        ],
    })
], AppModule);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
