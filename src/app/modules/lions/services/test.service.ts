import { Injectable } from '@angular/core';

@Injectable()
export class TestService {

  constructor() {
      console.log("\n\n =======> Lions service instance created \n\n");
  }

  test(){
      return 'lions service';
  }

}
