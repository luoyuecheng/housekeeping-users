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
      { key: 'cleaning', name: '日常保洁', iconUrl: 'https://images.daojia.com/dop/custom/f3e9130d1750ebab91caa9b86dbbd84e.png', background: '#ff5e5e' },
      { key: 'wash', name: '清洗养护', iconUrl: 'https://images.daojia.com/dop/custom/8499ebb5c347e2940a4ad2922d3c8ed8.png', background: '#d600f4' },
      { key: 'babysitter', name: '保姆', iconUrl: 'https://images.daojia.com/dop/custom/d5aa07f3de1c52ff2eb8ad51e1c1c154.png', background: '#f14503' },
      { key: 'maternityMatron', name: '月嫂', iconUrl: 'https://images.daojia.com/dop/custom/d5aa07f3de1c52ff2eb8ad51e1c1c154.png', background: '#e01428' },
      { key: 'parenting', name: '育儿嫂', iconUrl: 'https://images.daojia.com/Category/Back/Pic/1d151f1eb2b85b32de1b511cd65e9f46.png', background: '#ed5807' },
      { key: 'exterminator', name: '除虫灭鼠', iconUrl: 'https://images.daojia.com/dop/custom/9546de0c00f6e3d3d929c67752c05765.jpg', background: '#e01428' },
      { key: 'formaldehyde', name: '除甲醛', iconUrl: 'https://images.daojia.com/dop/custom/9546de0c00f6e3d3d929c67752c05765.jpg', background: '#4a4aff' },
      { key: 'laundry', name: '洗衣洗鞋', iconUrl: 'https://images.daojia.com/dop/custom/9546de0c00f6e3d3d929c67752c05765.jpg', background: '#d500d5' },
      { key: 'homeTextile', name: '洗窗帘', iconUrl: 'https://images.daojia.com/dop/custom/d8bee5c0c7c859fe16ec4048bafe4472.png', background: '#f14503' },
      { key: 'massage', name: '中医按摩', iconUrl: 'https://images.daojia.com/dop/custom/d8bee5c0c7c859fe16ec4048bafe4472.png', background: '#e01428' }
    ],
    // slide
    [
      // item row
      { key: 'houses', name: '房屋维修', iconUrl: 'https://images.daojia.com/dop/custom/01a443c96c08e02cd32ddd9958f82292.png', background: '#e01428' },
      { key: 'homeAppliances', name: '家电维修', iconUrl: 'https://images.daojia.com/dop/custom/d8bee5c0c7c859fe16ec4048bafe4472.png', background: '#ff8000' },
      { key: 'installation', name: '上门安装', iconUrl: 'https://images.daojia.com/dop/custom/b74c0dfc11bfb223a280f2b75751cb92.jpg', background: '#5b5be3' },
      { key: 'move', name: '搬家', iconUrl: 'https://images.daojia.com/dop/custom/9b04c448bf5a2e53407227abb39b27dc.png', background: '#b87272' },
      { key: 'pullGoods', name: '拉货', iconUrl: 'https://images.daojia.com/dop/custom/c16a42b496dad271fc602eae789ce1bf.png', background: '#ff5e5e' },
      { key: 'medicalCare', name: '医护上门', iconUrl: 'https://images.daojia.com/dop/custom/aea096d1e67cf4060b1a503e2cfa71f6.png', background: '#e41b1b' },
      { key: 'sendFlowers', name: '送花上门', iconUrl: 'https://images.daojia.com/dop/custom/493b81c960bd4f7f0c5f49c7de674ed9.png', background: '#faf305' },
      { key: 'recycle', name: '上门回收', iconUrl: 'https://images.daojia.com/dop/custom/07e56f5f36df61ed96744d53a5494797.jpg', background: '#ff8000' },
      { key: 'convenience', name: '便民服务', iconUrl: 'https://images.daojia.com/dop/custom/07e56f5f36df61ed96744d53a5494797.jpg', background: '#d500d5' },
      { key: 'services', name: '全部服务', iconUrl: 'https://images.daojia.com/dop/custom/4eda295483757df15902a1021e836cff.png', background: '#b87272' }
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
      key: service.key,
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
