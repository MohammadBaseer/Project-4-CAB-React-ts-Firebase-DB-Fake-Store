export declare type IncomingStoreArrayIntoStateType = {
  uid: string | number;
  id: string | number;
  title: string;
  price: number;
  description: string;
  image: Array<string>;
};

///!SECTION Thi is for API need to fixe the name
export declare type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: {
    name: string;
  };
  images: Array<string>;
  storeArrayIntoState: IncomingStoreArrayIntoStateType | object | Array<string>;
};

//User Auth Action Types
export type User = {
  uid: string | number;
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
  imageURL: string;
  description: string;
  data: Date;
};

export declare type CardItemTypes = {
  docID: string | number;
  uid: string | number;
  id: number;
  image: Array<string>;
  images: Array<string>;
  title: string;
  category: string;
  description: string;
  price: number;
  storeArrayIntoState: object;
  deleteCart: any;
  cardItem: CardItemTypes;
};

//!------------
export declare type ProductsMergeType = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: Array<string>;
  category: {
    id: number;
    name: string;
  };
};
