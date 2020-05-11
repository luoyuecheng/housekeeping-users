import { Component } from '@angular/core';
import { Params } from '@angular/router';
import { NavController } from '@ionic/angular';

import { OrderService } from '../services/order.service';
import { orderInterface } from '../services/order.interface';

export interface Category {
  id: string | number;
  name: string;
  [key: string]: any;
}

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.page.html',
  styleUrls: ['projects.page.scss']
})
export class ProjectsPage {
  // 一级类目
  firstCategoryList: Array<Category> = [];
  // 二级类目
  secondCategoryList: Array<Category> = [];
  // 选择的一级类型
  activeCategory: Category;

  constructor(
    private navCtrl: NavController,
    private orderService: OrderService,
  ) {
    // 查询一级类目
    this.orderService.getRequest(orderInterface.getfirstcategory).subscribe((data: any) => {
      if (!data && data.errno) {
        return void 0;
      }

      const { data: firstCategory = [] } = data;

      if (firstCategory.length) {
        this.activeCategory = firstCategory[0];
        this.loadCategory(this.activeCategory);
      }

      this.firstCategoryList = firstCategory;
    })
  }

  // 加载二级类目
  loadCategory(firstCategory: Category) {
    if (!firstCategory) {
      return void 0;
    }

    this.activeCategory = firstCategory;

    this.orderService.getRequest(orderInterface.getsecondcategory, { id: firstCategory.id }).
      subscribe((data: any) => {
        if (!data || data.errno) {
          return void 0;
        }

        this.secondCategoryList = data.data || [];
      })
  }

  // 选择左侧服务菜单
  handleSwitchProject(category: Category) {
    // 切换选中项目
    this.activeCategory = category;
  }

  // 点击二级类型，查看订单
  handleCategory(category: Category) {
    const queryParams: Params = {
      // ...category
      id: category.id,
      name: category.name,
      keywords: category.keywords,
      pid: category.pid,
    }
    this.navCtrl.navigateForward('/modal', { queryParams });
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
