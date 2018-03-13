/*
 * @Author: Mr.He 
 * @Date: 2018-03-05 22:01:41 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-06 10:14:37
 * @content what is the content of this file. */

import { createClient, RedisClient } from "redis";

export class Cache {
    private _client: any;

    constructor() {
        this._client = null;
    }

    init(conn_url: string) {
        this._client = createClient(conn_url) as RedisClient;
    }

    read(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._client.get(id, (err: Error, result: any) => {
                if (err) {
                    reject(err);
                }

                try {
                    result = JSON.parse(result);
                } catch (e) {

                } finally {
                    resolve(result);
                }
            })
        });
    }

    write(id: string, content: any, ex?: number): Promise<string> {
        if (typeof content == "object") {
            content = JSON.stringify(content);
        }

        return new Promise((resolve, reject) => {
            if (ex) {
                this._client.set(id, content, 'EX', ex, (err: Error, result: any) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(result);
                });
            } else {
                this._client.set(id, content, (err: Error, result: any) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(result);
                });
            }
        })
    }
}

let cache = new Cache();
export default cache;