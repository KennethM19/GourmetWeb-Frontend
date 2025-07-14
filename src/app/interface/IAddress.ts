export interface IAddressCreated {
    id:number,
    street: string,
    number: string,
    apartment: string,
    district: string,
    city: string,
    zip_code: string,
}

export interface IAddress {
    id: number,
    full_address: string
}