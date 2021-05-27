import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  productoForm: FormGroup;
  titulo = 'Crear producto';
  id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private aRouter: ActivatedRoute) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],

    })
    this.id = this.aRouter.snapshot.paramMap.get('id'); //aacdemos a id que enviamos desde el otro componente
  }

  ngOnInit(): void {
    this.editarProducto();
  }

  agregarProducto() {
    //console.log(this.productoForm.get('producto')?.value);
    const producto: Producto = {
      nombre: this.productoForm.get('producto')?.value,   //de acuerdo al modelo Producto
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

    if (this.id !== null) {
      //editar
      this._productoService.editarProducto(this.id, producto).subscribe(data=>{
        this.toastr.info('Felicidades', 'Se modificó correctamente');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
    } else {
      //guardar
      //console.log(producto);
      this._productoService.guardarProducto(producto).subscribe(data => {
        this.toastr.success('Felicidades', 'se agregó correcto');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })

    }

  }

  editarProducto() {
    if (this.id !== null) {
      this.titulo = 'Editar producto';

      this._productoService.obtenerproducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio

        })
      })
    }

  }
}
