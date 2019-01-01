import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-sendcode',
  templateUrl: './sendcode.component.html',
  styleUrls: ['./sendcode.component.css']
})
export class SendcodeComponent implements OnInit {

  codedata;
  constructor(private user : UsersService) { }

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
      // data => console.log(data)
      );
  }

}
