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
  newComment = { author: '', content: '' };

  constructor(private http: HttpClient) {
    this.getMessages();
  }

  // Hide form upon submission
  toggleCommentForm(message: any) {
    message.showCommentForm = !message.showCommentForm;
  }

  // Retrieving all the messages and comments
  getMessages() {
    this.http.get<any[]>('http://localhost:3010/api/allmessages')
      .subscribe(data => this.messages = data);
  }

  // Posting the message
  postMessage() {
    this.http.post('http://localhost:3010/api/message', this.newMessage)
      .subscribe(() => {
        this.getMessages();
        this.newMessage = { author: '', content: '' };
    });
  }

  // Posting the comment of the specific message
  addComment(message: any) {
    this.http.post(`http://localhost:3010/api/message/${message._id}/comments`, this.newComment)
      .subscribe(() => {
          this.getMessages();
          this.newComment = { author: '', content: '' };
        });
  }

}
