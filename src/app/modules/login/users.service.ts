import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";

import { apiUrl, handleError } from "../utils";

interface UsersResponse {
    message: string,
    exists?: boolean
}

@Injectable({
    providedIn: "root"
})
export class UsersService {
    constructor(private http: HttpClient) { }

    verifyUser(email: string):Observable<UsersResponse> {
        return this.http.get<UsersResponse>(`${apiUrl}/users/${email}/`);
    }

    createUser(email: string):Observable<UsersResponse> {
        return this.http.post<UsersResponse>(`${apiUrl}/users/`, { email })
            .pipe(catchError(handleError));
    }
}
