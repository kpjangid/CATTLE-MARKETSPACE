import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { AppConfig, AppConfigService } from "./appConfigService";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HttpServiceAuditor {

    private appConfig: AppConfig;

    constructor(private httpClient: HttpClient, private appConfigService: AppConfigService) {
        this.appConfig = appConfigService.getConfig();
    }

    getData<T>(request: Request): Observable<HttpResponse<T>> {

        let url: string;

        if (request.reqUrl) {
            url = request.reqUrl;
        } else {

            if (!request.queryString) {
                request.queryString = '';
            } else {
                request.queryString = `?${request.queryString}`;
            }

            url = `${this.appConfig.PROTOCOL}://${this.appConfig.IP}:${this.appConfig.PORT}/${this.appConfig.BASE_URL_2}/${request.context}${request.queryString}`;

        }

        const httpOptions = {
            headers: request.headers,
            observe: 'response' as 'body'
        };
        return new Observable<HttpResponse<T>>(
            (observe) => {
                this.httpClient.get<HttpResponse<T>>(url).subscribe(
                    (response) => {
                        observe.next(response);
                    },
                    (error) => {
                        observe.error(error);
                    }
                );
            }
        );
    }

    postData<T>(request: Request): Observable<HttpResponse<T>> {

        let url: string;

        if (request.reqUrl) {
            url = request.reqUrl;
        } else {

            if (!request.queryString) {
                request.queryString = '';
            } else {
                request.queryString = `?${request.queryString}`;
            }

            url = `${this.appConfig.PROTOCOL}://${this.appConfig.IP}:${this.appConfig.PORT}/${this.appConfig.BASE_URL}/${request.context}${request.queryString}`;
        }

        const httpOptions = {
            headers: request.headers,
            observe: 'response' as 'body'
        };

        return this.httpClient.post<HttpResponse<T>>(url, request.data);
    }

    putData<T>(request: Request): Observable<HttpResponse<T>> {

        let url: string;

        if (request.reqUrl) {
            url = request.reqUrl;
        } else {

            if (!request.queryString) {
                request.queryString = '';
            } else {
                request.queryString = `?${request.queryString}`;
            }

            url = `${this.appConfig.PROTOCOL}://${this.appConfig.IP}:${this.appConfig.PORT}/${this.appConfig.BASE_URL}/${request.context}${request.queryString}`;
        }

        const httpOptions = {
            headers: request.headers,
            observe: 'response' as 'body'
        };
        return this.httpClient.put<HttpResponse<T>>(url, request.data);
    }

    deleteData<T>(request: Request): Observable<HttpResponse<T>> {

        let url: string;

        if (request.reqUrl) {
            url = request.reqUrl;
        } else {

            if (!request.queryString) {
                request.queryString = '';
            } else {
                request.queryString = `?${request.queryString}`;
            }

            url = `${this.appConfig.PROTOCOL}://${this.appConfig.IP}:${this.appConfig.PORT}/${this.appConfig.BASE_URL}/${request.context}${request.queryString}`;
        }

        const httpOptions = {
            headers: request.headers,
            observe: 'response' as 'body'
        };
        return this.httpClient.delete<HttpResponse<T>>(url);
    }

}

export interface Request {
    context: string;
    data?: any;
    headers?: HttpHeaders;
    queryString?: string;
    responseType?: string;
    reqUrl?: string;
    callbackFunction?(...args): any;
}