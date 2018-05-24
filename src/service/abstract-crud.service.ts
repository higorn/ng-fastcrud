import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Modelable } from '../model/modelable';

export abstract class AbstractCrudService<M extends Modelable> {
    private baseEndPoint: string;
    private endPoint: string;
    // private headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http,
        private options: RequestOptions,
    ) {
        this.baseEndPoint = this.options.url || '';
    }

    _http(): Http {
        return this.http;
    }

    setEndPoint(endPoint: string): AbstractCrudService<M> {
        this.endPoint = `${this.baseEndPoint}/${endPoint}`;
        // this.endPoint = endPoint;
        return this;
    }

/*
    getHeaders(): Headers {
        return this.headers;
    }
*/

    getEndPoint(): string {
        return this.endPoint;
    }

    getBaseEndPoint(): string {
        return this.baseEndPoint;
    }

    search(query: string): Observable<M[]> {
        return this.http.get(`${this.endPoint}?termo=${query}`, /*{headers: this.headers}*/)
            .map(resp => {
                const data: M[] = resp.json().data as M[];
                return data;
            });
    }

    get(id: number): Promise<M> {
        const url = `${this.endPoint}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(resp => {
                console.log(resp.json());
                return resp.json().data as M;
            })
            .catch(this.handleError);
    }

/*    create(model: M): Promise<any> {
        const url = `${this.endPoint}`;
        return this.http.post(url, model)
            .toPromise()
            .then(resp => {
                console.log(resp.json());
                return resp.json();
            })
            .catch(this.handleError);
    }*/
    create(model: M): Observable<M> {
        const url = `${this.endPoint}`;
        return this.http.post(url, model).map(resp => {
            console.log(resp.json());
            return resp.json().data as M;
        });
    }

    update(model: M): Observable<M> {
        const url = `${this.endPoint}/${model.id}`;
        return this.http.put(url, model).map(resp => {
            console.log(resp.json());
            return resp.json().data as M;
        });
    }

    delete(model: M): Promise<any> {
        const url = `${this.endPoint}/${model.id}`;
        return this.http.delete(url, /*{headers: this.headers}*/)
            .toPromise()
            .then(resp => {
                console.log(resp.json());
                return resp.json();
            })
            .catch(this.handleError);
    }

    protected handleError(error: any): Promise<any> {
        console.error('Erro ao buscar dados', error);
        return Promise.reject(error.message || error);
    }
}
