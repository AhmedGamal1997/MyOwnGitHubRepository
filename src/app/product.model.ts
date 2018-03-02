export class Product{
    public username: String
    public name: String;
    public _id: String;
    public price: Number;
    public createdAt: Date;
    public updatedAt: Date;


    constructor(name:String,price:Number)
    {

        this.name = name;
        this.price = price;
        //this.createAt = createAt;
        //this.updateAt = updatedAt;
    }
}
