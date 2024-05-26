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
