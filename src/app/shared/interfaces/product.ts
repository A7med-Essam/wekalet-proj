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
  min_quantity:number
  quantity:number
  old_price:string
}
export interface ISize {
  id: number;
  product_id: number;
  size_id: number;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  size: ISize2
}

export interface ISize2 {
    id: number;
    name: string;
    deleted_at: string;
    created_at: string;
    updated_at: string;
}
export interface IColor {
  id: number;
  product_id: number;
  color_id: number;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  color: IColor2
}

export interface IColor2 {
    id: number;
    name: string;
    hexa: string;
    deleted_at: string;
    created_at: string;
    updated_at: string;
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
  array:any
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
  data:any
}

export interface IFilterOptions {
  colors: IColor2[];
  sizes: ISize2[];
  genders: IGender[];
  categories: ICategory[];
}
