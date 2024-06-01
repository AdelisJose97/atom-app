import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, } from "rxjs";

import { apiUrl, handleError } from "../utils";
import { Task } from "./interface";

@Injectable({
    providedIn: "root"
})
export class TasksService {
    constructor(
        private http: HttpClient
    ) { }

    getAll(): Observable<Task[]> {
        return this.http
            .get<Task[]>(`${apiUrl}/tasks/`)
            .pipe(
                catchError(handleError)
            );
    }

    create(payload: Task): Observable<Task> {
        return this.http
            .post<Task>(`${apiUrl}/tasks/`, payload)
            .pipe(
                catchError(handleError)
            );
    }

    delete(taskId: string): Observable<void> {
        return this.http
            .delete<void>(`${apiUrl}/tasks/${taskId}`)
            .pipe(
                catchError(handleError)
            );
    }

    update(payload: Task): Observable<Task> {
        return this.http
            .put<Task>(`${apiUrl}/tasks/${payload.id}`, payload)
            .pipe(
                catchError(handleError)
            );
    }
}
