import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {

  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  public appNav: AppNavItem[] = [
    {
      name: 'Favorites',
      link: '/favorites',
      icon: 'star'
    },
    {
      name: 'Coins',
      link: '/coins',
      icon: 'album'
    },
    {
      name: 'Exchanges',
      link: '/exchanges',
      icon: 'compare_arrows'
    },
    {
      name: 'News',
      link: '/news',
      icon: 'view_list'
    }
  ];



  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 991px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}

export interface AppNavItem {
  name: string;
  link: string;
  icon: string;
}


