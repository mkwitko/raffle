import { Raffle } from './../raffle/raffle';
export interface Campaing {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  picture?: string;
  prize?: string;
  tickets?: number;
  ticketsAvaliable?: number;
  value?: number;
  createdAt?: number;
  startAt?: number;
  endedAt?: number;
  groupId?: string;
  active?: boolean;
  raffles?: Raffle[];
  sold?: number;
  reserved?: number;
  free?: number;
  ticketsShare?: number;
}
