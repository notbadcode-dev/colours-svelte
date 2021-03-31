export class Palette {
    constructor(
        public _id: string,
        public colours: string[],
        public title?: string,
        public likes?: number,
        public tags?: string[],
        public isFamous?: boolean,
        public isPendingApproval?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,

        public liked?: boolean 
    ) {
        liked = false;
    }
}