import { Injectable } from '@angular/core';

@Injectable()
export class TestService {

  constructor() {
      console.log("\n\n =======> Tigers service instance created... \n\n");
  }

  test(){
      return 'tigers service';
  }

}
