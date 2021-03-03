import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteDataService {

  data: any;

  constructor() { }

  public setData(data){
    this.data = data;
  }

  public getData(){
    return this.data;
  }
}
