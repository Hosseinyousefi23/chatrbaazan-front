import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

const m = moment();
m.locale('fa');
m.format('YY-MM-DD');
m.format('jYYYY/jMM/jDD'); // 1367/11/04
m.locale('fa').format('YYYY/MM/DD'); 
@Pipe({
  name: 'jalali'
})
export class JalaliPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let MomentDate = m;
    return MomentDate.locale('fa').format('YYYY/M/D');
  }

}
