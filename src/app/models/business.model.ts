export interface IBusiness extends IBusinessAddRequest {
    id: string;
    brandImageUrl: string;
}

export interface IBusinessAddRequest {
    brandImage: string;
    brandName: string;
    whatsapNumber: string;
    social: ISocial[];
}

export interface ISocial {
    url: string;
    icon: string;
}