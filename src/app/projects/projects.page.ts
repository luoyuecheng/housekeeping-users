import { Component } from '@angular/core';
import { Params } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.page.html',
  styleUrls: ['projects.page.scss']
})
export class ProjectsPage {
  public projects = [
    {
      key: 'popular',
      title: '热门服务',
      banner: '图片',
      children: [
        {
          title: '精品鲜花',
          children: [
            { key: 'rose', title: '精品玫瑰', icon: '图片' },
            { key: 'lily', title: '精品百合', icon: '图片' },
            { key: 'carnation', title: '精品康乃馨', icon: '图片' },
            { key: 'roseFlower', title: '玫瑰花', icon: '图片' },
          ],
        }
      ],
    },
    {
      key: 'cleaning',
      title: '保洁清洗',
      banner: '日常保洁',
      children: [
        {
          title: '日常保洁',
          children: [
            { key: 'dailyCleaning', title: '日常保洁', icon: '图片' },
            { key: 'cycleCleaning', title: '周期保洁', icon: '图片' },
            {  key: 'houseCleaning', title: '全屋大扫除', icon: '图片' },
          ],
        }
      ],
    },
  ];

  public activeProject = this.projects[0];

  constructor(
    private navCtrl: NavController,
  ) {}

  // 选择左侧服务菜单
  handleSwitchProject(project) {
    // 切换选中项目
    this.activeProject = project;
  }

  // 点击具体服务项目
  handleService(service) {
    console.log('service', service)
    const queryParams: Params = {
      name: service.key,
      title: service.title,
    }

    switch (service.key) {
      case 'services':
        // 点击 全部服务 时，跳转页面至 全部服务列表
        this.navCtrl.navigateForward('/tabs/service');
        break;
      default:
        this.navCtrl.navigateForward('/modal', { queryParams });
    }
  }
}
