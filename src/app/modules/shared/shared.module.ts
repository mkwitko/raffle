import { GroupClass } from './../../classes/group/group';
import { CampaingClass } from './../../classes/campaing/campaing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserClass } from 'src/app/classes/users/user';
import { Solicitation } from 'src/app/classes/solicitation/solicitation';
import { Logs } from 'src/app/classes/logs/logs';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [UserClass, CampaingClass, GroupClass, Solicitation, Logs],
})
export class SharedModule {}
