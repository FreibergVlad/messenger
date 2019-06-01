import {Pipe, PipeTransform} from '@angular/core';
import {DialogPreview} from '../models/dialog-preview';

@Pipe({
  name: 'usernameFilter'
})
export class UsernameFilterPipe implements PipeTransform {

  transform(userList: DialogPreview[], usernamePattern: string): DialogPreview[] {
    if (!userList.length || !usernamePattern) {
      return userList;
    } else {
      return userList.filter(dialogPreview =>
        dialogPreview.contact.username.toLowerCase().startsWith(usernamePattern.toLowerCase()));
    }
  }

}
