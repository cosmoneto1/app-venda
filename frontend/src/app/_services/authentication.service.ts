import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>('/api/claro/login', { username: username, password: password })
            .pipe(map((res: any) => {
                if (res && res.token) {
                    localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token }));
                }
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}
