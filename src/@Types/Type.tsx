export declare type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
  };

  //User Auth Action Types
  export type User = {
    uid: string | null;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  };


  export declare type ProductsType = {
    title: string;
    price: number;
    category: string;
    imageURL: string;
    description: string;
    data: Date;
  };