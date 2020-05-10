import { Component } from '@angular/core';
import { Params } from '@angular/router';
import {
  NavController,
} from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

export interface SearchConfig {
  placeholder: string;
  [key: string]: string | number;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  outline: boolean = false;
  address: string = '北京';
  position: string;
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
      { key: 'cleaning', title: '日常保洁', icon: '保洁', background: '#ff5e5e' },
      { key: 'wash', title: '清洗养护', icon: '清洗', background: '#d600f4' },
      { key: 'babysitter', title: '保姆', icon: '保姆', background: '#f14503' },
      { key: 'maternityMatron', title: '月嫂', icon: '月嫂', background: '#e01428' },
      { key: 'parenting', title: '育儿嫂', icon: '育儿', background: '#ed5807' },
      { key: 'exterminator', title: '除虫灭鼠', icon: '除虫', background: '#e01428' },
      { key: 'formaldehyde', title: '除甲醛', icon: '甲醛', background: '#4a4aff' },
      { key: 'laundry', title: '洗衣洗鞋', icon: '洗衣', background: '#d500d5' },
      { key: 'homeTextile', title: '洗窗帘', icon: '家纺', background: '#f14503' },
      { key: 'massage', title: '中医按摩', icon: '按摩', background: '#e01428' }
    ],
    // slide
    [
      // item row
      { key: 'houses', title: '房屋维修', icon: '房屋', background: '#e01428' },
      { key: 'homeAppliances', title: '家电维修', icon: '家电', background: '#ff8000' },
      { key: 'installation', title: '上门安装', icon: '安装', background: '#5b5be3' },
      { key: 'move', title: '搬家', icon: '搬家', background: '#b87272' },
      { key: 'pullGoods', title: '拉货', icon: '拉货', background: '#ff5e5e' },
      { key: 'medicalCare', title: '医护上门', icon: '医护', background: '#e41b1b' },
      { key: 'sendFlowers', title: '送花上门', icon: '送花', background: '#faf305' },
      { key: 'recycle', title: '上门回收', icon: '回收', background: '#ff8000' },
      { key: 'convenience', title: '便民服务', icon: '便民', background: '#d500d5' },
      { key: 'services', title: '全部服务', icon: '全部', background: '#b87272' }
    ],
  ];

  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,
  ) {}

  handleGeolocation() {
    console.log('1233')
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.position = `(${resp.coords.latitude}, ${resp.coords.longitude})`;
      console.log('position', this.position);
    }).catch((error) => {
      console.log('Error getting location', error);
      // this.androidPermissions.requestPermissions([
      //   this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
      //   this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
      //   this.androidPermissions.PERMISSION.ACCESS_LOCATION_EXTRA_COMMANDS]).then(r => {
      //     // 申请权限成功
      //     this.geolocation.getCurrentPosition().then((resp) => {
      //       this.position = `(${resp.coords.latitude}, ${resp.coords.longitude})`;
      //     });
      //   }).catch(err => {
      //     //申请权限失败："
      //   });
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      console.log('data', data)
    });
  }

  // 点击具体服务项目
  handleService(service) {
    console.log('service', service)
    const queryParams: Params = {
      name: service.key,
      title: service.title,
    }

    switch (service.key) {
      case 'services':
        // 点击 全部服务 时，跳转页面至 全部服务列表
        this.navCtrl.navigateForward('/tabs/service');
        break;
      default:
        this.navCtrl.navigateForward('/tabs/modal', { queryParams });
    }
  }
}
