export declare type IncomingStoreArrayIntoStateType = {
  uid: string;
  id: string;
  title: string;
  price: number;
  description: string;
  image: [];
};

///!SECTION Thi is for API need to fixe the name
export declare type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  storeArrayIntoState: IncomingStoreArrayIntoStateType | object | [];
};

//User Auth Action Types
export type User = {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};

//!SECTION Thi is for firebase store need to fixe the name

export declare type ProductsType = {
  id: number;
  title: string;
  price: number;
  category: {
    name: string;
  };
  images: Array<string>;
  description: string;
  data: Date;
};

export declare type CardItemTypes = {
  docID: string;
  uid: string;
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  price: number;
  storeArrayIntoState: object;
  deleteCart: any;
  cardItem: CardItemTypes;
};
