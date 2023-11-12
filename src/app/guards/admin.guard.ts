import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { tap } from "rxjs";
import { UsuarioService } from '../services/usuarios.service';
import { inject } from "@angular/core";


export const AdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    const usuarioService = inject(UsuarioService);
    const router = inject(Router);

    if (usuarioService.role === 'USER_ROLE') {
        router.navigateByUrl('/dashboard')
        return false;

    } else {
        return true
    }
}
