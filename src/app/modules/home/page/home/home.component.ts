import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/core/service/categories/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    // private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    // this.categoriesService.getCategories().subscribe(res => {
    //   console.log(res);
    // })
  }

}
