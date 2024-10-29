import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent {
  contato = { nome: '', email: '', mensagem: '' };

  enviarContato() {
    alert(`Obrigado, ${this.contato.nome}! Seu contato foi enviado.`);
    this.contato = { nome: '', email: '', mensagem: '' };
  }
}
