import { Injectable } from '@angular/core';

@Injectable()
export class TestService {

  constructor() {
      console.log("\n\n =======> Dogs service instance created \n\n");
  }

  test(){
      return 'dogs service';
  }

}
