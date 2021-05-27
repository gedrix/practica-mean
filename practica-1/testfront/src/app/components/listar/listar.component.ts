import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  listaProductos : Producto[] = [];
  constructor(private _productoService: ProductoService,
              private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos(){
    this._productoService.getProductos().subscribe(data => {
      //console.log(data);
      this.listaProductos = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarproducto(id:any){
    this._productoService.eliminarproducto(id).subscribe(data =>{
      this.toastr.error('El producto fue eleminado correctamente', ':C');
      this.listarProductos();
    }, error => {
      console.log(error);
    })
  }
}
