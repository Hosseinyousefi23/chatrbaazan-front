import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {PageService} from "../../page.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit, OnDestroy {
  about;
  mode = new FormControl('over');

  constructor(private data: PageService, private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle("درباره چتربازان");
    this.data.getabout().subscribe((data: any) => {
      this.about = data.data;
    });
  }

  ngOnDestroy(): void {
    this.titleService.setTitle("اشتراک گذاری کد تخفیف و کوپن فروشگاه ها خدمات آنلاین | چتربازان");
  }

}
