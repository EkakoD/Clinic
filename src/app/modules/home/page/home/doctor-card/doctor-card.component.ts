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

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  navigateToDetail(id) {
    console.log(id)
    this.router.navigate(['home/doctor/' + id])
  }

}
