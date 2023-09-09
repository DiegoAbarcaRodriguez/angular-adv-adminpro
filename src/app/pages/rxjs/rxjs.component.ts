import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, filter, interval, map, retry, take } from 'rxjs';

@Component({
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  private subscription?: Subscription;
  constructor() {


    /* this.retornarObservable().pipe(
         retry(2) //Ejecuta nuevamente el observarble en dado caso de que encuentre un error 
     )
       .subscribe(
         valor => console.log('emit:', valor),
         error => console.error(error),
         () => console.info('el observable ha sido concluido!')
       );*/


    this.subscription = this.retornaIntervalo().subscribe(console.log);


  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(100)
      .pipe(
        map(valor => valor + 1),
        filter(valor => (valor % 2 === 0) ? true : false),
        // take(4), //Especifica un número máximo de emisiones del intervalo
      );


  }

  retornarObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>(observer => {

      const interval = setInterval(() => {
        i++;
        observer.next(i); //Es capturado por el primer argumento del subscribe (respuesta correcta)

        if (i === 2) {
          observer.error('Ha ocurrido un error')//Es capturado por el segundo argumento del subscribe(marcar error)
        }

        if (i === 4) {
          clearInterval(interval);
          observer.complete(); // Es capturado  por el tercer argumento del subscribe (frena sin marcar error)
        }
      }, 1000)
    });
  }
}
