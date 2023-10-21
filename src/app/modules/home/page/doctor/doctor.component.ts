import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth/auth.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  userRole: string;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.authEvent$.subscribe(res => {
      if (res) {
        this.userRole = localStorage.getItem('role');
        if (this.userRole == 'Doctor') {
          this.router.navigate(['home']);
        }
      }

    });
  }
}
