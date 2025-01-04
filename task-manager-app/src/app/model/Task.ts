export class TaskModel {
    taskId: string;
    title: string;
    category: string;
    // date: Date;
    time: string;
    status: string;

    constructor() {
        this.taskId = '';
        this.title = '';
        this.category = '';
        this.time = '';
        this.status = '';

    }
}