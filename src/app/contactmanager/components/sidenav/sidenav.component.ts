import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720 ;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private mediamatcher : MediaQueryList =matchMedia(`(max-width : ${SMALL_WIDTH_BREAKPOINT}px)`);
  users : Observable<User[]>;
  isDarkTheme : boolean = false;

  constructor(zone : NgZone, private userService: UserService, private router :Router) { 
    this.mediamatcher.addListener(mql => 
      zone.run(() => this.mediamatcher  ));  
  }
  @ViewChild (MatSidenav) sidenav : MatSidenav;

  toggleTheme(){
    this.isDarkTheme = !this.isDarkTheme ;

  }

  ngOnInit() {
    this.users = this.userService.users;
    this.userService.loadAll();

    
    this.router.events.subscribe(() => {
      if (this.isScreenSmall())
      this.sidenav.close();
    }
    )

  }
  isScreenSmall() : boolean{
    return this.mediamatcher.matches;
  }

}
