import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductserviceService } from '../shared/productservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ProductsData: any =[];

  constructor(private productservice:ProductserviceService, router:Router) { }

  ngOnInit(): void {

    this.getAllProducts();
  }
  getAllProducts() {
    this.productservice.getProducts().subscribe(res=>{
      this.ProductsData = res;
    
      console.log(res, "get"); 
    });
  }
}
