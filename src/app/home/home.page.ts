import { Component } from '@angular/core';
import { Params } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { SearchConfig } from './home.d';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  outline: boolean = false;
  address: string = '北京';
  searchConfig: SearchConfig = {
    placeholder: '搜索',
  }

  // slide setting
  slideOpts = {
    initialSlide: 0,
    speed: 0
  };

  popularServices = [
    // slides
    [
      // item
      { key: 1008002, name: '日常保洁', iconUrl: 'http://yanxuan.nosdn.127.net/8bbcd7de60a678846664af998f57e71c.png' },
      { key: '1008009', name: '家居清洁', iconUrl: 'http://yanxuan.nosdn.127.net/243e5bf327a87217ad1f54592f0176ec.png' },
      { key: '1005009', name: '保姆', iconUrl: 'http://yanxuan.nosdn.127.net/e8b67fe8b8db2ecc2e126a0aa631def0.png' },
      { key: '1005008', name: '月嫂', iconUrl: 'http://yanxuan.nosdn.127.net/f109afbb7e7a00c243c1da29991a5aa3.png' },
      { key: '1005007', name: '育儿嫂', iconUrl: 'http://yanxuan.nosdn.127.net/4aab4598017b5749e3b63309d25e9f6b.png' },
      { key: '1008008', name: '家电清洗', iconUrl: 'http://yanxuan.nosdn.127.net/927bc33f7ae2895dd6c11cf91f5e3228.png' },
      { key: '1008009', name: '家居清洁', iconUrl: 'http://yanxuan.nosdn.127.net/243e5bf327a87217ad1f54592f0176ec.png' },
      { key: '1008016', name: '家居保养', iconUrl: 'http://yanxuan.nosdn.127.net/c48e0d9dcfac01499a437774a915842b.png' },
      { key: '1005013', name: '电路维修', iconUrl: 'http://yanxuan.nosdn.127.net/2919b0d6eec79182cca31dc827f4d00a.png' },
      { key: '1008014', name: '厨卫洁具', iconUrl: 'http://yanxuan.nosdn.127.net/db48a1db4daab74233656caaea4a06f3.png' }
    ],
    // slide
    [
      // item row
      { key: '1005010', name: '房屋维修', iconUrl: 'http://yanxuan.nosdn.127.net/c48e0d9dcfac01499a437774a915842b.png' },
      { key: '1005010', name: '管道疏通', iconUrl: 'http://yanxuan.nosdn.127.net/6c43063003207168c1d8e83a923e8515.png' },
      { key: '1005011', name: '开锁换锁', iconUrl: 'http://yanxuan.nosdn.127.net/663f568475c994358bf31bcb67d122fe.png' },
      { key: '1005012', name: '水路维修', iconUrl: 'http://yanxuan.nosdn.127.net/e050980992725b7932bb3645fe5aec08.png' },
      { key: '1027001', name: '防水治漏', iconUrl: 'http://yanxuan.nosdn.127.net/60f4ae2beef4754347fa36208f84efab.png' },
      { key: '1008004', name: '电脑维修', iconUrl: 'http://yanxuan.nosdn.127.net/f123c74f54d9acff0bd1546c60034814.png' },
      { key: '1010001', name: '手机维修', iconUrl: 'http://yanxuan.nosdn.127.net/20279e1753e4eedc6e347857acda9681.png' },
      { key: '1010002', name: '办公维修', iconUrl: 'http://yanxuan.nosdn.127.net/364269344ed69adafe1b70ab7998fc50.png' },
      { key: '1010004', name: '拆除回收', iconUrl: 'http://yanxuan.nosdn.127.net/5197c44b610d786796f955334b55c7a5.png' },
      { key: 'services', name: '全部服务', iconUrl: 'http://yanxuan.nosdn.127.net/3a8c7ae5b9dc5c1c4b7f2b656abb0279.png' }
    ],
  ];

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
  ) { }

  handleOutline(outline: boolean) {
    this.outline = outline;
  }

  // 点击具体服务项目
  handleService(service) {
    console.log('service', service)
    const queryParams: Params = {
      id: service.key,
      name: service.name,
    }

    switch (service.key) {
      case 'services':
        // 点击 全部服务 时，跳转页面至 全部服务列表
        this.navCtrl.navigateForward('/tabs/service');
        break;
      default:
        this.navCtrl.navigateForward('/modal', { queryParams });
    }
  }

  async location() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.address = '广州';
  }
}
