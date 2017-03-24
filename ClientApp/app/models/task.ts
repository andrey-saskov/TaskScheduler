export class Task {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public priority: number,
        public scheduledTime: string,
        public isActive: boolean,
        public isDeleted: boolean
    ) { }
}
