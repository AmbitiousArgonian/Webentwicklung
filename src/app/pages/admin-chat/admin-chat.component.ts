import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';

type SenderRole = 'customer' | 'admin';

interface AdminConversation {
  id: string;
  customer: { id: string; name: string; email: string };
  createdAt: string;
}

interface ChatMessage {
  id: string;
  conversationId: string;
  senderRole: SenderRole;
  text: string;
  createdAt: string;
}

@Component({
  selector: 'app-admin-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css']
})
export class AdminChatComponent implements OnInit {
  conversations: AdminConversation[] = [];
  selected: AdminConversation | null = null;

  messages: ChatMessage[] = [];
  replyText = '';
  pollSub: any;

  private readonly baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadConversations();
  }

loadConversations() {
  this.http.get<AdminConversation[]>(
    `${this.baseUrl}/api/admin/chat/conversations`,
    { withCredentials: true }
  ).subscribe({
    next: (data) => {
      this.conversations = data.filter(
        c => c.customer.email !== 'admin@villa-mondial.local'
      );
    },
    error: (err) => console.error('Failed to load conversations', err)
  });
}
  selectConversation(c: AdminConversation) {
  this.selected = c;
  this.loadMessages();

  if (this.pollSub) {
    this.pollSub.unsubscribe();
  }

  this.pollSub = interval(3000).subscribe(() => {
    this.loadMessages();
  });
}

  loadMessages() {
    if (!this.selected) return;

    this.http.get<ChatMessage[]>(
      `${this.baseUrl}/api/admin/chat/messages/${this.selected.id}`,
      { withCredentials: true }
    ).subscribe({
      next: (msgs) => this.messages = msgs,
      error: (err) => console.error('Failed to load messages', err)
    });
  }

  sendReply() {
    const text = this.replyText.trim();
    if (!text || !this.selected) return;

    this.http.post(
      `${this.baseUrl}/api/admin/chat/messages/${this.selected.id}`,
      { text },
      { withCredentials: true }
    ).subscribe({
      next: () => {
        this.replyText = '';
        this.loadMessages();
      },
      error: (err) => console.error('Failed to send reply', err)
    });
  }
}