import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { UsersService } from 'src/app/core/service/users/users.service';
import { UserDetailsModel } from 'src/app/shared/model/users/users.model';

@Component({
  selector: 'app-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss']
})
export class MainInfoComponent implements OnInit {
  user: UserDetailsModel;
  userId: number;
  loadingFlag = false;
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.userId = parseFloat(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.loadingFlag = true;
    this.usersService.getUserDetails(this.userId).pipe(
      finalize(() => this.loadingFlag = false)
    ).subscribe(res => {
      this.user = res.data;
    });
  }
}
