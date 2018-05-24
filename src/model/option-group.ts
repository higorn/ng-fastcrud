import { Displayable } from './displayable';
import { Option } from './option';

export interface OptionGroup extends Displayable {
   title: string;
   description: string;
   checked?: boolean;
   opts: Option[];
}
