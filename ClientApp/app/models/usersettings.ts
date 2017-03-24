export class UserSettings {
    constructor(
        public altRowsColor: string,
        public dateFormat: string,
        public currentDate: Date,
        public filter: string,
        public sortColumn: string,
        public sortAsc: boolean
    ) { }
}
