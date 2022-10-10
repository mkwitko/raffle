import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserClass } from './classes/users/user';
import { AuthService } from './services/firebase/auth.service';
import { MasterService } from './services/master/master.service';
import { MenuService } from './services/menu/menu.service';
import { NavigationService } from './services/navigation/navigation.service';
import { DatePipe } from '@angular/common';
import { Platform } from '@ionic/angular';
import { ServicesswupdaterService } from './servicesswupdater.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public itens = [
    {
      nome: 'Página Inicial',
      icone: 'home-sharp',
      url: 'home',
      disabled: 'false',
      role: 'all',
    },
    {
      nome: 'Criar Números',
      icone: 'easel-sharp',
      url: 'sellers-home',
      disabled: 'false',
      role: 'admin',
    },
    // {
    //   nome: 'Explorar',
    //   icone: 'home-sharp',
    //   url: 'home',
    //   disabled: 'false',
    //   role: 'all',
    // },
    // {
    //   nome: 'Minhas Participações',
    //   icone: 'easel-sharp',
    //   url: 'my-participations',
    //   disabled: 'false',
    //   role: 'user',
    // },
    // {
    //   nome: 'Meu Histórico',
    //   icone: 'easel-sharp',
    //   url: 'my-participations',
    //   disabled: 'false',
    //   role: 'user',
    // },
    // {
    //   nome: 'Meu Perfil',
    //   icone: 'easel-sharp',
    //   url: 'my-participations',
    //   disabled: 'false',
    //   role: 'user',
    // },
    {
      nome: 'Solicitações',
      icone: 'calendar-sharp',
      url: 'solicitations',
      disabled: 'false',
      role: 'admin',
    },
    {
      nome: 'Criar Grupo',
      icone: 'calendar-sharp',
      url: 'create-group',
      disabled: 'false',
      role: 'admin',
      super: true,
    },
    {
      nome: 'Criar Campanhas',
      icone: 'calendar-sharp',
      url: 'create-campaing',
      disabled: 'false',
      role: 'admin',
      super: true,
    },
    // {
    //   nome: 'Minhas Campanhas',
    //   icone: 'easel-sharp',
    //   url: 'my-campaing',
    //   disabled: 'false',
    //   role: 'admin',
    // },
    // {
    //   nome: 'Meu Perfil',
    //   icone: 'megaphone-sharp',
    //   url: 'profile-home',
    //   disabled: 'false',
    //   role: 'admin',
    // },
  ];

  public version = environment.global.version;
  constructor(
    public userClass: UserClass,
    private navigation: NavigationService,
    private menu: MenuService,
    private auth: AuthService,
    private master: MasterService,
    private platform: Platform,
    private sw: ServicesswupdaterService
  ) {
    this.auth.getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.master.setUser(user.uid);
      }
    });
  }

  async ngOnInit() {
    await this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    this.sw.checkForUpdates();
  }

  goTo(url: string) {
    this.navigation.goTo(url);
    this.menu.closeMenu();
  }

  logout() {
    this.auth.logout();
    this.menu.closeMenu();
  }
}
