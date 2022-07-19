import { CampaingClass } from './../../classes/campaing/campaing';
import { GroupClass } from './../../classes/group/group';
import { Injectable } from '@angular/core';
import { UserClass } from 'src/app/classes/users/user';
import { Solicitation } from 'src/app/classes/solicitation/solicitation';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(
    private userClass: UserClass,
    private campaingClass: CampaingClass,
    private groupClass: GroupClass,
    private solicitation: Solicitation
  ) {}

  setUser(id: string) {
    this.userClass.setClass(id, true).then((user) => {
      this.campaingClass.setClass(true).then(() => {
        // this.groupClass.setClass(user.groupId, true).then(() => {
        //   this.setAdminCampaignClass(this.groupClass.getUserGroup().id);
        // });
      });
      this.solicitation.setClass(user.id, true).then((res) => {
        console.log('Solicitation ', res);
      });
    });
  }

  // setAdminCampaignClass(groupId) {
  //   this.campaingClass.setAdminClass(groupId, true).then((res) => {
  //     this.campaingClass.createPagination(res);
  //     this.campaingClass.getMyTickets(res);
  //   });
  //   this.campaingClass.setAdminClass(groupId, false);
  // }
}
