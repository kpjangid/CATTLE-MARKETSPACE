import { Injectable } from "@angular/core";
import { HttpService, Request } from "./httpService";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private httpService: HttpService) { }

    sendRequest(method: string, context: string, reqBody: any, headers: HttpHeaders, queryString: string, eventname: string) {

        console.log(`Sending Request : Type = ${method} | context = ${context} | query string = ${queryString} | event name = ${eventname} | request body = ${JSON.stringify(reqBody)}`);

        const request: Request = {
            context: context,
            data: reqBody,
            headers: headers,
            queryString: queryString
        }

        switch (method.toUpperCase()) {
            case 'GET':
                return new Observable<any>(
                    (observe) => {
                        this.httpService.getData(request).subscribe(
                            (response) => {
                                observe.next(response);
                            },
                            (error) => {
                                observe.error(error);
                            }
                        );
                    });
            case 'POST':
                return new Observable<any>(
                    (observe) => {
                        this.httpService.postData(request).subscribe(
                            (response) => {
                                observe.next(response);
                            },
                            (error) => {
                                observe.error(error);
                            }
                        );
                    });
            case 'PUT':
                return new Observable<any>(
                    (observe) => {
                        this.httpService.putData(request).subscribe(
                            (response) => {
                                observe.next(response);
                            },
                            (error) => {
                                observe.error(error);
                            }
                        );
                    });
            case 'DELETE':
                return new Observable<any>(
                    (observe) => {
                        this.httpService.deleteData(request).subscribe(
                            (response) => {
                                observe.next(response);
                            },
                            (error) => {
                                observe.error(error);
                            }
                        );
                    });
            default:
                return new Observable<any>(
                    (observe) => {
                        observe.error("Request Method is Wrong");
                    });
        }
    }
}