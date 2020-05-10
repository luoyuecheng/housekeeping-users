import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FormatsService } from '../services/formats';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.page.html',
  styleUrls: ['./reservation-modal.page.scss'],
})
export class ReservationModalPage implements OnInit {
  public name: string;
  public title: string;
  public values = {
    addressId: 1,
    duration: "2",
    startTime: this.formatService.formatDate(new Date()),
  };

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private formatService: FormatsService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      this.title = param.title;
      this.name = param.name;
    })
  }

  handleBack() {
    this.navCtrl.back();
  }

  // 确认
  handleOk() {
    const queryParams: Params = {
      name: this.name,
      title: this.title,
      values: JSON.stringify(this.values),
    }
    this.navCtrl.navigateForward('reserve-order', { queryParams });
  }

  // 修改时间
  handleDateChange(event) {
    const date = event.detail.value;

    this.values.startTime = this.formatService.formatDate(new Date(date));
  }
}
