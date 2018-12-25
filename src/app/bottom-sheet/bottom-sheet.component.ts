import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'bottom-sheet-overview-example-sheet',
    templateUrl: 'share.component.html',
  })
  export class BottomSheetOverviewExampleSheet implements OnInit {
    baseUrl = environment.mainurl;
    constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>,
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}
  
      ngOnInit(){
        this.baseUrl = this.baseUrl +"product/" +this.data.slug
        console.log(this.baseUrl)
      }
  }