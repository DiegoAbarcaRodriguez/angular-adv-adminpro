import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`.has-arrow.waves-effect.waves-dark.active {
    background-color: transparent;
    }`
  ]
})
export class SidebarComponent {
  usuario!: Usuario;

  constructor(
    public sidebarService: SidebarService,
    private usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;

  }
}
