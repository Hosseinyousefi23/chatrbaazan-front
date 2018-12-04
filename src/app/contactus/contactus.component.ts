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
  contactus:object = {
	  name: null,
		email:null,
		contact: null
  };
  
  mode = new FormControl('over');

  constructor(private contactservice: ContactusService,private router :Router) {} ;
    

  ngOnInit() { 
  }
  
  save(tryForm?:NgForm){
    console.log('yes we can')
    console.log(this.contactus)
    this.contactservice.contactus(this.contactus).subscribe(
        (data: any) => {
          console.log(this.contactus);
        },
        error =>{
          console.warn(this.contactus);
          console.log('error', error);
        }
      );

	}

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
