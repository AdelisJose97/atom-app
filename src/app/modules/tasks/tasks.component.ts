import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { TaskComponent } from "../task/task.component";
import { TaskDialogComponent } from "../task-dialog/task-dialog.component";
import {
    ChangeStatusTask,
    CONFIRM_DIALOG_STATUS,
    DialogResponse,
    EDIT_TASK_DIALOG_STATUS,
} from "../utils";
import { Task } from "./interface";
import { TasksService } from "./tasks.service";

@Component({
    selector: "app-tasks",
    standalone: true,
    imports: [MatIconModule, TaskComponent, CommonModule],
    templateUrl: "./tasks.component.html",
    styleUrl: "./tasks.component.scss",
})
export class TasksComponent implements OnInit {
    myTasks: Task[] = [];
    loading: boolean = false;
    constructor(
        public dialog: MatDialog,
        private tasksService: TasksService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    showSuccess(message: string = "Se ha realizado la accion con exito") {
        this.toastr.success(message, "Hecho");
    }
    showError(message: string = "No se ha realizado la accion con exito") {
        this.toastr.error(message, "Opps");
    }

    addTask(newTask: Task) {
        this.myTasks.unshift(newTask);
    }

    filterTaskById(taskId: string) {
        this.myTasks = this.myTasks.filter(({ id }) => id !== taskId);
    }

    createTask(payload: Task) {
        this.tasksService.create(payload).subscribe({
            next: (value: Task) => {
                this.showSuccess("Se ha creado la tarea");
                this.addTask(value);
            },
            error: ({ error }) => {
                const { message = "" } = error;
                this.showError(message);
            },
        });
    }

    deleteTask(taskId: string) {
        this.tasksService.delete(taskId).subscribe({
            next: () => {
                this.showSuccess("Se ha borrado la tarea");
                this.filterTaskById(taskId);
            },
            error: ({ error }: HttpErrorResponse) => {
                const { message = "" } = error;
                this.showError(message);
            },
        });
    }

    updateTask(payload: Task) {
        this.tasksService.update(payload).subscribe({
            next: (value: Task) => {
                this.showSuccess("Se ha editado la tarea");
                const index = this.myTasks.findIndex((task) => task.id === value.id);
                if (index !== -1) {
                    this.myTasks[index] = value;
                }
            },
            error: ({ error }) => {
                const { message = "" } = error;
                this.showError(message);
            },
        });
    }
    updateTaskStatus(payload: ChangeStatusTask<Task>) {
        if (payload.data) {
            this.updateTask({
                ...payload.data,
                isDone: payload.status,

            });
        }
    }

    openDialog(task?: Task): void {
        const dialogRef = this.dialog.open(TaskDialogComponent, {
            data: task,
            width: "300px",
            enterAnimationDuration: 0,
            exitAnimationDuration: 0,
        });

        dialogRef.afterClosed().subscribe((result: DialogResponse<Task>) => {
            // to create task
            if (result.action === CONFIRM_DIALOG_STATUS) {
                if (result.data) {
                    const payload: Task = {
                        ...result.data,
                        id: crypto.randomUUID(),
                        createdAt: new Date().toString(),
                    };
                    this.createTask(payload);
                }
            } else if (result.action === EDIT_TASK_DIALOG_STATUS) {
                if (result.data) {
                    const payload: Task = {
                        ...result.data,
                    };
                    this.updateTask(payload);
                }
            }
        });
    }

    signOut() {
        this.router.navigate(["/login"]);
    }

    ngOnInit(): void {
        this.loading = true;
        this.tasksService.getAll().subscribe({
            next: (tasks) => {
                this.myTasks = tasks;
                this.loading = false;
            },
            error: ({ error }) => {
                const { message = "" } = error;
                this.showError(message);
            },
        });
    }
}
