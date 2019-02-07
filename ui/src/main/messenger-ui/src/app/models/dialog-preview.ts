export class DialogPreview {

  tabId: number;
  name: string;
  lastMessage: string;

  constructor(tabId, name, lastMessage) {
    this.tabId = tabId;
    this.name = name;
    this.lastMessage = lastMessage;
  }

}
