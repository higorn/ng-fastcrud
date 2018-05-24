import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Injectable()
export class BreadcrumbService {
    private static instance: BreadcrumbService;
    private items: MenuItem[] = [{label: 'home'}];
    private current: MenuItem;

    static getInstance(): BreadcrumbService {
        if (this.instance === undefined || this.instance === null) {
            this.instance = new BreadcrumbService();
        }
        return this.instance;
    }

    constructor() { }

    getPages(): MenuItem[] {
        return this.items;
    }

    addPage(page: MenuItem): void {
        this.items.push(page);
        this.current = page;
    }

    resetPages() {
        this.items = [{label: 'home'}];
    }

    setPage(page: MenuItem) {
        this.items.pop();
        this.addPage(page);
    }

    getCurrent(): MenuItem {
        return this.current;
    }

    popPage(): MenuItem {
        const item = this.items.pop();
        this.current = this.items[this.items.length - 1];
        return item;
    }
}
