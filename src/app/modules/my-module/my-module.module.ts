import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyParentComponent } from './components/lazy-parent/lazy-parent.component';
import { LazyChildComponent } from './components/lazy-child/lazy-child.component';

import { Routes, RouterModule } from '@angular/router'; // add this

const routes: Routes = [
    {
        path: '', // also 'lazy-parent'
        component: LazyParentComponent
    },
    {
        path: 'lazy-parent', 
        component: LazyParentComponent
    },
    {
        path: 'lazy-child', 
        component: LazyChildComponent
    }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes) // add this
  ],
  declarations: [
      LazyParentComponent, 
      LazyChildComponent
  ]
})
export class MyModuleModule { }


// $ ng g m modules/my-module
// $ ng g c modules/my-module/components/lazy-parent -- module my-module
// $ ng g c modules/my-module/components/lazy-child -- module my-module