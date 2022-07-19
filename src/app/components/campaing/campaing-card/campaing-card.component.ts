import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaing-card',
  templateUrl: './campaing-card.component.html',
  styleUrls: ['./campaing-card.component.scss'],
})
export class CampaingCardComponent {
  @Input() info;

  constructor(private navigation: NavigationService) {}

  goToCampaing(info) {
    this.navigation.rotaId(info.url, info.id);
  }
}
