import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { HttpResponse } from '../models/http-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = environment.baseUrl;
  private cartItems: CartItem[] = [];

  constructor(private http: HttpClient) {
    this.loadCartFromLocalStorage();
  }

  private loadCartFromLocalStorage(): void {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
    }
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems(): Observable<CartItem[]> {
    return of(this.cartItems);
  }

  addToCart(productId: number, quantity: number): Observable<HttpResponse<CartItem>> {
    const url = this.baseUrl + environment.routes.products;
    return this.http.get<Product>(`${url}/${productId}`).pipe(
      map(product => {
        const existingItem = this.cartItems.find(item => item.productId === product.id);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          const item: CartItem = {
            productId: product.id,
            productName: product.title,
            image: product.image,
            price: product.price,
            quantity,
          };
          this.cartItems.push(item);
        }
        this.saveCartToLocalStorage();
        return {
          success: {
            productId: product.id,
            productName: product.title,
            quantity,
            price: product.price,
            image: product.image
          },
          error: null
        };
      }),
      catchError(error => of({
        success: null,
        error
      }))
    );
  }

}
