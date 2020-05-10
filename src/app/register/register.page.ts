import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { LoginService } from '../services/login.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public phone: string;
  public password: string;
  public checkPassword: string;

  constructor(
    private navCtrl: NavController,
    private loginService: LoginService,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
  }

  handleBack() {
    this.navCtrl.back();
  }

  // 注册
  async handleLogin() {
    if (this.password !== this.checkPassword) {
      await this.orderService.alertTip({ subHeader: '密码输入不一致' });
      return void 0;
    }
    const verification = [
      { type: 'phone', value: this.phone, tip: '请输入正确的手机号' },
      { type: 'password', value: this.password, tip: '请输入正确的密码' },
    ];
    let result: boolean;

    for (let item of verification) {
      result = await this.orderService.verification(item);
      if (!result) {
        return void 0;
      }
    }

    this.loginService.register({
      mobile: this.phone,
      password: this.password,
      username: this.phone,
    }).subscribe(async (data: any) => {
      console.log(data)
      if (data && data.errno) {
        await this.orderService.alertTip({
          header: '注册失败',
          message: data.errmsg,
        })
        return void 0;
      }

      await this.orderService.alertTip({ subHeader: '注册成功，前往登录' });
      this.navCtrl.navigateRoot('/login');
    })
  }
}
