import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: []
})
export class UserDetailComponent implements OnInit {
  public user: User | undefined;
  public userId?: number;
  notifierService: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notification: NotifierService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userId = +this.activatedRoute.snapshot.params['id'];
    this.loadUser();
  }

  loadUser(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (user) => {
          if (user) {
            this.user = user;
          } else {
            this.notification.showError('Usuario no encontrado', 'Error');
            this.router.navigate(['/dashboard/users']);
          }
        },
        error: (error) => {
          console.error('Error al cargar el usuario: ', error);
        }
      });
    }
  }
}