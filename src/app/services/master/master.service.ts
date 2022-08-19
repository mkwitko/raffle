import { CampaingClass } from './../../classes/campaing/campaing';
import { GroupClass } from './../../classes/group/group';
import { Injectable } from '@angular/core';
import { UserClass } from 'src/app/classes/users/user';
import { Solicitation } from 'src/app/classes/solicitation/solicitation';
import { RaffleClass } from 'src/app/classes/raffle/raffle';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(
    private userClass: UserClass,
    private campaingClass: CampaingClass,
    private raffle: RaffleClass,
    private solicitation: Solicitation
  ) {}

  setUser(id: string) {
    this.userClass.setClass(id, true).then((user) => {
      this.campaingClass.setClass(true).then(() => {});
      this.solicitation.setClass(user.id, true);
    });
  }
}
