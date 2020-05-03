import { Component, OnInit, Input } from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  NavController,
} from '@ionic/angular';

@Component({
  selector: 'app-explore-modal',
  templateUrl: './explore-modal.component.html',
  styleUrls: ['./explore-modal.component.scss'],
})
export class ExploreModalComponent implements OnInit {
  @Input() name: string;
  title: string;

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