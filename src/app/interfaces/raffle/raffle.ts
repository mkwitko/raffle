export interface Raffle {
  id?: string;
  number?: number;
  buyer?: string;
  purchasedWhen?: number;
  value?: string;
  reserved?: boolean;
  sold?: boolean;
  reserver?: string;
  reservedTill?: number;
}
