export class Palette {
    constructor(
        public id: number,
        public number: number,
        public title: string,
        public colours: string[],
        public likes: number,
        public since: Date,
        public tags: string[]
    ) {}
}