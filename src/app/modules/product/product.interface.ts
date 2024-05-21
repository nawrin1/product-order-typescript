export type ProductInterface={
    name:string;
    description:string;
    price:number;
    category:string;
    tags:string[];
    variants:{type:string,value:string}[];
    inventory:{quantity:number,inStock:boolean}

}