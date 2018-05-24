import { Option } from '../model/option';

export abstract class OptionsProvider {
    abstract getOptions(key: string): Promise<Option[]>;
}
