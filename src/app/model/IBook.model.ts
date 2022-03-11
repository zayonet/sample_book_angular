export interface IBook {
  id?: string;
  title: string;
  price: string;
  author: string;
  description: string;
  category: string;
  image: File[];
  user_id: string | undefined;
  publishing_company: string;
  created_at?: Date;
  update_at?: Date;
}
