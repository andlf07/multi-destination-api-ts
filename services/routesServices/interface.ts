export interface sqlRoute {
   user: number,
   deliveryStatus: boolean,
   comuna: string
}


export interface tripInterface {
   clientName: string,
   phoneNumber: number,
   orderNumber: number,
   street: string,
   number: number,
   comuna: string,
   city: string,
   region: string,
   zipCode: number,
   deliveryStatus: boolean,
   user: string,
}
