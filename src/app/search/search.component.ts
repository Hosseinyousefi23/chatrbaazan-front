import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PageService } from '../page.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  Categoryid;
  pro;
  mode = new FormControl('over');
  constructor(private router: Router ,private route: ActivatedRoute,private data: PageService) { }

  ngOnInit() {
    if(this.router.url.slice(1,9)=='category'){
      this.route.params.subscribe(params => { this.Categoryid = params['id'];})
      this.data.searchbyCategory(this.Categoryid).subscribe(param => { 
        if(param['data']){
          this.pro = param['data']
        }else{
        this.router.navigate(['/']);
      }
      });

    }
  }

}
