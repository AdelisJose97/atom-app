import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export const apiUrl = "https://atom-api-drab.vercel.app";

export const CLOSE_DIALOG_STATUS = "close";
export const CONFIRM_DIALOG_STATUS = "create";
export const EDIT_TASK_DIALOG_STATUS = "edit";

export interface DialogResponse<T> {
    action: string
    data?: T
}

export interface ChangeStatusTask<T> {
    status: boolean
    data?: T
}

export function handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
    // eslint-disable-next-line no-console
        console.error("An error occurred:", error.error);
    } else {
    // eslint-disable-next-line no-console
        console.error(
            `Backend returned code ${error.status}, body was: `,
            error.error
        );
    }

    return throwError(
        () => new Error("Something bad happened; please try again later.")
    );
}
