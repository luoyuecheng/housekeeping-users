import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.page.html',
  styleUrls: ['./message-modal.page.scss'],
})
export class MessageModalPage implements OnInit {
  public key: string;
  public name: string;
  public messageList = [
    {
      name: '保姆推荐',
      desc: '亲，今日已有204个用户通过发布需求找到了满意的保姆，快来发布需求，春节保姆资源紧张，早点找到好省心力...',
    }
  ]

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      console.log('queryParams', param)
      this.key = param.key;
      this.name = param.name;
    })
  }

  handleBack() {
    this.navCtrl.back();
  }
}
