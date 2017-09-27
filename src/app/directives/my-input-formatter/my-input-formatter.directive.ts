import { Directive, HostListener, ElementRef, Input } from '@angular/core'

// $ ng g d directives/my-input-formatter/my-input-formatter
// <input type="text" appMyInputFormatter [myFormat]="'uppercase'">


@Directive({
    selector: '[appMyInputFormatter]'
})
export class MyInputFormatterDirective {

    @Input('myFormat') myFormat

    constructor(
        private elementRef:ElementRef
    ){
        //...
    }

    @HostListener('focus') onFocus(){
        // alert('FOCUS')
    }

    @HostListener('blur') onBlur(){
        // alert('blur')

        let value:string = this.elementRef.nativeElement.value

        if(this.myFormat === 'uppercase'){
            this.elementRef.nativeElement.value = value.toUpperCase()
        }else{
            this.elementRef.nativeElement.value = value.toLowerCase()
        }
        
    }

}
