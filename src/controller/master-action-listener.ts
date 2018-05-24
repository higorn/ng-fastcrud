export interface MasterActionListener {
    add(): void;
    edit(): void;
    delete(): void;
    isAddDisabled(): boolean;
    isEditDisabled(): boolean;
    isDeleteDisabled(): boolean;
}