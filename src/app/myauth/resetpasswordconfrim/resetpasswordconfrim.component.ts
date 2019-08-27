import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../users.service';
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
    this.route.params.subscribe(params => {this.token = params['token'];
    // let token_split = this.token.split("-")
    // this.token = this.token.replace(token_split[0]+"-","")
    // console.log(token_split)
    // console.log(this.token)
  }
  )
    this.myuser = {
      pass1: '',
      pass2: '',
      }
  }

  resetpassword(){
    let token_split = this.token.split("-",2)
    this.token = this.token.replace(token_split[0]+"-","")
    console.log(token_split)
    this.user.resetpassConfrim(this.myuser,token_split[0],this.token).subscribe(
      data =>{
        console.log(data);
        this.toastr.info('رمز عبور با موفقیت تغییر یافت')
        this.router.navigate(['/'])
      },
      err =>{
        if(err.error['new_password2']){
          // this.toastr.error('email '+err.error['email'][0])
          this.toastr.error('رمز عبور یکسان نمی باشد یا فاقد امنیت است')
          this.toastr.info('رمز عبور باید ترکیبی از اعداد حروف و علامت باشد(حداقل 8 کاراکتر)')
        }
        else{
        this.toastr.error('لینک اعتبار ندارد.')
        this.router.navigate(['/'])
        }
    }
    )
  }

}
