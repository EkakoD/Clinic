import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { UsersService } from 'src/app/core/service/users/users.service';
import { UserDetailsModel } from 'src/app/shared/model/users/users.model';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.scss']
})
export class DoctorInfoComponent implements OnInit {
  doctor: UserDetailsModel;
  doctorId: number;
  loadingFlag = false;
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.doctorId = parseFloat(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.loadingFlag = true;
    console.log(this.doctorId);
    this.usersService.getUserDetails(this.doctorId).pipe(
      finalize(() => this.loadingFlag = false)
    ).subscribe(res => {
      this.doctor = res.data;
      console.log(this.doctor)
    });
  }
}