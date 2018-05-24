export interface ActionListener {
    add(): void;
    save(): void;
    edit(): void;
    delete(): void;
    isAddDisabled(): boolean;
    isSaveDisabled(): boolean;
    isEditDisabled(): boolean;
    isDeleteDisabled(): boolean;
}
