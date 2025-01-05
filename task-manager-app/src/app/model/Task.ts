export class TaskModel {
    taskId: string;
    title: string;
    description: string;
    category: string;
    dateTime: Date | string;
    status: string;

    constructor() {
        this.taskId = '';
        this.title = '';
        this.description = '';
        this.category = '';
        this.dateTime = new Date();
        this.status = '';
    }
}
