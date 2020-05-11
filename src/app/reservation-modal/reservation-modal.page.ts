import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { OrderService, Address } from '../services/order.service';
import { orderInterface } from '../services/order.interface';
import { FormatsService } from '../services/formats';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.page.html',
  styleUrls: ['./reservation-modal.page.scss'],
})
export class ReservationModalPage implements OnInit {
  public order; // 下单的服务内容
  public values = {
    addressId: undefined,
    duration: "2",
    startTime: this.clearDate(new Date()),
  };
  public addressList: Address[];

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private formatService: FormatsService,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      this.order = param;
    })

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

  handleBack() {
    this.navCtrl.back();
  }

  // 确认
  handleOk() {
    if (!this.values.addressId) {
      this.orderService.alertTip({ header: '请选择服务地址' });
      return void 0;
    }

    const queryParams: Params = {
      ...this.order,
      values: JSON.stringify(this.values),
    }
    this.navCtrl.navigateForward('reserve-order', { queryParams });
  }

  // clear seconds minutes
  clearDate(date: Date) {
    date.setMinutes(0);
    date.setSeconds(0);

    return this.formatService.formatDate(date);
  }

  // 修改时间
  handleDateChange(event) {
    const dateString = event.detail.value;
    const date = new Date(dateString);

    this.values.startTime = this.clearDate(date);
  }

  selectValue(event, type: string) {
    const value = event.detail.value;
    switch (type) {
      case 'duration':
        this.values.duration = value;
        break;
      case 'addressId':
        this.values.addressId = value;
    }
  }
}
