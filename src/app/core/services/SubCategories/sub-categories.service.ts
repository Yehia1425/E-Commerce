import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {

  constructor(private httpClient:HttpClient) { }

  getAllSub():Observable<any>{
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/subcategories`)
  };

  getSpecificSub(id:string):Observable<any>{
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`)
  }


  getSpecificOnSub(id:string):Observable<any>{
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
  }

}
