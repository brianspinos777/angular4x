import { Injectable } from '@angular/core';

@Injectable()
export class TestService {

  constructor() {
      console.log("\n\n =======> Widgets service instance created... \n\n");
  }

  test(){
      return 'widgets service';
  }

}
