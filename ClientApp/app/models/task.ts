export class Task {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public priority: number,
        public creationDate: string,
        public scheduledDate: string,
        public isActive: boolean,
        public isDeleted: boolean
    ) { }
}
