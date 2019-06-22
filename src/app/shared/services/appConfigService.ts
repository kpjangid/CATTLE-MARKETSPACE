import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    private appConfig: AppConfig = {};
    constructor(private httpClient: HttpClient) { }
    loadConfig(filepath) {
        return new Promise<void>((resolve, reject) => {
            this.httpClient.get<any>(filepath).subscribe(
                (response) => {
                    this.appConfig['PROTOCOL'] = response['protocol'];
                    this.appConfig['IP'] = response['ip'];
                    this.appConfig['PORT'] = response['port'];
                    this.appConfig['ENV'] = response['env'];
                    this.appConfig['BASE_URL'] = response['baseUrl'];
                    this.appConfig['BASE_URL_2'] = response['baseUrl2'];
                    console.log("Config Loaded Successfully");
                    resolve();
                }, (error) => {
                    const errorMsg = "ERROR : Loading Config, " + JSON.stringify(error);
                    console.error(errorMsg);
                    reject(errorMsg);
                }
            );
        });
    }
    getConfig() {
        return this.appConfig;
    }
}

export interface AppConfig {
    PROTOCOL?: string;
    IP?: string;
    PORT?: number;
    ENV?: string;
    BASE_URL?: string;
    BASE_URL_2?: string;
}