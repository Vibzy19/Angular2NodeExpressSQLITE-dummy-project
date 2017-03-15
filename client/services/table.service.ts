import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class TableService
{
    constructor(private http:Http){
        console.log("Table Service Working");
    }

    getTimeDetails(n){
        return this.http.get("/api/timedetails/top/"+n.toString())
            .map(res =>res.json());
    }

    getCategories(date = new Date()){
        return this.http.get("/api/category/"+(date.getDate()-5).toString()+"/"+date.getMonth().toString()+"/"+date.getFullYear().toString()+"/")
            .map(res => res.json());
    }

}