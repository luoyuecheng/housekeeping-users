import { Component } from '@angular/core';
import { Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { OrderService, OrderStatus } from '../services/order.service';
import { orderInterface } from '../services/order.interface';

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

  orderStatus = OrderStatus;

  constructor(
    private navCtrl: NavController,
    private orderService: OrderService,
    private loginService: LoginService,
  ) {}

  // 选择查看的类型
  handleItem(key: string|OrderStatus) {
    const queryParams: Params = {
      name: key,
      title: '全部订单',
    }

    switch (key) {
      case this.orderStatus.all:
        // 查看全部订单
      case this.orderStatus.unpaid:
      case this.orderStatus.unserved:
      case this.orderStatus.serving:
      case this.orderStatus.userCompleted:
        this.navCtrl.navigateForward('/tabs/aboutMe/order', { queryParams });
        break;

      case 'address':
        // 查看地址
        this.navCtrl.navigateForward('/address');
        break;
      default:
        this.orderService.alertTip({
          header: '报歉',
          message: '该功能暂未上架，程序员正在加班中...',
        })
    }
  }

  // 退出登录
  signOut() {
    this.orderService.postRequest(orderInterface.logoutApi, {}).subscribe((data: any) => {
      // 退出登录，清除用户信息
      this.loginService.removeAntuInfo();
      this.orderService.alertTip({
        header: '退出成功',
      });

      this.navCtrl.navigateRoot('/login');
    })
  }
}