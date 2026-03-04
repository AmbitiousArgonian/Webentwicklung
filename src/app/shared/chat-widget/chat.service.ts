import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type SenderRole = 'customer' | 'admin';

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderRole: SenderRole;
  text: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.baseUrl}/api/chat/messages`, {
      withCredentials: true
    });
  }

  sendMessage(text: string): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(
      `${this.baseUrl}/api/chat/messages`,
      { text },
      { withCredentials: true }
    );
  }

  ensureConversation(): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/chat/conversation`, {}, { withCredentials: true });
  }
}