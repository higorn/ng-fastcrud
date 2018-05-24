import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileBuffer } from '../../model/file-buffer';

@Component({
    selector: 'd1-file-upload',
    template: `
        <div class="d1-file-upload">
            <ng-content select="label"></ng-content>
            <span *ngIf="!file; else elseBlock"
                  class="d1-file-upload-button mat-raised-button"
                  [class.disabled]="disabled"
                  [class.fullFill]="fullFill">
                <mat-icon>attach_file</mat-icon>
                <span class="d1-file-upload-button-label">{{label}}</span>
                <input type="file" #fileInput [accept]="accept" (change)="onChange(fileInput)" [disabled]="disabled">
            </span>
            <ng-template #elseBlock>
                <div class="d1-file-upload-file" [style.display]="file ? 'flex' : 'none'">
                    <div #fileRef [class.fullFill]="fileRef.children.length > 0"><ng-content select="[file]"></ng-content></div>
                    <label *ngIf="fileRef.children.length === 0" class="d1-file-upload-file-name">{{file && file.name}}</label>
                    <mat-icon *ngIf="!disabled" class="d1-file-upload-file-remove" aria-label="Remove"
                              (click)="remove()">remove_circle</mat-icon>
                </div>
                <mat-progress-bar
                        [color]="progressColor"
                        [mode]="progressMode"
                        [value]="progressValue"
                        [style.display]="loading ? 'block' : 'none'"
                ></mat-progress-bar>
            </ng-template>
        </div>
    `,
    styles: [`
        .d1-file-upload > .d1-file-upload-button {
            color: rgba(0,0,0,0.8);
            overflow: hidden;
        }
        .d1-file-upload-button .mat-icon {
            vertical-align: middle;
            margin-left: -6px;
        }
        .d1-file-upload-button.disabled {
            color: rgba(0,0,0,0.45) !important;
        }
        .d1-file-upload input[type=file] {
            position: absolute;
            right: 0;
            margin: 0;
            opacity: 0;
            min-height: 100%;
            text-align: right;
            direction: ltr;
            cursor: pointer;
            font-size: 100px;
        }
        .d1-file-upload input[type=file]:disabled {
            cursor: initial;
        }
        .d1-file-upload .fa {
            color: rgba(0,0,0,0.4);
        }
        .d1-file-upload-file {
            display: flex;
            line-height: 36px;
        }
        .d1-file-upload-file > div {
            padding: 0;
        }
        .d1-file-upload-file-name {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-left: .25em;
        }
        .d1-file-upload-file-remove.mat-icon {
            color: rgba(0,0,0,0.75);
            float: right;
            height: 100%;
            cursor: pointer;
            margin: auto;
            padding-left: 2px;
        }
        .d1-file-upload-file-remove .mat-icon-button {
        }
        .fullFill {
            width: 100%;
        }
    `]
})
export class FileUploadComponent implements OnInit {
    @Input() label: string;
    @Input() accept: string;
    @Input() maxFileSize: number;
    @Input() fullFill: boolean;
    @Input() disabled: boolean;
    @Output() onChoose = new EventEmitter<FileBuffer>();
    @Output() onRemove = new EventEmitter<FileBuffer>();
    @Output() onInvalidType = new EventEmitter<any>();
    @Output() onInvalidSize = new EventEmitter<File>();
    @Input() file: any;
    progressColor = 'primary';
    progressMode = 'determinate';
    progressValue = 0;
    loading = false;

    ngOnInit(): void {
    }

    onChange(event): void {
        const _file = event.files[0];
        console.log(_file);
        this.checkFileType(_file);
        this.checkMaxSize(_file);
        this.file = _file;
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            // this.file = {name: this.file.name, content: e.target['result']};
            this.file = new FileBuffer(this.file.name, this.file.size,
                this.file.type, this.file.lastModifiedDate, e.target['result']);
            this.loading = false;
            this.progressValue = 0;
            this.onChoose.emit(this.file);
        };
        fileReader.onprogress = (e) => {
            this.progressValue = (e.loaded / e.total) * 100;
        };
        this.loading = true;
        fileReader.readAsDataURL(this.file);
    }

    remove(): void {
        this.onRemove.emit(this.file);
        this.file = null;
    }

    private checkFileType(file: any) {
        if (this.accept && this.accept.indexOf(file.type) === -1) {
            this.onInvalidType.emit(file);
            throw new Error(`File type violated: ${file.name}, ${file.type}`);
        }
    }

    private checkMaxSize(file: File) {
        if (file.size > this.maxFileSize) {
            this.onInvalidSize.emit(file);
            throw new Error(`Max file size violated: ${file.name}, ${file.size}`);
        }
    }
}
