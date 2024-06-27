import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-insert',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-insert.component.html',
  styleUrl: './product-insert.component.css'
})
export class ProductInsertComponent {
onSubmit() {
throw new Error('Method not implemented.');
}
  insertFrm: any;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.insertFrm = this.fb.group({
      id:['',Validators.required], 
      name:['',[Validators.required]],
      description:[''],
    })
  }
}
