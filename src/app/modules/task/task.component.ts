import { DatePipe } from "@angular/common";
import {
    Component, EventEmitter, Input, OnInit, Output
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import {
    MatSlideToggleModule
} from "@angular/material/slide-toggle";

import { Task } from "../tasks/interface";
import { ChangeStatusTask } from "../utils";

@Component({
    selector: "app-task",
    standalone: true,
    imports: [MatCardModule, MatIconModule, MatSlideToggleModule, FormsModule, DatePipe],
    templateUrl: "./task.component.html",
    styleUrl: "./task.component.scss"
})

export class TaskComponent implements OnInit {
    isDone : boolean = false;
    @Input() task? : Task;

    @Output() dialoglEvent = new EventEmitter<Task>();
    @Output() deleteTaskEvent = new EventEmitter<string>();
    @Output() updateTaskStatusEvent = new EventEmitter<ChangeStatusTask<Task>>();

    handleDeleteTask(id: string) {
        this.deleteTaskEvent.emit(id);
    }

    onToggleChange(newValue: boolean): void {
        const payload: ChangeStatusTask<Task> = {
            status: newValue,
            data: this?.task
        };
        this.updateTaskStatusEvent.emit(payload);
    }

    ngOnInit(): void {
        this.isDone = this.task ? this.task.isDone : false;
    }
}
