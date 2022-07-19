export interface SolicitationInterface {
  id?: string;
  userId?: string;
  campaignId?: string;
  ticketsInitial?: number;
  ticketsFinal?: number;
  createdAt?: number;
  approved?: boolean;
}
