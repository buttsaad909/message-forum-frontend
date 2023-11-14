import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { MessageComponent } from './message.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageComponent],
      imports: [HttpClientTestingModule, FormsModule, HttpClientModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should toggle comment form', () => {
    const message = { showCommentForm: false };
    component.toggleCommentForm(message);
    expect(message.showCommentForm).toBeTruthy();
  });

  it('should post a message', () => {
    const httpSpy = spyOn(component['http'], 'post').and.callThrough();
    component.postMessage();
    expect(httpSpy).toHaveBeenCalledWith('http://localhost:3010/api/message', component.newMessage);
    expect(component.newMessage).toEqual({ author: '', content: '' });
  });

  it('should add a comment', () => {
    const httpSpy = spyOn(component['http'], 'post').and.callThrough();
    const message = { _id: '1' };
    component.addComment(message);
    expect(httpSpy).toHaveBeenCalledWith('http://localhost:3010/api/message/1/comments', component.newComment);
    expect(component.newComment).toEqual({ author: '', content: '' });
  });

  it('should update the view when messages change', () => {
    component.messages = [{ content: 'Test Message' }];
    fixture.detectChanges();
    const messageElement = fixture.debugElement.query(By.css('.message p')).nativeElement;
    expect(messageElement.textContent).toContain('Test Message');
  });

  it('should disable the submit button if the form is invalid', () => {
    component.newMessage.author = '';
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeTruthy();
  });

});
