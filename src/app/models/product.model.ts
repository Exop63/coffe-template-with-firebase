export interface IProduct extends IProductAddRequest {
    id: string;
    imgUrl: string;
}

export interface IProductAddRequest {
    content: string;
    title: string;
    url: string;
}