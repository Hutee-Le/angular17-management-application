export interface User {
    id?: string
    name: string;
    mobNumber: string;
    age: number;
    email: string;
    password: string;
    gender: string;
    uploadPhoto?: string;
    role: string;
    activated: boolean;
    address?: Address;
}

export interface Address {
    id?: number; 
    street: string;
    city: string;
    state?: string; 
  }
