import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { filter, map, mergeMap, takeUntil } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonComponent } from '../common-component/common-component.component';

@Component({
  selector: 'nt-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent
  extends CommonComponent
  implements OnDestroy, OnInit {

  areaName?: string;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    super();
    this.areaName = undefined;

    this._router.events
      .pipe(
        takeUntil(this.destroy),
        filter((event) => event instanceof NavigationEnd),
        map(() => this._activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((event) => {
        this.areaName = event['title'];
      });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    super.onDestroy()
  }
}
