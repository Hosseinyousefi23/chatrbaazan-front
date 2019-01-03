import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

const m = moment();
m.locale('fa');
m.format('dd-MM-yyyy');
m.format('jYYYY/jMM/jDD'); // 1367/11/04
m.locale('fa').format('YYYY/MM/DD'); 
@Pipe({
  name: 'jalali'
})
export class JalaliPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // let MomentDate = m;
    // console.log(value)
    const m = moment(value);
    m.locale('fa');
    m.format('dd-MM-yyyy');
    m.format('jYYYY/jMM/jDD'); // 1367/11/04
    m.locale('fa').format('YYYY/MM/DD');
    let MomentDate = m;
    // return moment(value).locale('fa').format('dd-MM-yyyy');
    return MomentDate.locale('fa').format('YYYY/M/D');
  }

}
