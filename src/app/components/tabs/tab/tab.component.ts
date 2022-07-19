import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent{

  public tabs = [
    {
      name: 'Home',
      icon: 'home-sharp',
      path: 'home',
      active: false
    },
    {
      name: 'Notícias',
      icon: 'newspaper-sharp',
      path: 'news',
      active: false
    },
    {
      name: 'Conveniência',
      icon: 'wallet-sharp',
      path: 'conv',
      active: false
    },
    {
      name: 'Perfil',
      icon: 'person-sharp',
      path: 'profile',
      active: false
    },
  ];

  constructor(
    private navigation: NavigationService,
    private router: Router
  )
  {
    this.activeTab();
  }

  goTo(url: string)
  {
    this.navigation.goTo(url);
  }

  activeTab()
  {
    for(const a of this.tabs)
    {
      if(this.router.url === '/'+a.path)
      {
        a.active = true;
      } else {
        a.active = false;
      }
    }
  }
}
