import { SkeletonTeamComponent } from './skeleton-team.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SkeletonTeamComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    SkeletonTeamComponent
  ],
  providers: []
})

export class MySkeletonTeam {}
