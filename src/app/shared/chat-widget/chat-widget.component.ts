import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css']
})
export class ChatWidgetComponent {

  isOpen = false;
  message = '';
  justSent = false;

    // Nummer vom Anbieter eintragen (international, ohne + und ohne Leerzeichen)
  whatsappNumber = '491782057883';


  toggle() {
    this.isOpen = !this.isOpen;
  }

  /** send() {
    if (!this.message.trim()) return;

    // Für jetzt nur Test
    console.log('Nachricht:', this.message);
    this.message = '';
    this.isOpen = false;
  } */
  send() {
    const text = this.message.trim();
    if (!text) return;

    const prefilled =
      `Hallo! Ich habe eine Frage zur Ferienwohnung (Martini Racing).\n\n` +
      `Nachricht: ${text}\n\n` +
      `Seite: ${location.href}`;

    const url = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(prefilled)}`;

    window.open(url, '_blank'); // öffnet WhatsApp Web oder App
        this.justSent = true;
    setTimeout(() => (this.justSent = false), 2000);
    this.message = '';
    //this.isOpen = false;
  }


}
