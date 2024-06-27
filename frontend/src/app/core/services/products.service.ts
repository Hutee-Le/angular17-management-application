import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { productDescription } from '../models/productDescription';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:5000/api/products/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<Product[]> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  insertItem(productDescription: productDescription): Observable<productDescription> {
    	const headers = { 'content-type': 'application/json'} 
    	console.log(JSON.stringify(productDescription))						
    return this.http.post<productDescription>('http://localhost:8000/api/products/new', productDescription, { 'headers': headers });
  }

  deleteProduct(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
