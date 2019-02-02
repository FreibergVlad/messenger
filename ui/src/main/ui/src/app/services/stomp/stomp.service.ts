import {User} from "../../shared/models/user";
import {Message} from "../../shared/models/message";
import { Injectable } from '@angular/core';

export type User = User;
export type Message = Message;

const server_address = 'http://localhost:8080/chat';
const participants: Array<User> = [{id: 0, username: 'Alice Cooper'}, {id: 1, username: 'Freiberg Vlad'},
    {id: 2, username: 'James Dow'}, {id: 3, username: 'Qwe Rty'}, {id: 4, username: 'Zxc Vbn'}, {id: 5, username: 'James Dow'}];
const messages: Array<MessageHistory> = [{senderID: 0, messages: [{content: '1223', msgType: 'CHAT'},
        {content: '12dasdffdsfsf23', msgType: 'CHAT'},
        {content: '12fsfsff23', msgType: 'CHAT'}, {content: '12fsfsff23', msgType: 'CHAT'}, {content: '12fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff2312fsfsff23', msgType: 'CHAT'}]}
        , {senderID: 1, messages: [{content: '1223', msgType: 'CHAT'},
    {content: '12dasdffdsfsf23', msgType: 'CHAT'},
    {content: '12fsfsff23', msgType: 'CHAT'}]}, {senderID: 2, messages: [{content: '1223', msgType: 'CHAT'},
    {content: '12dasdffdsfsf23', msgType: 'CHAT'},
    {content: '12fsfsff23', msgType: 'CHAT'}]}];

export interface MessageHistory {
    senderID: Number;
    messages: Array<Message>;
}

@Injectable()
export class StompService {

  constructor() { }

  getDialogs(): Array<User> {
      return participants;
  }

  getMessageHistory(userID: Number): Array<Message> {
      let res = messages.find(msgHist => msgHist.senderID === userID);
      return res.messages;
  }

  init() { }

  sendMessage() { }

}
