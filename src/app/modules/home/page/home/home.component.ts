import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { CategoriesService } from 'src/app/core/service/categories/categories.service';
import { UsersService } from 'src/app/core/service/users/users.service';
import { DoctorsModel } from 'src/app/shared/model/users/users.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  doctors: DoctorsModel[];
  catgeoryId: number;
  loadingFlag = false;
  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors() {
    this.loadingFlag = true; 
    this.usersService.getDoctors(this.catgeoryId).pipe(
      finalize(() => this.loadingFlag = false)
    ).subscribe(res => {
      this.doctors = res.data;
    });


  }
}
