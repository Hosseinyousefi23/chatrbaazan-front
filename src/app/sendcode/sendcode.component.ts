import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import * as moment from 'jalali-moment';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sendcode',
  templateUrl: './sendcode.component.html',
  styleUrls: ['./sendcode.component.css']
})
export class SendcodeComponent implements OnInit {
  public dateChange(event: any, dateInput: any,picker:any) {
    var faDate = dateInput.value;
    moment.locale('fa');
    var enDateMomentFormat  = moment(faDate).locale('en');
    var enDate = new Date(enDateMomentFormat.toLocaleString());
    picker._validSelected = enDate;
    picker.startAt = enDate;
}
  codedata;
  constructor(private user : UsersService,private toastr: ToastrService) { }

  ngOnInit() {
    this.codedata={
      code:'',
      explaintion:'',
      ex_date:'',
      chatr:'',
    }
  }


  sendcode(){
    this.user.sendcode(this.codedata).subscribe(
      (data:any)=>{
        this.toastr.success('چتر با موفقیت ارسال شد')
      },
      (err:HttpErrorResponse) =>{
        this.toastr.error('مشکلی در ارسال چتر،لطفا مجددا امتحان نمایید.')
      }
      );
  }

}



