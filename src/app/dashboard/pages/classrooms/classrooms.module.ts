import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassroomsRoutingModule } from './classrooms-routing.module';
import { ClassroomsComponent } from './classrooms.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ClassroomEffects } from './store/classroom.effects';
import { StoreModule } from '@ngrx/store';
import { classroomFeature } from './store/classroom.reducer';
import { ClassroomDialogComponent } from './components/classroom-dialog/classroom-dialog.component';


@NgModule({
  declarations: [
    ClassroomsComponent,
    ClassroomDialogComponent
  ],
  imports: [
    CommonModule,
    ClassroomsRoutingModule,
    SharedModule,
    RouterModule,
    StoreModule.forFeature(classroomFeature),
    EffectsModule.forFeature([ClassroomEffects])
  ],
  exports: [ClassroomsComponent]
})
export class ClassroomsModule { }
