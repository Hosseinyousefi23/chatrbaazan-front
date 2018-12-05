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
  slug: string;
  constructor(private route: ActivatedRoute , private router : Router,private service :PageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {this.slug = params['slug'];
    if (!this.service.getproductByslug(this.slug)){
      console.log("hi")
      this.router.navigate(['/']);
    }
  })
    
  }

}
