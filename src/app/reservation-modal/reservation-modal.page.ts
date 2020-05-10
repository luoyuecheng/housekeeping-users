import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { OrderService } from '../services/order.service';
import { orderInterface } from '../services/order.interface';
import { FormatsService } from '../services/formats';
import { Address } from '../address/address.page';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.page.html',
  styleUrls: ['./reservation-modal.page.scss'],
})
export class ReservationModalPage implements OnInit {
  public order; // 下单的服务内容
  public values = {
    addressId: 1,
    duration: "2",
    startTime: this.formatService.formatDate(new Date()),
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
      console.log(data);
      if (!data || data.errno) {
        return void 0;
      }

      const { data: addressData = {} } = data;
      const { list = [] } = addressData;

      this.addressList = list;
    })
  }

  handleBack() {
    this.navCtrl.back();
  }

  // 确认
  handleOk() {
    const queryParams: Params = {
      ...this.order,
      values: JSON.stringify(this.values),
    }
    this.navCtrl.navigateForward('reserve-order', { queryParams });
  }

  // 修改时间
  handleDateChange(event) {
    const date = event.detail.value;

    this.values.startTime = this.formatService.formatDate(new Date(date));
  }

  // 选择服务地址
}
