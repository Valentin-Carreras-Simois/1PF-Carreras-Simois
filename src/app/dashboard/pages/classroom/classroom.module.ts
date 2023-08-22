import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomRoutingModule } from './classroom-routing.module';
import { ClassroomComponent } from './classroom.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ClassroomComponent
  ],
  imports: [
    CommonModule,
    ClassroomRoutingModule,
    SharedModule
  ]
})
export class ClassroomModule { }
