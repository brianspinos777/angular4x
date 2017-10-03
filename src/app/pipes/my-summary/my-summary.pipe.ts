import { Pipe, PipeTransform } from '@angular/core';

// $ ng g p pipes/my-summary/my-summary

// {{ foo | mySummary:10 }}

@Pipe({
    name: 'mySummary'
})
export class MySummaryPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!value)
            return null;

        const actalLimit = (args) ? args : 50;

        return value.substr(0, actalLimit) + '...';
  }

}
