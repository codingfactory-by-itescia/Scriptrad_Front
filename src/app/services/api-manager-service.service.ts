import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ApiManagerServiceService {

  API_URL = "http://127.0.0.1:8000";
  constructor(private httpClient: HttpClient) {}

  //needed to send json objects
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public getNews(){
    return this.httpClient.get(this.API_URL+'/test');
  }

  public sendFileByGet(file) {
    return this.httpClient.get(this.API_URL+'/sendAudioByGet/'+file);
  }

  public transcript(file){
    return this.httpClient.post(this.API_URL+'/transcript', {"file" : file}, this.httpOptions);
  }

  public summarize(text) {
    return this.httpClient.post(this.API_URL+'/summarize', {"text" : text}, this.httpOptions);
  }

}
