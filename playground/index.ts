/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Http, HttpModule } from '@angular/http';

import { ListComponent } from '../src/component/list/list.component';
import { Modelable } from '../src/model/modelable';
import { Field } from '../src/metadata/field.annotation';
import { AbstractCrudService } from '../src/service/abstract-crud.service';
import { CrudModule } from '../src/index';


const routes: Routes = [
    { path: 'tipo-assunto', component: ListComponent, data: {
            model: TipoAssunto, label: 'Tipo assunto', routerLink: 'tipo-assunto'
        }},
];

export class TipoAssunto implements Modelable {
    id: number;
    @Field({
        label: 'Nome',
        type: 'text'
    })
    nome: string;
    @Field({
        label: 'Tipo',
        type: 'text'
    })
    tipo: string;
    @Field({
        label: 'Tipo numeração',
        type: 'text'
    })
    tipoNumeracao: string;
    dataUltimaAlteracao: string;
    version: number;
}

@Injectable()
export class TipoAssuntoCrudService extends AbstractCrudService<TipoAssunto> {

    constructor(http: Http) {
        super(http);
    }

    getBaseEndPoint(): string {
        return '/wkl';
    }
}

@Component({
  selector: 'app-root',
  template: `<d1-list></d1-list>`
})
class AppComponent {}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [
      BrowserModule,
      CrudModule.forRoot(),
      RouterModule.forRoot(routes),
      HttpModule,
  ],
  entryComponents: [
      ListComponent,
  ],
  providers: [
      { provide: AbstractCrudService, useClass: TipoAssuntoCrudService }
  ],
})
class AppModule {
    // constructor(router: Router) {
    //     router.config.push({ path: '/list', component: ListComponent, data: {
    //         model: TipoAssunto, label: 'Tipo assunto', routerLink: 'list'
    //     }});
    // }
}

platformBrowserDynamic().bootstrapModule(AppModule);
