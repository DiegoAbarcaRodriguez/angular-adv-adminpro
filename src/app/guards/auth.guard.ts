import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { tap } from "rxjs";
import { UsuarioService } from '../services/usuarios.service';
import { inject } from "@angular/core";


export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    const usuarioService = inject(UsuarioService);
    const router = inject(Router);

    return usuarioService.validarToken()
        .pipe(tap(resp => { if (!resp) router.navigateByUrl('login') }))

}
