import { Component, OnInit, ElementRef, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zombies',
  templateUrl: './zombies.component.html',
  styleUrls: ['./zombies.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ZombiesComponent implements OnInit {
  @ViewChild('modal') public modal: ElementRef;
  @ViewChild('modal1') public modal1: ElementRef;
  @ViewChild('error') public error: ElementRef;

  zombies: any;
  nombre: string;
  email: string;
  tipo: string;
  id: string;
  error0: string;
  error1: string;
  constructor(private _dataService: DataService, private _renderer: Renderer2,
              private _appComponent: AppComponent, private router: Router) { }

  ngOnInit(): void {
    if (!this._appComponent.loged) {
      this.router.navigate(['login']);
    }
    this.refresh();
  }

  guardarZombies() {
    console.log(this.nombre, this.email, this.tipo);
    this._dataService.agregarZombie(this.nombre, this.email, this.tipo).subscribe((resultado) => {
      this.refresh();
      this._renderer.selectRootElement(this.modal.nativeElement, true).click();
      this.modal.nativeElement.dismiss();
    }, (error) => {
      console.log(error);
      this.error0 = error.error.errors;
    });
  }

  eliminarZombies(id: string) {
    console.log(id);
    this._dataService.eliminarZombies(id).subscribe((resultado) => this.refresh());
  }

  editarZombies(name: string, email: string, tipo: string, id: string) {
    this.nombre = name;
    this.email = email;
    this.tipo = tipo;
    this.id = id;
  }

  editarZombie() {
    console.log(this.nombre, this.email, this.tipo);
    this._dataService.editarZombie(this.nombre, this.email, this.tipo, this.id).subscribe((resultado) => {
      this.refresh();
      this._renderer.selectRootElement(this.modal1.nativeElement, true).click();
      this.modal1.nativeElement.dismiss();
    }, (error) => {
      console.log(error);
      this.error1 = error.error.errors;
    });
  }

  refresh() {
    this._dataService.zombiesObservable.subscribe((resultado) => {
      this.zombies = resultado;
      console.log(this.zombies);
    });

    this._dataService.obtenerZombies();
  }
}
