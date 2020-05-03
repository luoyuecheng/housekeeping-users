import { Component } from '@angular/core';
import {
  Params
} from '@angular/router';
import {
  NavController,
} from '@ionic/angular';

@Component({
  selector: 'app-about-me',
  templateUrl: 'about-me.page.html',
  styleUrls: ['about-me.page.scss']
})
export class AboutMePage {
  public userInfo = {
    avatar: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
    name: '帐户 1',
  }

  constructor(
    private navCtrl: NavController,
  ) {}

  // 选择查看的类型
  handleItem(key: string) {
    const queryParams: Params = {
      name: key,
      title: '全部订单',
    }

    switch (key) {
      case 'orders':
        this.navCtrl.navigateForward('/tabs/aboutMe/order', { queryParams });
        break;
      default:
        this.navCtrl.navigateForward('/modal', { queryParams });
    }
  }
}