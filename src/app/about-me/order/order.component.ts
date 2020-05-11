import { Component, OnInit, Input, wtfStartTimeRange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { OrderService, OrderStatus } from '../../services/order.service';
import { orderInterface } from '../../services/order.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() name: string;
  public title: string;

  // 订单列表
  orderList;
  orderStatus = OrderStatus;
  // 当前状态
  currentStatus: OrderStatus = this.orderStatus.all;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      // this.title = param.title;
      this.name = param.name;

      switch (param.name) {
        case this.orderStatus.all:
          this.title = '全部订单';
          break;
        case this.orderStatus.unpaid:
          this.title = '未接单';
          break;
        case this.orderStatus.unserved:
          this.title = '待服务';
          break;
        case this.orderStatus.serving:
          this.title = '服务中';
          break;
        case this.orderStatus.userCompleted:
          this.title = '已完成';
          break;
      }

      this.queryOrderList(param.name);
    })

    // this.orderService.getArticle(1);
  }

  queryOrderList(status: OrderStatus) {
    this.orderService.getRequest(orderInterface.queryOrder, { orderStatus: status }).subscribe((data: any) => {
      if (!data || data.errno) {
        return void 0;
      }

      const { data: orderData = {} } = data;
      const { list = [] } = orderData;
      this.orderList = list;
      console.log('this.orderList', this.orderList)
    })
  }

  // 更改订单状态
  handleOrderStatus(order, status: OrderStatus) {
    switch (status) {
      case this.orderStatus.unpaid:
        // 取消订单 -> 203
        break;
      case this.orderStatus.unserved:
        // 申请退款(退单)
        break;
    }

    // const options = {
    //   orderStatus: status,
    //   id: order.id,
    // }

    const url = `${orderInterface.updateOrderStatus}?orderStatus=${status}&id=${order.id}`;

    this.orderService.putRequest(url).subscribe((data: any) => {
      if (!data || data.errno) {
        return void 0;
      }

      this.queryOrderList(this.currentStatus);
    })
  }

  // 查看商品详情
  handleService(order) {
    if (!order || !order.goodsList || !order.goodsList[0]) {
      return void 0;
    }

    const goods = order.goodsList[0];
  }

  handleBack() {
    // this.navCtrl.back();
    this.navCtrl.navigateRoot('/tabs/aboutMe');
  }
}
