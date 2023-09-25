import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CategoriesModel } from 'src/app/shared/model/categories/catgeories.model';

@Injectable()

export class CategoriesService {
  env = environment;
  categoriesUrl = this.env.apiUrl + 'Categories';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<{ success: boolean, message: string, data: CategoriesModel[] }>(this.categoriesUrl + "/GetCategories");
  }
}
