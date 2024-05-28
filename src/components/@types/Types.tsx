export declare type Category = {
  id: number;
  name: string;
  image: string;
};

export declare type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
};

export type User = {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};