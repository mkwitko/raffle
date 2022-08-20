export interface Raffle {
  id?: string;
  number?: number;
  buyer?: string;
  contact?: string;
  seller?: string;
  purchasedWhen?: number;
  value?: string;
  reserved?: boolean;
  sold?: boolean;
  reserver?: string;
  reservedTill?: number;
  log?: number;
}
