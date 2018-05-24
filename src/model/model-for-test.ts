import { Modelable } from './modelable';
import { Field, InstanceName, Visibility } from '../metadata/field.annotation';
import { Model } from '../metadata/model.annotation';

@Model({masterKey: 'name'})
export class ModelForTest implements Modelable {
    @Field({label: 'ID', required: true, order: 1, type: 'number',
        visibility: Visibility.FORM | Visibility.EDIT | Visibility.DISABLED})
    id: number;
    @Field({label: 'Nome', required: true, order: 2, type: 'text'})
    @InstanceName()
    name: string;
    @Field({label: 'Descrição', required: true, order: 3, type: 'text'})
    description: string;

    constructor() {
        this.id = null;
        this.name = null;
        this.description = null;
    }
}
