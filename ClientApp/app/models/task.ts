export class Task {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public priority: number,
        public creationDate: Date,
        public scheduledDate: Date,
        public isActive: boolean,
        public isDeleted: boolean
    ) { }
}
