export interface DetailActionListener {
    add(): void;
    save(): void;
    delete(): void;
    isAddDisabled(): boolean;
    isSaveDisabled(): boolean;
    isDeleteDisabled(): boolean;
}