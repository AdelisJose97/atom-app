import { Component } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
    FormControl, FormsModule, ReactiveFormsModule, Validators
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { merge } from "rxjs";

import { RegisterDialogComponent } from "../register-dialog/register-dialog.component";
import { CONFIRM_DIALOG_STATUS } from "../utils";
import { UsersService } from "./users.service";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss"
})
export class LoginComponent {
    email = new FormControl("", [Validators.required, Validators.email]);

    errorMessage = "";

    constructor(
        public dialog: MatDialog,
        private router: Router,
        private usersService: UsersService
    ) {
        merge(this.email.statusChanges, this.email.valueChanges)
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.updateErrorMessage());
    }

    verifyUser() {
        if (this.email.value !== null) {
            this.usersService.verifyUser(this.email.value).subscribe({
                next: () => {
                    this.router.navigate(["/tasks"]);
                },
                error: ({ status, error }) => {
                    if (status === 401 && !error.exists) {
                        this.openDialog();
                    }
                },
            });
        }
    }

    createUser() {
        if (this.email.value !== null) {
            this.usersService.createUser(this.email.value).subscribe({
                next: () => {
                    this.router.navigate(["/tasks"]);
                },
                error: ({ status, error }) => {
                    if (status === 401 && !error.exists) {
                        this.openDialog();
                    }
                },
            });
        }
    }

    updateErrorMessage() {
        if (this.email.hasError("required")) {
            this.errorMessage = "Debes ingresar un valor";
        } else if (this.email.hasError("email")) {
            this.errorMessage = "El correo no es valido";
        } else {
            this.errorMessage = "";
        }
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(RegisterDialogComponent, {
            width: "300px",
            enterAnimationDuration: 0,
            exitAnimationDuration: 0,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === CONFIRM_DIALOG_STATUS) {
                return this.createUser();
            }
            return null;
        });
    }
}
