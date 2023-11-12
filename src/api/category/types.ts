//login

export type ICategories = ICategory[];

export interface ICategory{
  id:number;
  name:string;
}


export interface IGetCategoryRequest{
  categoryId:number;
}