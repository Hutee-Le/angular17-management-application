import { Color } from "./color";

export class Product {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public gender: string,
        public image: string,
        public price: number,
        public category: string,
        public subcategory: string,
        public createdAt: Date,
        public updatedAt: Date,
        public colors: Color[],
        public totalQuantity: number
      ) {}
}