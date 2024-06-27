import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  totalQuantity: number = 0;
  loading: boolean = false;
  error: string = '';

  constructor(private route: ActivatedRoute, private productService: ProductsService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.getProductDetail(productId);
      } else {
        this.error = 'Product ID not found.';
      }
    });
  }

  getProductDetail(id: string): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe(
      (product) => {
        this.product = product;
        this.totalQuantity = this.calculateTotalQuantity(product);
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching product detail:', error);
        this.loading = false;
      }
    );
  }

  calculateTotalQuantity(product: Product): number {
    let totalQuantity = 0;
    product.colors.forEach(color => {
      color.sizes.forEach(size => {
        totalQuantity += size.quantity;
      });
    });
    return totalQuantity;
  }
}
