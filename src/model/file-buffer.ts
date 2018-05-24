export class FileBuffer {

    constructor(
        public name: string,
        public size: number,
        public type: string,
        public lastModified: Date,
        public content: string
    ) { }
}
