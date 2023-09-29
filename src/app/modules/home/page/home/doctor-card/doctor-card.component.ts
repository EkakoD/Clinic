import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) {
    this.userRole = localStorage.getItem('role');
  }

  ngOnInit() {
  }
  navigateToDetail(id) {
    this.router.navigate(['home/doctor/' + id])
  }

}
