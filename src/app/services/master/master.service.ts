import { CampaingClass } from './../../classes/campaing/campaing';
import { Injectable } from '@angular/core';
import { UserClass } from 'src/app/classes/users/user';
import { Solicitation } from 'src/app/classes/solicitation/solicitation';
import { MonitorClass } from 'src/app/classes/monitors/monitorClass';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(
    private userClass: UserClass,
    private campaingClass: CampaingClass,
    private solicitation: Solicitation,
    private monitorClass: MonitorClass
  ) {}

  setUser(id: string) {
    this.userClass.setClass(id, true).then((user) => {
      console.log(user);
      if (user) {
        this.update();
      }
      // this.solicitation.setClass(user.id, true);
    });
  }

  update() {
    this.monitorClass.setClass(true).then((res) => {
      this.campaingClass.setClass(true, this.monitorClass.findSoldNumber(res));
    });
  }
}
