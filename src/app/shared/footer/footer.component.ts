import {Component, OnInit} from '@angular/core';
import {PageService} from '../../page.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  email = '';

  constructor(private data: PageService, private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  send_email() {
    this.data.send_one_email(this.email).subscribe(
      (data: any) => {
        // console.log('hiiiiiii')
        this.toastr.info('چترتون مستدام')
      },
      (err) => {
        // console.log(this.email)
        // console.log(err)

        this.toastr.error('ایمیل خود را وارد نمایید')

      }
    );
  }

}
