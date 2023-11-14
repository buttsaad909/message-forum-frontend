import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  messages: any[] = [];
  newMessage = { author: '', content: '' };

  constructor(private http: HttpClient) {
    this.getMessages();
  }

  getMessages() {
    this.http.get<any[]>('http://localhost:3010/api/allmessages')
      .subscribe(data => this.messages = data);
  }

}
