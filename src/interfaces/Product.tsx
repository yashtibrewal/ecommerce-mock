import Category from "@/interfaces/Category";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: Category;
  rating: {
    rate: number,
    count: number
  };
}
