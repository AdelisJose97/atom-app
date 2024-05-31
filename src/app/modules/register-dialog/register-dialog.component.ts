import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-register-dialog",
    standalone: true,
    imports: [MatDialogModule, MatButtonModule,],
    templateUrl: "./register-dialog.component.html",
    styleUrl: "./register-dialog.component.scss"
})
export class RegisterDialogComponent {
    constructor(public dialogRef: MatDialogRef<RegisterDialogComponent>) { }
    closeDialog(action: string) {
        this.dialogRef.close(action);
    }
}
