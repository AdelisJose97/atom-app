import { Component, Inject, OnInit } from "@angular/core";
import {
    FormBuilder, FormsModule, ReactiveFormsModule, Validators
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { Task } from "../tasks/interface";
import { CONFIRM_DIALOG_STATUS, DialogResponse, EDIT_TASK_DIALOG_STATUS } from "../utils";

@Component({
    selector: "app-task-dialog",
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule],
    templateUrl: "./task-dialog.component.html",
    styleUrl: "./task-dialog.component.scss"
})
export class TaskDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<TaskDialogComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData: Task
    ) { }

    formGroup = this.fb.group({
        title: ["", Validators.required],
        description: ["", Validators.required],
    });

    onSubmit(): void {
        const payload : DialogResponse<Task> = {
            action: this.dialogData ? EDIT_TASK_DIALOG_STATUS : CONFIRM_DIALOG_STATUS,
            data: {
                id: this.dialogData?.id,
                title: this.formGroup.get("title")?.value ?? "",
                description: this.formGroup.get("description")?.value ?? "",
                isDone: this.formGroup.get("isDone")?.value ?? false,
            }

        };
        this.dialogRef.close(payload);
    }

    closeDialog(action: string) {
        this.dialogRef.close(action);
    }

    ngOnInit(): void {
        if (this.dialogData) {
            this.formGroup.setValue({
                title: this.dialogData.title,
                description: this.dialogData.description,
            });
        }
    }
}
