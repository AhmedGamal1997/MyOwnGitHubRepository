import { Subject } from "rxjs/Subject";
import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { User } from "./user.model";
import { Headers } from "@angular/http";
import {Product} from "./product.model";
import {UserService} from "./user.service";

@Injectable()
export class ProductService{

    constructor(private http:Http, private userService:UserService){

    }

    public product:Product;
    public productSubject = new Subject();



    get(): Promise<Product[]>{
        const headers = new Headers({'x-auth':this.userService.user.token});

       // var product = new Product(name,price);

        return this.http.get('http://localhost:3000/api/product/getProducts',{headers:headers}).toPromise()
            .then(response => response.json().data as Product[]);


    }

    addNew(name:String,price:Number){
        const headers = new Headers({'x-auth':this.userService.user.token});

        var product = new Product(name,price);

        return this.http.post('http://localhost:3000/api/product/createProduct',product,{headers:headers});
    }

    update(id:String,name:String,price:Number){
        const headers = new Headers({'x-auth':this.userService.user.token});

        var product = new Product(name,price);
        return this.http.patch('http://localhost:3000/api/product/updateProduct'+'/'+id,product,{headers:headers});
    }

    delete(id:string){
        const headers = new Headers({'x-auth':this.userService.user.token});

        //var product = new Product(name,price);
        return this.http.delete('http://localhost:3000/api/product/deleteProduct'+'/'+id,{headers:headers});
    }





}