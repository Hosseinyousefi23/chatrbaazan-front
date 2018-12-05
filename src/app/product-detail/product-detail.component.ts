import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../page.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  mode = new FormControl('over');
  pro : string = '';
  slug: string;
  constructor(private route: ActivatedRoute , private router : Router,private service :PageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {this.slug = params['slug'];})
    this.service.getproductByslug(this.slug).subscribe(param => { 
      if(param['data']){
        this.pro = param['data']
      }else{
      this.router.navigate(['/']);
    }
    });
  }

}
