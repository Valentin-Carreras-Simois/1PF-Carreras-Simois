import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesFormDialogComponent } from './components/courses-form-dialog/courses-form-dialog.component';
import { RouterModule } from '@angular/router';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { CoursesRoutingModule } from './courses-routing.module';



@NgModule({
  declarations: [
    CoursesComponent,
    CoursesFormDialogComponent,
    CoursesTableComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    CoursesRoutingModule,
  ],
  exports:[
    CoursesComponent
  ]
})
export class CoursesModule { }
