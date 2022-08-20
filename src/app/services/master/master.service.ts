import { CampaingClass } from './../../classes/campaing/campaing';
import { GroupClass } from './../../classes/group/group';
import { Injectable } from '@angular/core';
import { UserClass } from 'src/app/classes/users/user';
import { Solicitation } from 'src/app/classes/solicitation/solicitation';
import { Logs } from 'src/app/classes/logs/logs';
import { RaffleService } from '../raffle/raffle.service';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(
    private userClass: UserClass,
    private campaingClass: CampaingClass,
    private solicitation: Solicitation,
    private logs: Logs,
    private raffle: RaffleService
  ) {}

  setUser(id: string) {
    this.userClass.setClass(id, true).then((user) => {
      this.campaingClass.setClass(true).then((res) => {
        // let recover2 = [];
        // for (const a of res.raffles) {
        //   if (a.sold === true) {
        //     recover2.push(a);
        //   }
        // }
        // const recover1 = this.campaingClass.recover();
        // let recoverFinal = [];
        // for (const a of recover1) {
        //   recoverFinal[a.number] = a;
        // }
        // for (const a of recover2) {
        //   recoverFinal[a.number] = a;
        // }
        // let result = [];
        // for (const a of recoverFinal) {
        //   if (a) {
        //     result.push(a);
        //   }
        // }
        // console.log(result);
        // const camp = this.campaingClass.get();
        // camp.free = 1200 - result.length;
        // camp.sold = result.length;
        // for (const a of result) {
        //   camp.raffles[a.number - 1] = a;
        // }
        // this.campaingClass.update(camp);
      });
      this.solicitation.setClass(user.id, true);
    });
  }
}
