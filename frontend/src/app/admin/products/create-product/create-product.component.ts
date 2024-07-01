import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../../core/services/products.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { productDescription } from '../../../core/models/productDescription';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit  {
  productForm!: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      gender: ['', Validators.required],
      image: [''], 
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      subcategory: [''],
      colors: this.fb.array([
        this.createColorGroup()
      ])
    });
  }

  createColorGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      sizes: this.fb.array([
        this.createSizeGroup()
      ])
    });
  }

  createSizeGroup(): FormGroup {
    return this.fb.group({
      size_name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  get colors(): FormArray {
    return this.productForm.get('colors') as FormArray;
  }

  addColor(): void {
    this.colors.push(this.createColorGroup());
  }

  removeColor(index: number): void {
    this.colors.removeAt(index);
  }

  getSizes(colorIndex: number): FormArray {
    return (this.colors.at(colorIndex).get('sizes') as FormArray);
  }

  addSize(colorIndex: number): void {
    this.getSizes(colorIndex).push(this.createSizeGroup());
  }

  removeSize(colorIndex: number, sizeIndex: number): void {
    this.getSizes(colorIndex).removeAt(sizeIndex);
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData: productDescription = this.productForm.value;
      console.log('Product Data:', productData);
      this.productService.createProduct(productData).subscribe(
        (data) => {
          console.log('Product created successfully:', data);
          this.router.navigate(['admin/products']);
        },
        (error) => {
          console.error('Error creating product:', error);
          console.log('Detailed error response:', error.error);
        }
      );
    } else {
      console.error('Invalid form data. Please check again.');
      
    }
  }
}
