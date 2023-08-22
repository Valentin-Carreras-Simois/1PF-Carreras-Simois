import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './store/courses.effects';
import { StoreModule } from '@ngrx/store';
import { coursesFeature } from './store/courses.reducer';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    RouterModule,
    StoreModule.forFeature(coursesFeature),
    EffectsModule.forFeature([CoursesEffects])

  ]
})
export class CoursesModule { }
