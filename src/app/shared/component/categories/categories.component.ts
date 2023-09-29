import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/core/service/categories/categories.service';
import { CategoriesModel } from '../../model/categories/catgeories.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: CategoriesModel[];
  selectedCategory: CategoriesModel;
  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.getCategories();

  }

  getCategories() {
    this.categoriesService.getCategories().subscribe(res => {
      this.categories = res.data;
    })
  }
  selectCategory(category: CategoriesModel) {
    this.selectedCategory = category;
  }
}
