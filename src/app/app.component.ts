import {SwUpdate} from '@angular/service-worker';
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
// import { Router, NavigationEnd } from '@angular/router';

// declare var gtag: Function;
// import { distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chatrbaazan-front';

  //
  public ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((evt) => {
        console.log('service worker updated');
      });

      this.swUpdate.checkForUpdate().then(() => {
        // noop
      }).catch((err) => {
        console.error('error when checking for update', err);
      });
    }
  }

  constructor(private swUpdate: SwUpdate, private router: Router) {
  }

  onActivate(event) {
    window.scroll(0, 0);
    console.log("scroll to top");
    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
  }

  //site : https://stackoverflow.com/questions/37655898/tracking-google-analytics-page-views-in-angular2
  // ngOnInit() {
  //   this.router.events.pipe(distinctUntilChanged((previous: any, current: any) => {
  //      // Subscribe to any `NavigationEnd` events where the url has changed
  //      if(current instanceof NavigationEnd) {
  //       return previous.url === current.url;
  //   }
  //   return true;
  //   }).subscribe((x: any) => {
  //     gtag('config', 'UA-132350923-1', {'page_path': x.url});
  // }));

  // this.router.events.distinctUntilChanged((previous: any, current: any) => {
  //     // Subscribe to any `NavigationEnd` events where the url has changed
  //     if(current instanceof NavigationEnd) {
  //         return previous.url === current.url;
  //     }
  //     return true;
  // }).subscribe((x: any) => {
  //     gtag('config', '<%= GOOGLE_ANALYTICS_ID %>', {'page_path': x.url});
  // });
  // }
}
