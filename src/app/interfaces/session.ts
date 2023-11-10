import { Media } from "./media";
import { Category } from "./category";
export interface Session {
  session_id: number;
  title: string;
  description: string;
  duration: string;
  media_id: Media;
//   date_added: Date;
  category_id: number;
  user_id: number;
  category?: Category
}
