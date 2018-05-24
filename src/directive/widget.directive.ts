import { ComponentFactoryResolver, Directive, Input, OnInit, Type, ViewContainerRef } from '@angular/core';
import { WidgetMeta } from '../metadata/widget-meta';
import { FormGroup } from '@angular/forms';
import { WidgetComponent } from '../component/widget/widget.component';
import { WidgetResolver } from '../service/widget-resolver';

@Directive({
    selector: '[d1Widget]',
})
export class WidgetDirective implements OnInit {
    @Input() data: WidgetMeta<any>;
    @Input() form: FormGroup;

    constructor(
        private widgetResolver: WidgetResolver,
        private resolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef
    ) { }

    ngOnInit(): void {
        const widget: Type<any> = this.data.widget || this.widgetResolver.resolveWidget(this.data.controlType);
        const componentFactory = this.resolver.resolveComponentFactory<any>(widget);
        const componentRef = this.viewContainerRef.createComponent(componentFactory);
        (<WidgetComponent>componentRef.instance).data = this.data;
        componentRef.instance.form = this.form;
    }
}
