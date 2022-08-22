import { Raffle } from '../raffle/raffle';

export interface Monitor {
  id?: string;
  number?: number;
  raffles?: Array<Raffle>;
}
