import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild([
      { path: '', component: ProductDetailComponent }
    ])
  ]
})
export class ProductDetailModule { }
