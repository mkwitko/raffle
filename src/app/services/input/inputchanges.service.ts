import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputchangesService {
  constructor() {}

  callInverseBool(object) {
    return this.inverseBool(object);
  }

  callInputChangeCheck(event: any, object: any) {
    return this.inputChangeCheck(event, object);
  }

  callInputChangeValue(event: any, object: any) {
    return this.inputChangeValue(event, object);
  }

  private inputChangeCheck(event: any, object: any) {
    object = event.detail.checked;
    return object;
  }

  private inverseBool(object) {
    object = !object;
    return object;
  }

  private inputChangeValue(event: any, object: any) {
    return event.target;
  }
}
