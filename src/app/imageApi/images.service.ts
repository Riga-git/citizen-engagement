import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environement';
import { LoadImageResponse } from '../models/load-image-response';

@Injectable({
  providedIn: 'root'
})

export class ImagesService {

  private newImageSubject = new Subject<LoadImageResponse>();
  public newImage$ = this.newImageSubject.asObservable();
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public imageLoading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient, private snackBar : MatSnackBar) {
  }

  addImage(image : File) : void{
    let fileReader : FileReader = new FileReader();
    fileReader.onload = this._handlerOnLoad.bind(this);
    fileReader.onerror = this._handlerOnError.bind(this); 
    fileReader.readAsBinaryString(image);
    this.loadingSubject.next(true);
  }

  _handlerOnLoad(e){
    let headers = new HttpHeaders().set("Authorization", `Bearer ${environment.qImgToken}`)
                                   .set('Content-Type', 'application/json; charset=utf-8');
    let data = btoa(e.target.result);
    this.http.post<LoadImageResponse>(`${environment.apiImageUrl}`, 
                                      {"data": data}, { headers: headers })
    .pipe(
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe({
      next : (result) => {this.newImageSubject.next(result)},
      error : (error) => {this.snackBar.open('Sorry we were unable upload your image. Detail : '
                          + error.message, 'x', 
                          {panelClass : ['SnackBarError', 'SnackBarButton']})},
    });
  }

  _handlerOnError(){
    this.snackBar.open('Sorry had some trouble encodig the image', 'x', 
                         {panelClass : ['SnackBarError', 'SnackBarButton']});
    this.loadingSubject.next(false);
  }
}
