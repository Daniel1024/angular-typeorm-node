import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  isLogged = false;

  @Output()
  toggleSidenav = new EventEmitter<void>();

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.isLogged.subscribe((res) => this.isLogged = res);
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onLogout(): void {
    this.auth.logout();
  }

}
