import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { DoctorsModel } from 'src/app/shared/model/users/users.model';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.scss']
})
export class DoctorCardComponent implements OnInit {
  @Input() doctor: DoctorsModel;
  userRole: string;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.userRole = localStorage.getItem('role');
  }

  ngOnInit() {
    this.authService.authEvent$.subscribe(res => {
      console.log(2)
      if (res) {
        this.userRole = localStorage.getItem('role');
        console.log(this.userRole)
      } else {
        this.userRole = null;

      }
    })
  }
  navigateToDetail(id) {
    this.router.navigate(['home/doctor/' + id])
  }

}
