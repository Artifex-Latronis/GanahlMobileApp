export interface Unit {
  ID: string;
  binID: string;
  productID: string;
  quantity: number;
  length: number;
  lengthType?: string;
  size: string;
  description: string;
}

// export class Unit {
//   ID: string;
//   binID: string;
//   productID: string;
//   quantity: number;
//   length: number;
//   lengthType?: string;
//   size: string;
//   description: string;

//   constructor (
//     ID: string,
//     binID: string,
//     productID: string,
//     quantity: number,
//     length: number,
//     lengthDescription: string,
//     size: string,
//     description: string
//   ) {
//     this.ID = ID;
//     this.binID = binID;
//     this.productID = productID;
//     this.quantity = quantity;
//     this.length = length;
//     this.lengthType = lengthDescription;
//     this.size = size;
//     this.description = description;
//   }
// }
