import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    const url = this.baseUrl + environment.routes.products;
    return this.http.get<Product[]>(url);
  }

  getProduct(id: number): Observable<Product> {
    const url = this.baseUrl + environment.routes.products;
    return this.http.get<Product>(`${url}/${id}`);
  }
}
