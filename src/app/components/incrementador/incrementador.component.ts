import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent {

  @Input('valor') progreso: number = 40;
  @Input() btnClass: string = 'btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor(valor: number): number | void {
    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);

  }

  onChange(event: number) {
    if (event >= 100) {
      this.progreso = 100;
    } else if (event < 0) {
      this.progreso = 0
    } else {
      this.progreso = event
    }

    this.valorSalida.emit(this.progreso);


  }
}
