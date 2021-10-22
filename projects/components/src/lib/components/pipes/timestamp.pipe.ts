import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase/app';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  transform(value: firebase.firestore.Timestamp, format: string = 'MM-dd-yyyy'): unknown {
    const datePipe = new DatePipe('en');
    return datePipe.transform(value.seconds * 1000, format);
  }

}
