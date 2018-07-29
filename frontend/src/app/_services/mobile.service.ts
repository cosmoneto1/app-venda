import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mobile } from '../_models/mobile';

@Injectable({ providedIn: 'root' })
export class MobileService {
    private urlBase = '/api/claro/mobile';
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Mobile[]>(this.urlBase).toPromise();
    }

    getItem(id) {
        const url = `${this.urlBase}/${id}`;
        return this.http.get<Mobile[]>(url).toPromise();
    }

    createItem(mobile: Mobile) {
        return this.http.post<Mobile>(this.urlBase, mobile).toPromise();
    }
}
