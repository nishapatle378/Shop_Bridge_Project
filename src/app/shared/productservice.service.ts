import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {


  nodeUrl=environment.nodeapiUrl
  constructor( private http:HttpClient) { }

  
  postProducts(data : any){
    return this.http.post<any>(this.nodeUrl+"products", data)
  }
  
  getProducts(){
    return this.http.get<any>(this.nodeUrl+"products")
  }
  updateProducts(data:any, id:number){
    return this.http.put<any>(this.nodeUrl+`products/`+`${id}`, data)
  }
  deleteProducts(id:number){
    return this.http.delete<any>(this.nodeUrl+`products/`+`${id}`)
  }
  
  getOne(id: any){
    return this.http.get<any>(this.nodeUrl+`products/`+`${id}`)
  }
}
