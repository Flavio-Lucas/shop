import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from 'src/app/services/product.service';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', component: ProductListComponent }
    ])
  ],
  providers: [ProductService]
})
export class ProductListModule { }
