import { Component, OnInit } from '@angular/core';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../page.service';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.css']
})
export class DetailModalComponent implements OnInit {
  pro
  constructor(public dialogRef: MatDialogRef<DetailModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ,private route: ActivatedRoute , private router : Router,private service :PageService
  ) { }

  ngOnInit() {
    console.log(this.data)
    this.service.getproductByslug(this.data.slug).subscribe(param => { 
      if(param['data']){
        this.pro = param['data']
      }else{
      this.router.navigate(['/']);
    }
    });
  }

  close() {
    this.dialogRef.close();
  }

}
