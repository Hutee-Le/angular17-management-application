export interface productDescription {
    name: string;
    description: string;
    gender: string;
    image?: string;
    price: number;
    category: string;
    subcategory?: string;
    colors: ColorDescription[];
}

export interface ColorDescription {
    name: string;
    sizes: SizeDescription[];
  }
  
  export interface SizeDescription {
    size_name: string;
    quantity: number;
  }