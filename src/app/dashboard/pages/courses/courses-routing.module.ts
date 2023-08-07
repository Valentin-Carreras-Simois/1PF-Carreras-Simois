import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { CourseDetailComponent } from "./pages/course-detail/course-detail.component";


@NgModule({
    declarations:[],
    imports:[
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: CoursesComponent,
            },
            {
                path: ':id',
                component: CourseDetailComponent,
            }
        ])
    ],
    exports:[RouterModule]
})
export class CoursesRoutingModule{}