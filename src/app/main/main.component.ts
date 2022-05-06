import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductserviceService } from '../shared/productservice.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  showAddbutton:Boolean=true;
  showUpdatebutton:Boolean=false;
  productForm:any=FormGroup;
  ProductsData: any=[];
  updateId: any;
  constructor(private formbuilder:FormBuilder, private productservice:ProductserviceService, router:Router) { }

  ngOnInit(): void {

this.getAllProducts();

this.productForm = this.formbuilder.group({
  "productName":['', Validators.required],
  "price":['', Validators.required],
  "description":['', Validators.required],
  "image":['', Validators.required],
})

  }
  getAllProducts() {
    this.productservice.getProducts().subscribe(res=>{
      this.ProductsData = res;
    
      console.log(res, "get"); 
    });
  }

  postProductsDetails(){
    console.log(this.productForm.value, "PRODUCT");

  
  
    this.productservice.postProducts(this.productForm.value).subscribe(res=>{
      alert("Product Added Successfully!");
      this.productForm.reset();
     this.getAllProducts()
   
    })
    
  }
  deleteProducts(data:any){
    this.productservice.deleteProducts(data._id).subscribe(res=>{
      alert("Product Deleted Successfully!")
      
    this.getAllProducts()
   
    })
  }
  onEdit(data:any){
  this.showUpdatebutton=true;
  this.showAddbutton=false;

    this.updateId=data._id
  
    this.productForm.patchValue(data)
  }
  updateProductsDetails(){
    this.productservice.updateProducts(this.productForm.value, this.updateId).subscribe((res:any)=>{
      alert("Product Updated Successfully!")
      
      this.getAllProducts();
      this.ShowAddForm()
     
    })
  }

  
url="/assets/images/profile.png"

onSelectFile(e:any){
if(e.target.files){
var reader = new FileReader();
reader.readAsDataURL(e.target.files[0]);
reader.onload=(event:any)=>{
  this.url=event.target.result;
}
}
}

ShowAddForm(){

  this.productForm = this.formbuilder.group({
    "productName":['', Validators.required],
    "price":['', Validators.required],
    "description":['', Validators.required],
    "image":['', Validators.required],
  })

  this.showUpdatebutton=false;
  this.showAddbutton=true;
}
ShowUpdateForm(){
  this.showUpdatebutton=true;
  this.showAddbutton=false;
}

}
