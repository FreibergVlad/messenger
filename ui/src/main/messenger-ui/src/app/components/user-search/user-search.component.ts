import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {MessagingService} from '../../services/messaging/messaging.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  searchSubject: Subject<string> = new Subject<string>();
  searchTerm = '';

  @Output() searchResult: EventEmitter<User[]> = new EventEmitter<User[]>();

  constructor(private messagingService: MessagingService) { }

  ngOnInit() {
    this.messagingService.searchForUsers(this.searchSubject).subscribe(userList => {
      this.searchResult.emit(userList.contactsList);
    });
  }

  searchForUser(event: any) {
    this.searchSubject.next(event.target.value);
  }

}
