export interface IProduct {
  id: number;
  name: string;
  price: number;
  category_id: number;
  gender_id: number;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  category: ICategory;
  gender: IGender;
  images: IImages[];
  sizes: ISize[];
  colors: IColor[];
  descriptions: IDescription[];
  count?:number
}
export interface ISize {
  id: number;
  product_id: number;
  size_id: number;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  size: {
    id: number;
    name: string;
    deleted_at: string;
    created_at: string;
    updated_at: string;
  };
}
export interface IColor {
  id: number;
  product_id: number;
  color_id: number;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  color: {
    id: number;
    name: string;
    hexa: string;
    deleted_at: string;
    created_at: string;
    updated_at: string;
  };
}
export interface IImages {
  id: number;
  image: string;
  product_id: number;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}
export interface IGender {
  id: number;
  name: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}
export interface IDescription {
  id: number;
  title: string;
  description: string;
  product_id: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}
export interface ICategory {
  id: number;
  name: string;
  image: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}
export interface IPagination {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}
