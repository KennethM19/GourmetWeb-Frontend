export interface IReservationCreated {
  people: number;
  date: string;
  time: string;
  phone: string;
  notes?: string
}

export interface IReservation {
  id: number;
  table: number;
  date: string;
  time: string;
  status: string;
  created_at: string;
}
