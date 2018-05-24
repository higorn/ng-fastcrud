
import { Component, Input } from '@angular/core';

@Component({
    selector: 'd1-empty-page',
    template: `
        <div class="d1-page-empty">
            <div class="d1-page-center">
                <div *ngIf="loaded; else loading">
                    <mat-icon class="mat-60 mat-dark">{{icon}}</mat-icon>
                </div>
                <ng-template #loading>
                    <mat-progress-spinner
                            mode="indeterminate">
                    </mat-progress-spinner>
                </ng-template>
                <h3>{{title}}</h3>
                <p>{{message}}</p>
            </div>
        </div>
    `,
    styles: [`
        .d1-page-empty {
            display: flex;
            padding: 80px 16px;
            font-family: Roboto,"Helvetica Neue",sans-serif;
        }
        .d1-page-empty > div {
            margin: auto;
            text-align: center;
        }
        .d1-page-center > p {
            width: 400px;
        }

        .mat-progress-spinner {
            margin: auto;
        }
    `]
})
export class EmptyPageComponent {
    @Input() icon: string;
    @Input() title: string;
    @Input() message: string;
    @Input() loaded: boolean;
}
