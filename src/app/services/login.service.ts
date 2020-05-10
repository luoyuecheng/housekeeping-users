import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { orderInterface } from './order.interface';

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
export class LoginService {
  public authInfo: AuthInfo;

  constructor(
    private http: HttpClient,
  ) {
    this.authInfo = this.getAuthInfo();
  }

  // 获取用户信息
  getAuthInfo(): AuthInfo {
    return JSON.parse(localStorage.getItem('auth'));
  }

  // 存储用户信息
  setAuthInfo(authInfo: AuthInfo) {
    this.authInfo = authInfo;
    localStorage.setItem('auth', JSON.stringify(authInfo));
  }

  // 退出登录，清除用户信息
  removeAntuInfo() {
    this.authInfo = undefined;
    localStorage.removeItem('auth');
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
}