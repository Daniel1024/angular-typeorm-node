import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  isAdmin = false;
  isLogged = false;

  @Output()
  toggleSidenav = new EventEmitter<void>();

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.subs[0] = this.auth.isLogged.subscribe((res) => this.isLogged = res);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onLogout(): void {
    this.auth.logout();
  }

}
