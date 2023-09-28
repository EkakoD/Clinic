import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  user: { firstname: string, lastname: string };
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.getUserDetails();
    this.authService.authEvent$.subscribe(res => {
      if (res) {
        this.getUserDetails();
      }
      else {
        this.user = null;
        console.log(this.user)
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
  getUserDetails() {
    var id = parseFloat(localStorage.getItem("id"));
    if (id) {

      this.usersService.getUserDetails(id).subscribe(
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
