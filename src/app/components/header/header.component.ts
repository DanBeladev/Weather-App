import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  changeTheme(): void {
    document.body.classList.toggle('light');
    document.body.classList.toggle('dark');
  }

  getAsset(): string {
    return document.body.classList.contains('dark') ? 'assets/cloud.gif' : 'https://media.giphy.com/media/UoLt9zf1WCLkhrqOyM/giphy.gif';
  }

}
