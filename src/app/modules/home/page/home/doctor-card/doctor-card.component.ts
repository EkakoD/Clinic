import { Component, Input, OnInit } from '@angular/core';
import { DoctorsModel } from 'src/app/shared/model/users/users.model';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.scss']
})
export class DoctorCardComponent implements OnInit {
  @Input() doctor: DoctorsModel;
  
  constructor() { }

  ngOnInit() {
  }

}
