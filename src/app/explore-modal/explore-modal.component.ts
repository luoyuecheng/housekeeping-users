import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';

import { OrderService } from '../services/order.service';
import { orderInterface } from '../services/order.interface';

@Component({
  selector: 'app-explore-modal',
  templateUrl: './explore-modal.component.html',
  styleUrls: ['./explore-modal.component.scss'],
})
export class ExploreModalComponent implements OnInit {
  private listType: string = 'list';
  private detailType: string = 'detail';

  public category;
  public orders;
  // list: 服务列表(所有服务), detail: 服务详情
  public modalType: string = this.listType;
  // 当前展示详情的订单
  public order;

  @ViewChild('content', { static: true }) detailContent: ElementRef<HTMLElement>;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      this.category = param;
      if (param.type) {
        this.modalType = param.type;
      }

      this.searchOrders();
    })
  }

  // 搜索订单
  searchOrders() {
    this.orderService.getRequest(orderInterface.getGoodsByParam, { categoryId: this.category.id }).
      subscribe((data: any) => {
        if (!data || data.errno) {
          return void 0;
        }
        const { data: orderData = {} } = data;
        const { list = [] } = orderData;
      this.orders = list;
    })
  }

  // 点击具体服务项目
  handleService(order) {
    console.log('order', order)
    this.order = order;
    this.modalType = this.detailType;

    this.getOrderDetail(order.id);
  }

  // 搜索订单详情
  getOrderDetail(id: number|string) {
    this.orderService.getRequest(orderInterface.getGoodsDetailApi, { id }).subscribe((data: any) => {
      if (!data || data.errno) {
        return void 0;
      }

      const { data: goodsData = {} } = data;
      const { info = {} } = goodsData;

      this.order = info;
      this.detailContent.nativeElement.innerHTML = info.detail;
      this.detailContent.nativeElement.style.display = 'block';
    })
  }

  // 下单
  onSubmit() {
    const queryParams: Params = {
      id: this.order.id,
      name: this.order.name,
      price: this.order.retailPrice,
      productId: this.order.productId,
    }
    this.navCtrl.navigateForward('/reservation-modal', { queryParams });

    // 先加入购物车
    // this.orderService.postRequest(orderInterface.addCard, { goodsId }).subscribe((data: any) => {
    //   if (!data || data.errno) {
    //     return void 0;
    //   }
    //   // 提交订单
    //   this.orderService.postRequest(orderInterface.submitOrder, { addressId: data.id }).subscribe((data: any) => {
    //     if (!data || data.errno) {
    //       return void 0;
    //     }
    //     this.navCtrl.navigateRoot('/tabs/aboutMe/order', { queryParams: { name: 'orders', title: '全部订单' } });
    //   })
    // })
  }

  handleBack() {
    if (this.modalType === this.detailType) {
      this.modalType = this.listType;
      this.searchOrders();
      return void 0;
    }
    this.navCtrl.back();
  }
}