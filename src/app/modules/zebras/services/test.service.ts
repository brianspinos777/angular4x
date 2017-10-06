import { Injectable } from '@angular/core';

@Injectable()
export class TestService {

  constructor() {
      console.log("\n\n =======> Zebras service instance created... \n\n"); 
  }

  test(){
      return 'zebras service';
  }

}
