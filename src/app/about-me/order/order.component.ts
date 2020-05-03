import { Component, OnInit, Input } from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  NavController,
} from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() name: string;
  public title: string;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      console.log('queryParams', param)
      this.title = param.title;
      this.name = param.name;
    })
  }

  handleBack() {
    this.navCtrl.back();
  }
}
