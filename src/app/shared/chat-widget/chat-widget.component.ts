import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, ChatMessage } from './chat.service';
import { Subject, timer, EMPTY } from 'rxjs';
import { switchMap, takeUntil, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css']
})
export class ChatWidgetComponent implements OnDestroy {
  isOpen = false;
  message = '';
  messages: ChatMessage[] = [];
  justSent = false;

  private destroy$ = new Subject<void>();
  private open$ = new Subject<boolean>();

  constructor(private chatService: ChatService) {
    // Polling startet nur, wenn isOpen === true
    this.open$
      .pipe(
        distinctUntilChanged(),
        switchMap((open) => {
          if (!open) return EMPTY;
          return timer(0, 3000).pipe(
            takeUntil(this.open$.pipe(switchMap(v => (v ? EMPTY : timer(0))))), // stoppt beim Schließen
            switchMap(() => this.chatService.getMessages())
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (msgs) => (this.messages = msgs),
        error: (err) => console.error('Chat polling error', err)
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.open$.complete();
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.open$.next(this.isOpen);

    // optional: beim Öffnen einmal sofort laden (für snappy UX)
    if (this.isOpen) {
      this.chatService.getMessages().subscribe({
        next: (msgs) => (this.messages = msgs),
        error: (err) => console.error('Load messages failed', err)
      });
    }
  }

  send() {
    const text = this.message.trim();
    if (!text) return;

    this.chatService.sendMessage(text).subscribe({
      next: () => {
        this.message = '';
        this.justSent = true;
        setTimeout(() => (this.justSent = false), 2000);

        // sofort aktualisieren, wenn Chat offen ist
        if (this.isOpen) {
          this.chatService.getMessages().subscribe({
            next: (msgs) => (this.messages = msgs),
            error: (err) => console.error('Refresh after send failed', err)
          });
        }
      },
      error: (err) => console.error('Send failed', err)
    });
  }
}