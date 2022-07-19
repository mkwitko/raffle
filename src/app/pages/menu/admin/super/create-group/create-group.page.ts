import { GroupClass } from './../../../../../classes/group/group';
import { Group } from './../../../../../interfaces/groups/group';
import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud/crud.service';
import { AllowToPassService } from 'src/app/services/guardian/alow-to-pass.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { TranslateService } from 'src/app/services/translate/translate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage {
  public group: Group = {
    name: '',
  };
  private picture;

  constructor(
    public groupClass: GroupClass,
    private navigation: NavigationService,
    private screen: ScreenService,
    private crud: CrudService,
    private guardian: AllowToPassService,
    private translate: TranslateService
  ) {}

  async submit() {
    if (this.guardian.guardian([this.group.name])) {
      await this.screen.presentLoading();
      this.group.createdAt = new Date().getTime();
      this.crud
        .add(this.groupClass.getCollection(), this.group)
        .then((res) => {
          if (this.picture) {
            this.crud
              .upload(res.id, this.picture, environment.global.path.groups)
              .then((picture) => {
                this.group.picture = picture;
                this.crud
                  .update(this.groupClass.getCollection(), this.group, res.id)
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
      this.screen.presentToast('O campo de Nome do Grupo é obrigatório.');
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
