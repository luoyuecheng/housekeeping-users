import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { OrderService } from '../services/order.service';
import { orderInterface } from '../services/order.interface';

export interface Address {
  name: string; // 联系人
  addressDetail: string; // 地址详情
  tel: string; // 手机号
  [key: string]: any;
}

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  addressList: Address[] = [{name: '哇', tel: '18898749834', addressDetail: 'dafa'}];
  // 标题
  titleMap = {
    1: {
      name: '我的地址',
      key: 1,
    },
    2: {
      name: '新增地址',
      key: 2,
    },
    3: {
      name: '编辑地址',
      key: 3,
    }
  }
  title = this.titleMap[1];
  // 地址详情
  addressDetail: Address = {
    name: '',
    tel: '',
    addressDetail: '',
  };

  constructor(
    private orderService: OrderService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  getAddressList() {
    this.orderService.getRequest(orderInterface.getAddressList).subscribe((data: any) => {
      if (!data || data.errno) {
        return void 0;
      }

      const { data: addressData = {} } = data;
      const { list = [] } = addressData;

      this.addressList = list;
    })
  }

  // 保存地址
  async saveAddress() {
    const verification = [
      { type: 'name', value: this.addressDetail.name, tip: '请输入正确的联系人' },
      { type: 'phone', value: this.addressDetail.tel, tip: '请输入正确的手机号' },
      { type: 'required', value: this.addressDetail.addressDetail, tip: '请输入服务地址' },
    ];

    let result: boolean;

    for (let item of verification) {
      result = await this.orderService.verification(item);
      if (!result) {
        return void 0;
      }
    }

    this.orderService.postRequest(orderInterface.saveAddress, this.addressDetail).subscribe((data: any) => {
      if (!data || data.errno) {
        return void 0;
      }
      console.log('address', data)
    })
  }

  // 编辑或新增地址
  modify(address: Address) {
    if (!address) {
      // 新增地址
      this.title = this.titleMap[2];
      return void 0;
    }

    // 编辑地址
    this.addressDetail = address;
    this.title = this.titleMap[3];
  }

  handleBack() {
    if (this.title !== this.titleMap[1]) {
      this.title = this.titleMap[1];
      this.addressDetail = {
        name: '',
        tel: '',
        addressDetail: '',
      }
      return void 0;
    }

    this.navCtrl.back();
  }
}
