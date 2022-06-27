export interface IProduct {
    id: string;
    name: string;
    price: number;
}
export class Product implements IProduct {
    id: string = "";
    name: string = "";
    price: number = 0;

    constructor(id?: string, name?: string, price?: number) {

        if (id && name && price) {
            this.id = id;
            this.name = name;
            this.price = price;
        }
    }
}