import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { environment } from 'src/environments/environement';
import { LoadImageResponse } from '../models/load-image-response';

@Injectable({
  providedIn: 'root'
})



export class ImagesService {

  private newImageSubject = new Subject<LoadImageResponse>();
  public newImage$ = this.newImageSubject.asObservable();

  constructor(private http: HttpClient, private snackBar : MatSnackBar) {
  }

  addImage(image : File) : void{
    let fileReader : FileReader = new FileReader();
    fileReader.onload = this._handlerOnLoad.bind(this);
    fileReader.onerror = this._handlerOnError.bind(this); 
    fileReader.readAsBinaryString(image);
  }

  _handlerOnLoad(e){
    let headers = new HttpHeaders().set("Authorization", `Bearer ${environment.qImgToken}`).set('Content-Type', 'application/json; charset=utf-8');
    let data = btoa(e.target.result);
    this.http.post<LoadImageResponse>(`${environment.apiImageUrl}`, {"data": data}, { headers: headers })
    .subscribe({
      next : (result) => {console.log(result), this.newImageSubject.next(result)},
      error : (error) => {console.log(error), this.snackBar.open('Sorry we were unable upload your image. Detail : '+ error.message, 'x', {panelClass : ['SnackBarError', 'SnackBarButton']})},
    });
  }

  _handlerOnError(){
    this.snackBar.open('Sorry had some trouble encodig the image', 'x', {panelClass : ['SnackBarError', 'SnackBarButton']});
  }
}
