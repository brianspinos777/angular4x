import { Injectable } from '@angular/core';

@Injectable()
export class TestService {

  constructor() { }

  test(){
      return 'dogs service';
  }

}
