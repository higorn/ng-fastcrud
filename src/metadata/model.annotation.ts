
export interface ModelMeta {
    masterKey?: string;
}

export function Model(options: ModelMeta) {
    return target => Reflect.defineMetadata('Model', options, target);
}

/*
export function DefaultConstructor() {

    return target => new Proxy(target, {
        apply(targ, thisArg, argArray) {
            console.log('apply');
            return Reflect.apply(targ, thisArg, argArray);
        },
        construct(targ, thisArg, argArray) {
            console.log('construct');
            console.log(Object.getOwnPropertyNames(new targ()));
            return Reflect.construct(targ, argArray);
        }
    });
}
*/
