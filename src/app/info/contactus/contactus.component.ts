import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl,FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ContactusService } from '../../contactus.service';
import { Router } from '@angular/router';
import { PageService } from '../../page.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
  providers: [ContactusService]
})
export class ContactusComponent implements OnInit {
  protected aFormGroup: FormGroup;

  lat: number = 51.678418;
  lng: number = 7.809007;
  contactus;
  info;
  mode = new FormControl('over');
  siteKey="6LfMlYUUAAAAANnzQ84CwiXwmrqjIV99oJLknoe7";
  size='Normal';
  type='Image'
  lang='en'
  theme='Light'

  constructor(private contactservice: ContactusService,private page: PageService,
    private router :Router,private toastr: ToastrService,private formBuilder: FormBuilder) {} ;


  ngOnInit() {
    this.contactus ={
      name: '',
      email: '',
      contact: ''
    };
    this.page.getContactInfo().subscribe((data:any) => {this.info = data.data;}) ;
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
    // this.page.getContactInfo().subscribe(
    //   data => {console.log(data)}
    //   )


  }

  save(tryForm?:NgForm){
    this.contactservice.contactus(this.contactus).subscribe(
        (data: any) => {
          // console.log(this.contactus);
          this.toastr.info('چترتون مستدام');
        },
        error =>{
          // console.warn(this.contactus);
          console.log('error', error);
          this.toastr.error('متاسفانه ارسال نشد')
        }
      );

  }

  getContactInfo(){
    this.page.getContactInfo().subscribe(
      data => console.log(data)
    )
  }
//TODO: validate email and  clean form and show  sucess maessage


//   this.contact = new FormGroup({
//     name: new FormControl(),
//     email: new FormControl(),
//     contact: new FormControl()
//  });

  //  onSubmit(tryForm?:NgForm){
  //    console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
  //    console.log(this.contactus);
    // this.contactservice.contactus(this.contactus).subscribe(
    //   (data: any) => {
    //     console.log(this.contactus.value);
    //   },
    //   error =>{
    //     console.warn(this.contactus.value);
    //     console.log('error', error);
    //   }
    // );
 // }

}
