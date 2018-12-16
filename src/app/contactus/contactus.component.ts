import { Component, OnInit } from '@angular/core';
import { NgForm,FormGroup, FormControl } from '@angular/forms';
import { ContactusService } from '../contactus.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
  providers: [ContactusService]
})
export class ContactusComponent implements OnInit {
  
  lat: number = 51.678418;
  lng: number = 7.809007;
  contactus; 
  
  mode = new FormControl('over');

  constructor(private contactservice: ContactusService,private router :Router) {} ;
    

  ngOnInit() { 
    this.contactus ={
      name: '',
      email: '',
      contact: ''
    };
    
  }
  
  save(tryForm?:NgForm){
    this.contactservice.contactus(this.contactus).subscribe(
        (data: any) => {
          // console.log(this.contactus);
        },
        error =>{
          // console.warn(this.contactus);
          console.log('error', error);
        }
      );

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
