import { Component ,OnInit} from '@angular/core';
import {Response} from "@angular/http";
import { ProductService } from '../../product.service';
import {FormBuilder,FormGroup, Validators,ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../user.service";
import {Product} from "../../product.model";

@Component({
  selector: 'app-dashboard-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.css']


})
export class ItemsComponent implements OnInit {


    addd:any;
    name:string = '';
    price:Number = 0;
    addForm : FormGroup;
    adde:any;
    namee:string = '';
    pricee:Number = 0;
    addForme : FormGroup;
    id: String;
    pro: Product[];
    constructor(private fb: FormBuilder, private productService:ProductService,private router:Router) {
        this.addForm = fb.group({

            'name' : [null, Validators.required],
            // Validators.pattern(/^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{4,20}/),
            'price' : [null, Validators.required]
        })
        this.addForme = fb.group({

            'namee' : [null, Validators.required],
            // Validators.pattern(/^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{4,20}/),
            'pricee' : [null, Validators.required]
        })

    }
    ngOnInit(): void {
        this.productService.get().then(pro => this.pro=pro);
    }


   creates(addd){
       // var add=new add(this.name,this.price);
       this.name=addd.name;
       this.price=addd.price;
       this.productService.addNew(addd.name,addd.price)
           .subscribe((res: Response)=>{

               this.productService.product = null;
               this.productService.productSubject.next(this.productService.product);
               if(res.status==200) {
                   console.log("it's ok");
                 // window.location.reload();
                   // this.username=product.username;
                   // this.name=product.name;
                   // this.price=product.price;
               }
            },(err)=>{
                console.log(err);
            })
    }

    delete(id){
        //this.name=id.name;
        //this.price=id.price;
        this.productService.delete(id)
            .subscribe((res: Response)=>{

                this.productService.product = res.json().data;
                this.productService.productSubject.next(this.productService.product);
                if(res.status===200) {
                    // this.username=product.username;
                    // this.name=product.name;
                    // this.price=product.price;
                }


            },(err)=>{
                console.log(err);
            })
    }

    edit(id,adde){
        this.namee=adde.namee;
        this.pricee=adde.pricee;
        //this.id=adde.id;
        this.productService.update(id,adde.namee,adde.pricee)
            .subscribe((res: Response)=>{

                this.productService.product = res.json().data;
                this.productService.productSubject.next(this.productService.product);
                if(res.status===200) {
                    // this.username=product.username;
                    // this.name=product.name;
                    // this.price=product.price;
                }


            },(err)=>{
                console.log(err);
            })
    }

    // get(){
    //     // this.name=id.name;
    //     // this.price=id.price;
    //
    //
    // }

}
