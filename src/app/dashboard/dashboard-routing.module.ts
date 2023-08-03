import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { UsersComponent } from "./pages/users/users.component";
import { UserDetailComponent } from "./pages/users/pages/user-detail/user-detail.component";
import { CoursesComponent } from "./pages/courses/courses.component";
import { CourseDetailComponent } from "./pages/courses/pages/course-detail/course-detail.component";
import { StudentsComponent } from "./pages/students/students.component";
import { StudentDetailComponent } from "./pages/students/pages/student-detail/student-detail.component";

@NgModule({
    imports:[
        RouterModule.forChild([
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'users',
                children: [
                {
                    path: '',
                    component: UsersComponent
                },
                {
                    path: ':id',
                    component: UserDetailComponent
                }
                ]
            },
            {
                path: 'courses',
                children: [
                {
                    path: '',
                    component: CoursesComponent
                },
                {
                    path: ':id',
                    component: CourseDetailComponent
                }
                ]
            },
            {
                path: 'students',
                children: [
                {
                    path: '',
                    component: StudentsComponent
                },
                {
                    path: ':id',
                    component: StudentDetailComponent
                }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}