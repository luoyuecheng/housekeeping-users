import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { LoginService } from './login.service';
import { orderInterface } from './order.interface';

import { Observable, of, from } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

export interface AuthInfo {
  gender?: number;
  nickName: string;
  mobile: string;
  avatar: string;
  token: string;
  authentication: boolean; // 是否认证, 默认为 false
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public authInfo: AuthInfo;

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private loginService: LoginService,
  ) {
    this.authInfo = this.loginService.authInfo;
  }

  async alertTip(option: { header?: string, message?: string, subHeader?: string, [key: string]: any }) {
    let param = {
      buttons: ['确认'],
      ...option,
    }
    let alert: HTMLIonAlertElement = await this.alertCtrl.create(param);
    return await alert.present();
  }

  async verification(option: { type?: string, value: string, tip: string, reg?: RegExp }) {
    let reg: RegExp;
    let alert: HTMLIonAlertElement;

    switch (option.type) {
      case 'name':
        // 验证姓名
        reg = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/;
        break;
      case 'idCard':
      case 'identity':
        // 验证身份证号
        reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
        break;
      case 'phone':
        reg = /^1[3456789]\d{9}$/;
        break;
      case 'password':
        reg = /^[a-zA-Z\d]{8,16}$/;
        break;
      case 'required':
        option.value = option.value.toString().trim();
        reg = /^.+?$/;
        break;
      default:
        reg = option.reg;
    }

    if (!reg.test(option.value)) {
      alert = await this.alertCtrl.create({
        header: '验证失败',
        message: option.tip || `请检查输入的${option.type}`,
        buttons: ['确认']
      });

      await alert.present();
      return false;
    }
    return true;
  }

  // 支付订单
  payment() {
    return this.http.post('', {});
  }

  // 登录
  login(data) {
    return this.http.post(orderInterface.loginApi, { ...data }).pipe(
      tap(_ => console.log(`登录, 请求接口: ${orderInterface.loginApi}`))
    )
  }

  // 注册
  register(data) {
    return this.http.post(orderInterface.register, { ...data }).pipe(
      tap(_ => console.log(`注册, 请求接口: ${orderInterface.register}`))
    )
  }

  // 普通 GET 接口
  getRequest(url: string, data?: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authInfo.token,
      }),
      params: {
        ...data,
      }
    }
    return this.http.get(url, httpOptions);
  }

  // 普通的 POST 接口
  postRequest(url: string, data?: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authInfo.token,
      }),
    }

    return this.http.post(url, { ...data }, httpOptions);
  }
}