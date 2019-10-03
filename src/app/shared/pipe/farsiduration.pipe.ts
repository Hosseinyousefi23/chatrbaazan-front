import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'farsiduration'
})
export class FarsidurationPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let end_date = new Date(value).getTime();
    let date = Date.now();
    const intervals = {
      'سال': 31536000,
      'ماه': 2592000,
      'روز': 86400,
      'ساعت': 3600,
      'دقیقه': 60,
      'ثانیه': 1
    };
    let seconds = Math.floor((end_date - date) / 1000);
    if (seconds > 0) {
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          if (i == 'روز' && counter == 1) {
            let hours = Math.floor(seconds / 3600);
            return "اعتبار تا " + hours + " ساعت دیگر";
          }
          return "اعتبار تا " + counter + " " + i + " " + "دیگر";
        }

      }
    } else {
      return "منقضی شده"
    }

    return value;

  }

}
