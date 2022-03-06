export interface IBook {
  id?: string;
  title: string;
  price: string;
  author: string;
  description: string;
  category: string;
  image: string;
  user_id: string;
  created_at?: Date;
  update_at?: Date;
}
