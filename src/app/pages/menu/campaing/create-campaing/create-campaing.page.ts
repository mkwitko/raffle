import { TranslateService } from './../../../../services/translate/translate.service';
import { environment } from './../../../../../environments/environment';
import { Campaing } from './../../../../interfaces/campaing/campaing';
import { AllowToPassService } from './../../../../services/guardian/alow-to-pass.service';
import { CrudService } from './../../../../services/crud/crud.service';
import { ScreenService } from './../../../../services/screen/screen.service';
import { CampaingClass } from './../../../../classes/campaing/campaing';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-campaing',
  templateUrl: './create-campaing.page.html',
  styleUrls: ['./create-campaing.page.scss'],
})
export class CreateCampaingPage {
  public campaing: Campaing = {
    title: '',
    subtitle: '',
    description: '',
    picture: '',
    prize: '',
    tickets: 0,
    value: 0,
    startAt: 0,
    endedAt: 0,
  };
  private picture;

  constructor(
    public campaingClass: CampaingClass,
    private navigation: NavigationService,
    private screen: ScreenService,
    private crud: CrudService,
    private guardian: AllowToPassService,
    private translate: TranslateService
  ) {}

  async submit() {
    if (
      this.guardian.guardian([
        this.campaing.title,
        this.campaing.tickets,
        this.campaing.prize,
        this.campaing.value,
        this.campaing.description,
      ])
    ) {
      await this.screen.presentLoading();
      this.campaing.createdAt = new Date().getTime();
      this.campaing.groupId = ' ZGn06nBznLMoMeV3Eh1u';
      this.campaing.active = true;
      this.campaing.free = this.campaing.tickets;
      this.campaing.sold = 0;
      this.campaing.reserved = 0;
      this.campaing.ticketsShare = 0;
      this.crud
        .add(this.campaingClass.getCollection(), this.campaing)
        .then((res) => {
          if (this.picture) {
            this.crud
              .upload(res.id, this.picture, environment.global.path.campaings)
              .then((picture) => {
                this.campaing.picture = picture;
                this.crud
                  .update(
                    this.campaingClass.getCollection(),
                    this.campaing,
                    res.id
                  )
                  .then(() => {
                    this.sucess();
                  })
                  .catch((err) => {
                    this.error(err);
                  });
              })
              .catch((err) => {
                this.error(err);
              });
          } else {
            this.sucess();
          }
        })
        .catch((err) => {
          this.screen.presentToast(this.translate.verifyErrors(err.code));
        });
    } else {
      this.screen.presentToast(
        'Os campos de Titulo, Descrição, Premiação, Quantidade de Tickets e Valor a ser Arrecadado são obrigatórios.'
      );
    }
  }

  sucess() {
    this.screen.presentToast('Informações Salvas com Sucesso!', '', 'sucess');
    this.screen.dismissloading();
    this.back();
  }

  error(err) {
    this.screen.presentToast(this.translate.verifyErrors(err.code));
    this.screen.dismissloading();
  }

  back() {
    this.navigation.goTo('home');
  }

  choose(event) {
    this.picture = event.target.files;
  }
}
