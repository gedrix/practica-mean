import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarComponent } from './components/listar/listar.component';
import { ProductoComponent } from './components/producto/producto.component';

const routes: Routes = [
  {path: '', component: ListarComponent},
  {path: 'crear-producto', component: ProductoComponent},
  {path: 'editar-producto/:id', component: ProductoComponent},
  {path: '**', redirectTo:'', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
