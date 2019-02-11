import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
// import { Router, NavigationEnd } from '@angular/router';

// declare var gtag: Function;
// import { distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatrbaazan-front';
  // constructor(private router: Router) { }
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
