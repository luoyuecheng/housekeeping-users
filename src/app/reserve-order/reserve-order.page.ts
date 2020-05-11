import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { OrderService, Address, OrderStatus } from '../services/order.service';
import { orderInterface } from '../services/order.interface';

@Component({
  selector: 'app-reserve-order',
  templateUrl: './reserve-order.page.html',
  styleUrls: ['./reserve-order.page.scss'],
})
export class ReserveOrderPage implements OnInit {
  public id: string|number; // 商品 ID
  public price: string|number; // 商品价格
  public name: string;
  public values: { [key: string]: any };
  public addressDetail: Address;
  public productId: string|number;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private orderService: OrderService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      this.name = param.name;
      this.id = param.id;
      this.price = param.price;
      this.productId = param.productId;
      this.values = param.values ? JSON.parse(param.values) : {};

      if (this.values.addressId) {
        this.addressDetail = this.orderService.getAddress(this.values.addressId);
      }
    })
  }

  handleBack() {
    this.navCtrl.back();
  }

  // 付款
  handlePayment() {
    this.orderService.alertTip({
      header: '确认付款',
      message: '付款成功后请保持电话通畅，方便商家联系',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
        },
        {
          text: '确认',
          handler: () => {
            // 下单参数
            const param = {
              goodsId: this.id,
              goodsName: this.name,
              goodsSn: this.name,
              price: this.price,
              number: 1,
              productId: this.productId,
              shipSn: this.values.startTime,
              shipChannel: this.values.duration,
            };
            // 先加入购物车
            this.orderService.postRequest(orderInterface.addCard, param).subscribe((data: any) => {
              if (!data || data.errno) {
                return void 0;
              }
              // const { data: cardData = {} } = data;
              let addressId;
              if (this.values && this.values.addressId) {
                addressId = this.values.addressId;
              }
              const options = {
                addressId,
                shipSn: this.values.startTime,
                shipChannel: this.values.duration,
              }
              // 提交订单
              this.orderService.postRequest(orderInterface.submitOrder, options).subscribe((data: any) => {
                if (!data || data.errno) {
                  return void 0;
                }

                this.orderService.alertTip({
                  header: '支付成功',
                  buttons: [{
                    text: '确定',
                    handler: () => {
                      this.navCtrl.navigateRoot('/tabs/aboutMe/order', { queryParams: { name: OrderStatus.all, title: '全部订单' } });
                    }
                  }]
                });

              })
            })
          }
        }
      ]
    })
  }
}
