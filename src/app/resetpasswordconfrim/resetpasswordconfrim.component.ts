import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resetpasswordconfrim',
  templateUrl: './resetpasswordconfrim.component.html',
  styleUrls: ['./resetpasswordconfrim.component.css']
})
export class ResetpasswordconfrimComponent implements OnInit {

  constructor(private user : UsersService,private toastr: ToastrService
    ,private route: ActivatedRoute ,private router :Router) { }
  myuser;
  token = '';

  ngOnInit() {
    this.route.params.subscribe(params => {this.token = params['token'];}
  )
    this.myuser = {
      pass1: '',
      pass2: '',
      }
  }

  resetpassword(){
    this.user.resetpassConfrim(this.myuser,this.token).subscribe(
      data =>{ 
        console.log(data);
        this.toastr.info('رمز عبور با موفقیت تغییر یافت')
        this.router.navigate(['/'])
      },
      err =>{
        this.toastr.error('لینک اعتبار ندارد.')
        // this.router.navigate(['/'])
    }
    )
  }

}
