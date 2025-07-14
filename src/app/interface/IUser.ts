export interface IUser {
  id: number;
  role: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  doc_number: string;
  is_superuser: boolean;
  is_active: boolean;
  is_staff: boolean;
  addresses: any[];
  cards: any[];
  last_login: string | null;
  date_created: string;
}