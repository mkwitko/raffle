import { ScreenService } from 'src/app/services/screen/screen.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title = 'Jardim das Flores';
  @Input() url;
  @Input() menu = true;
  @Input() modal = false;
  @Input() login = false;

  constructor(private screen: ScreenService) {}

  ngOnInit() {}

  close() {
    this.screen.modalController.dismiss();
  }

  notification() {
    this.screen.presentToast(
      'Você não tem nenhuma notificação.',
      '',
      'warning'
    );
  }
}
