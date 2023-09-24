import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
