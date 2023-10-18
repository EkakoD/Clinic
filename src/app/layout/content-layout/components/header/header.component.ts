import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/core/component/dialog/dialog.component';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { UsersService } from 'src/app/core/service/users/users.service';
import { LoginModalComponent } from 'src/app/modules/auth/login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navigation = [
    {
      url: '/home',
      text: 'ექიმები',

    },
    {
      url: '/clinics',
      text: 'კლინიკები',

    },
    {
      url: '/',
      text: 'ანოტაციები',
    },
    {
      url: '/',
      text: 'აქციები',
    },
    {
      url: '/',
      text: 'სერვისები',
    },
    {
      url: '/',
      text: 'მედიკამენტები',
    },
    {
      url: '/',
      text: 'კონტაქტი',
    }

  ];
  userId: number;
  user: { firstname: string, lastname: string };
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.userId = parseFloat(localStorage.getItem("id"));
  }

  ngOnInit() {
    this.getUserDetails();
    this.authService.authEvent$.subscribe(res => {
      if (res) {
        this.getUserDetails();
        this.userId = parseFloat(localStorage.getItem("id"));
      }
      else {
        this.user = null;
      }
    })
  }

  openLoginModal() {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      panelClass: ['container'],
      maxWidth: '700px',
      maxHeight: '90vh',
      disableClose: false,
      autoFocus: false
    })

    // dialogRef.afterClosed().subscribe(() =>

    // )
  }

  myAppointments() {
    if (this.userId) {
      this.router.navigate(['/user/details/' + this.userId]);
    }
  }
  getUserDetails() {
    if (this.userId) {
      this.usersService.getUserDetails(this.userId).subscribe(
        res => {
          this.user = {
            firstname: res.data.firstname,
            lastname: res.data.lastname
          }
        }
      )
    }
  }

  logoutUser() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { msg: 'ნამდვილად გსურთ სისტემიდან გასვლა?' }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === 'true') {
        this.authService.logOut();
      }
    });
  }

}
