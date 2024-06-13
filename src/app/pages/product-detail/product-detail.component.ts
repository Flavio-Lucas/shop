import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(productId).subscribe((product: Product) => {
      this.product = product;
    });
  }

  addToCart(productId: number): void {
    this.cartService.addToCart(productId, 1).subscribe(response => {
      if (response.success) {
        alert('Product added to cart!');
      } else {
        alert('Failed to add product to cart: ' + response.error);
      }
    });
  }
}
