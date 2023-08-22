import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  return inject(Store).select(selectIsAdmin).pipe(
    map((isAdmin) => {
      if (!isAdmin) {
        alert('Autorizacion Requerida. Volviendo al Inicio.')
        return router.createUrlTree(['/dashboard/home'])
      }

      return true;
    })
  )
};
