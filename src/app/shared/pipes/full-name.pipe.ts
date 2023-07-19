import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/dashboard/pages/users/models';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(user: User, ...args: unknown[]): unknown {

    const fullName = `${user.name} ${user.surname}`;
    const isUppercase = args[0] === 'uppercase';

    return isUppercase ? fullName.toUpperCase() : fullName;
  }
}
