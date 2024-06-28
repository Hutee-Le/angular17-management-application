import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { productDescription } from '../models/productDescription';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  createProduct(productDescription: productDescription): Observable<productDescription> {
    return this.http.post<productDescription>(`${this.apiUrl}/create`, productDescription);
  }

  updateProduct(productId: string, productDescription: productDescription): Observable<productDescription> {
    return this.http.put<productDescription>(`${this.apiUrl}/update/${productId}`, productDescription);
  }

  deleteProduct(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }
}
