import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';



@NgModule({
    exports: [ImagenPipe],
    declarations: [ImagenPipe],

})
export class PipesModule { }
