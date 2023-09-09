import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: [
  ]
})
export class BreadcrumbComponent implements OnDestroy {
  public titulo = '';
  private subscribe?: Subscription;
  constructor(private router: Router) {
    this.subscribe = this.getArgumentosRutas();
  }

  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
  }

  getArgumentosRutas() {
    return this.router.events
      .pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
      .subscribe(({ titulo }) => {
        this.titulo = titulo;
        document.title = 'Admin - ' + titulo;
      });
  }
}
