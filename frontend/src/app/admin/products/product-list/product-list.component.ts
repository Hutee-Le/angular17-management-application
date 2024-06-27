import { Component, OnInit, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Product } from '../../../core/models/product';
import { ProductsService } from '../../../core/services/products.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerComponent } from "../../../spinner/spinner.component";


@Component({
    selector: 'app-product-list',
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
    imports: [CommonModule, NgxPaginationModule, SpinnerComponent]
})
export class ProductListComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  products: Product[] = [];
  totalQuantity: number = 0;
  currentPage: number = 1;  
  itemsPerPage: number = 10;
  isLoading: boolean = false;
  

  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.isLoading = true; 
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
        this.isLoading = false; 
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false; 
      }
    );
  }

  goToProductDetail(productId: string): void {
    this.router.navigate(['/products', productId]);
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

  deleteProduct(id: string): void {
    if (window.confirm('Are you sure you want to delete this product?')) {
      this.isLoading = true; 
      this.productService.deleteProduct(id).subscribe(
        () => {
          console.log('Product deleted successfully');
          this.getAll(); 
        },
        (error) => {
          console.error('Error deleting product:', error);
          this.isLoading = false; 
        }
      );
    }
  }

  calculateProductStatus(product: Product): string {
    const totalQuantity = this.calculateTotalQuantity(product);
    if (totalQuantity <= 0) {
      return 'Out of Stock'; 
    } else if (totalQuantity <= 10) {
      return 'Running Out'; 
    } else {
      return 'In Stock'; 
    }
  }

  getStatusBadgeClass(product: Product): string {
    const status = this.calculateProductStatus(product);
    switch (status) {
      case 'Out of Stock':
        return 'badge bg-danger';
      case 'Running Out':
        return 'badge bg-warning';
      case 'In Stock':
        return 'badge bg-success';
      default:
        return 'badge bg-secondary';
    }
  }
}