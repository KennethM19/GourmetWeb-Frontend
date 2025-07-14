export interface ICardCreated {
  number: string;
  exp_month: number;
  exp_year: number;
  owner: string;
  is_credit: boolean;
}

export interface ICard {
  id: number;
  last_four_digits: string;
  expiration: string;
  owner: string;
  is_credit: boolean;
}
