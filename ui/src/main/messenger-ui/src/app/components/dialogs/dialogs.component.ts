import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogsComponent implements OnInit {

  mockedTabs = Array.from(Array(20).keys());
  selectedTabId?: number = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

  }

  changeDialog(tabId: number) {
    this.selectedTabId = tabId;
  }

}
