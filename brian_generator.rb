#
# Run this code: $ ruby brian_generator.rb
# - after running this code, look for output in these files:
#       - lazy_routing_code_here.ts 
#       - lazy_routing_links_code_here.ts
#
#
#

require 'fileutils'

1000.times do 
    _hash = (0...8).map { (65 + rand(26)).chr }.join

    moduleName = "Foo_#{_hash}"
    module_path = "src/app/modules/#{moduleName}"

    main_module_code = <<-SOME_TYPESCRIPT_HERE
    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';

    import { #{moduleName}RoutingModule } from './#{moduleName}-routing.module';
    import { TestComponent } from './components/test/test.component';

    import { TestService } from './services/test.service';

    // sub-modules
    import { SharedModule } from '../../modules/shared/shared.module';

    @NgModule({
    imports: [
        CommonModule,
        #{moduleName}RoutingModule,
        SharedModule
    ],
    declarations: [TestComponent],
    // exports: [TestComponent],
    providers: [TestService]
    })
    export class #{moduleName}Module { }

    SOME_TYPESCRIPT_HERE




    router_code = <<-ROUTER_HERE
    import { NgModule } from '@angular/core';
    import { Routes, RouterModule } from '@angular/router';

    import { TestComponent } from './components/test/test.component';

    const routes: Routes = [
        {
            path: '',
            component: TestComponent
        },
        {
            path: 'test',
            component: TestComponent
        },
    ];

    @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
    })
    export class #{moduleName}RoutingModule { }
    ROUTER_HERE



    component_css_code = <<-COMPONENT_CSS_CODE
    COMPONENT_CSS_CODE

    component_html_code = <<-COMPONENT_HTML_CODE
    <app-navbar></app-navbar>

    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <!-- content -->
                <h3>#{moduleName} test</h3>
            </div>
        </div>
    </div>
    COMPONENT_HTML_CODE

    component_ts_code = <<-COMPONENT_TS_CODE
    import { Component, OnInit } from '@angular/core';
    import { TestService } from '../../services/test.service';

    @Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
    })
    export class TestComponent implements OnInit {

    constructor(private testService: TestService) { }

    ngOnInit() {
        alert(this.testService.test())
    }

    }
    COMPONENT_TS_CODE


    service_ts_code = <<-SERVICE_TS_CODE
    import { Injectable } from '@angular/core';

    @Injectable()
    export class TestService {

    constructor() {
        console.log("\\n\\n =======> #{moduleName} service instance created \\n\\n");
    }

    test(){


        let result1: string = "459vw8ne798s7d9fnd78fvsmdfvsdkfhvksdhfvksdfhskdjfsd"

        let result = result1
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")
            .concat("45345345")

        let list = [34534,335634,3745676,8755678,3563465,467467,34563465,785678,35634563,4674567,25463465,7486578,3653456,363456];

        for (let i in list) {
        console.log(i); // "0", "1", "2",
        }

        for (let i of list) {
        console.log(i); // "4", "5", "6"
        }

        for (let i of list) {
        console.log(i); // "4", "5", "6"
        }

        for (let i of list) {
        console.log(i); // "4", "5", "6"
        }

        for (let i of list) {
        console.log(i); // "4", "5", "6"
        }

        for (let i of list) {
        console.log(i); // "4", "5", "6"
        }

        for (let i of list) {
        console.log(i); // "4", "5", "6"
        }

        for (let i of list) {
        console.log(i); // "4", "5", "6"
        }

        for (let i of list) {
        console.log(i); // "4", "5", "6"
        }

        for (let i of list) {
        console.log(i); // "4", "5", "6"
        }

        for (let i of list) {
        console.log(i); // "4", "5", "6"
        }

        for (let i of list) {
        console.log(i); // "4", "5", "6"
        }

        for (let i of list) {
        console.log(i); // "4", "5", "6"
        }

        for (let i of list) {
        console.log(i); // "4", "5", "6"
        }

        for (let i of list) {
        console.log(i); // "4", "5", "6"
        }

        for (let i of list) {
        console.log(i); // "4", "5", "6"
        }

        for (let i of list) {
        console.log(i); // "4", "5", "6"
        }

        for (let i of list) {
        console.log(i); // "4", "5", "6"
        }

        for (let i of list) {
        console.log(i); // "4", "5", "6"
        }

        for (let i of list) {
        console.log(i); // "4", "5", "6"
        }

        alert(result);
        
        return '#{moduleName} service';
    }

    }
    SERVICE_TS_CODE


    lazy_routing_code = <<-LAZY_ROUTING_CODE
        {
            path: '#{moduleName}',
            // canActivate: [AuthGuard],
            loadChildren: 'app/modules/#{moduleName}/#{moduleName}.module##{moduleName}Module' // need absolute path
        },
    LAZY_ROUTING_CODE

    # FileUtils.mkdir_p "#{module_path}/"
    FileUtils.mkdir_p "#{module_path}/components/test"
    FileUtils.mkdir_p "#{module_path}/services"



    File.open("#{module_path}/#{moduleName}.module.ts", 'w') do |f| 
        f.write(main_module_code)
    end

    File.open("#{module_path}/#{moduleName}-routing.module.ts", 'w') do |f| 
        f.write(router_code)
    end


    File.open("#{module_path}/components/test/test.component.css", 'w') do |f| 
        f.write(component_css_code)
    end
    File.open("#{module_path}/components/test/test.component.html", 'w') do |f| 
        f.write(component_html_code)
    end
    File.open("#{module_path}/components/test/test.component.ts", 'w') do |f| 
        f.write(component_ts_code)
    end
    File.open("#{module_path}/services/test.service.ts", 'w') do |f| 
        f.write(service_ts_code)
    end


    File.open("lazy_routing_code_here.ts", 'a') do |f| 
        f.write(lazy_routing_code)
    end

    File.open("lazy_routing_links_code_here.ts", 'a') do |f| 
        f.write("\t\t\t<button class=\"btn btn-sm btn-default\" routerLink=\"/#{moduleName}\">#{moduleName}</button>\n")
    end

end