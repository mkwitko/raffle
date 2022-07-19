/* eslint-disable @typescript-eslint/naming-convention */
export interface User {
  userId?: string;
  userEmail?: string;
  userName?: string;
  password?: string;
  avatar?: string;
  cpf?: string;
  telefone?: string;
  userCreatedAt?: number;
  role?: string;
  super?: boolean;
  groupId?: string;
  ticketsInitial?: number;
  ticketsFinal?: number;
}
