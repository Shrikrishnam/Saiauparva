import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { from, Observable, Subject } from 'rxjs';
import { Fitness } from '../model/fitness';


const httpOptions = {
  headers: new Headers({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: 'root' })
export class AppointmentService {

    public static BaseUrl = "http://localhost:6565/";
    constructor(private http: Http, private https: HttpClient) { }
    
    postfitnessdata(data){
      return this.http.post(AppointmentService.BaseUrl+'allfriends',data,httpOptions).pipe(map((response: Response) => response.json()));
    }
    getfitnessdata() {
      return this.http.get(AppointmentService.BaseUrl+'allfriends',httpOptions).pipe(map((response: Response) => response.json()));
    }
    getUserById(id: number) {
      return this.https.get<Fitness>(AppointmentService.BaseUrl + 'allfriends/' + id);
    }
    updateAppointment(appt: Fitness) {
      return this.http.put(AppointmentService.BaseUrl + 'allfriends/' + appt.id, appt);
    }
    deleteAppointment(id: number) {
      return this.http.delete(AppointmentService.BaseUrl + 'allfriends/' + id);
    }
  
    createComment(data: Comment): Observable<any> {
      return this.http.post(AppointmentService.BaseUrl+'comments',data,httpOptions).pipe(map((response: Response) => response.json()));
    }
  
    private _listeners = new Subject<any>();
    listen(): Observable<any>{
        return this._listeners.asObservable();
    }
    filter( filterBy: string){
        this._listeners.next(filterBy);
    }
}