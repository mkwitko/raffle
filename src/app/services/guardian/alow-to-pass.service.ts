import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AllowToPassService {
  constructor() {}

  guardian(objects: any[], condition?: any): boolean {
    for (const a of objects) {
      if (condition) {
        if (a !== condition) {
          return false;
        }
      } else {
        if (!a) {
          return false;
        }
      }
    }
    return true;
  }

  checkFields(objects: any[], object: any): boolean {
    let include = true;
    let notIncluded = new Array<any>();
    notIncluded = [];
    let key: any;
    for (const field of objects) {
      for (key in object) {
        if (field === key) {
          if (object[key].length === 0) {
            notIncluded.push(key);
            include = false;
            break;
          }
        }
      }
    }
    return include;
  }
}
