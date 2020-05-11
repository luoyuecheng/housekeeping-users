import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { OrderService, Address } from '../services/order.service';
import { orderInterface } from '../services/order.interface';

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
    // 获取地址列表
    this.getAddressList();
  }

  // 获取地址列表
  getAddressList() {
    this.orderService.getRequest(orderInterface.getAddressList).subscribe((data: any) => {
      if (!data || data.errno) {
        return void 0;
      }

      const { data: addressData = {} } = data;
      const { list = [] } = addressData;

      this.addressList = list;
      this.orderService.setAddressList(list);
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

    const options = {
      ...this.addressDetail,
      province: '0',
      city: '0',
      county: '0',
      areaCode: '0',
      isDefault: false,
    };

    this.orderService.postRequest(orderInterface.saveAddress, options).subscribe(async (data: any) => {
      if (!data || data.errno) {
        return void 0;
      }
      await this.orderService.alertTip({
        header: '编辑成功'
      });

      this.handleBack();
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

  // 删除地址
  delete() {
    this.orderService.alertTip({
      header: '是否删除当前地址',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
        },
        {
          text: '确定',
          handler: () => {
            this.orderService.postRequest(orderInterface.deleteAddress,
              { id: this.addressDetail.id }).subscribe(async (data: any) => {
                if (!data || data.errno) {
                  return void 0;
                }

                await this.orderService.alertTip({ header: '删除成功' });
                this.handleBack();
              })
          }
        }
      ]
    })
  }

  handleBack() {
    if (this.title !== this.titleMap[1]) {
      this.title = this.titleMap[1];
      this.addressDetail = {
        name: '',
        tel: '',
        addressDetail: '',
      }
      this.getAddressList();
      return void 0;
    }

    this.navCtrl.back();
  }
}
