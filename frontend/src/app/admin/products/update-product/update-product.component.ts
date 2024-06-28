import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../../core/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { productDescription } from '../../../core/models/productDescription';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit{
  productId: string | null = null;
  productForm!: FormGroup;
  product: productDescription | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.initForm();
    this.getProduct();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      gender: ['', Validators.required],
      image: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      subcategory: ['']
    });
  }

  getProduct(): void {
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(
        (product) => {
          this.product = product;
          this.populateForm();
        },
        (error) => {
          console.error('Error loading product:', error);
        }
      );
    }
  }

  populateForm(): void {
    if (this.product) {
      this.productForm.patchValue({
        name: this.product.name,
        description: this.product.description,
        gender: this.product.gender,
        image: this.product.image || '',
        price: this.product.price,
        category: this.product.category,
        subcategory: this.product.subcategory || ''
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData: productDescription = this.productForm.value;
      if (this.productId) {
        this.productService.updateProduct(this.productId, productData).subscribe(
          (data) => {
            console.log('Product updated successfully:', data);
            this.router.navigate(['/products']);
          },
          (error) => {
            console.error('Error updating product:', error);
          }
        );
      }
    } else {
      console.error('Invalid form data. Please check again.');
    }
  }
}
