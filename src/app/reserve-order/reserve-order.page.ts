import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-reserve-order',
  templateUrl: './reserve-order.page.html',
  styleUrls: ['./reserve-order.page.scss'],
})
export class ReserveOrderPage implements OnInit {
  public name: string;
  public title: string;
  public values: { [key: string]: any };

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private orderService: OrderService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      this.title = param.title;
      this.name = param.name;
      this.values = param.values ? JSON.parse(param.values) : {};

    })
  }

  handleBack() {
    this.navCtrl.back();
  }

  // 付款
  handlePayment() {
    this.orderService.payment().subscribe(async (res: any) => {
      console.log(res);

      const alert = await this.alertCtrl.create({
        header: '支付完成',
        // subHeader: 'Subtitle',
        message: '点击确认查看订单',
        buttons: ['确认']
      });

      await alert.present();
      let result = await alert.onDidDismiss();
      console.log(result);

      this.navCtrl.navigateRoot('/tabs/aboutMe');
    });
  }
}
