import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ApiManagerServiceService {

  API_URL = "http://127.0.0.1:8000";
  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public getNews(){
    return this.httpClient.get(this.API_URL+'/test');
  }

  public sendFileByGet(file) {
    return this.httpClient.get(this.API_URL+'/sendAudioByGet/'+file);
  }

  //envoyer en paramètre le chemin du fichier audio comme ça on pourra le trouver et le lire en python
  public postSoundCapture(file: any) {
    console.log("file name : ",file);

    return this.httpClient.get(this.API_URL+'/test');
    // return this.httpClient.post(this.API_URL+'/insertData', { name: file }).subscribe(data => {
    //   console.log(data);
    // });

    // return this.httpClient.post<any>(this.API_URL+'/insertData', file, this.httpOptions).subscribe(data => {
    //   console.log(data);
    // });


    // this.httpClient.post(this.API_URL+'/translate', file).subscribe(data => {
    //   console.log(file,data);
    //     console.log("ça marche pour le fichier upload",data);
    // });
   // return this.httpClient.post();
   //console.log("Lien vers le son capturé :", url);
  }

  testPost() {
    const fileName = "test";
    return this.httpClient.get(this.API_URL+'/items/'+fileName);

    // this.httpClient.get(this.API_URL+"/items/"+fileName).subscribe(() => {
    //   console.log("test");
    // });

    // this.httpClient.post<any>('https://jsonplaceholder.typicode.com/posts', "abc").subscribe(data => {
    //     console.log(data);
    // });
    // this.httpClient.post<any>(this.API_URL+'/translate', { translate: 'Angular POST Request Example' }).subscribe(data => {
    //   console.log(data);
    // });
    // this.httpClient.post<any>(this.API_URL+'/insertData',  "{ name : 'Angular POST Request Example' }" ).subscribe(data => {
    //   console.log(data);
    // });
  }


}
