import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './servicios/app-service.service';
import { Data } from './modelos/data';
import  Swal  from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: Data;

  constructor(private servicio: AppServiceService){
    this.data = new Data();
  }
  
  public hacerPeticion(){
    this.servicio.postData(this.data).subscribe(
      res => { this.mostrarResultados(res) },
      error => { this.mostrarAlertaError()}
    );
  }

  public Imprimir(){
    console.log(this.data);
  }

  public mostrarAlertaError(){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Petición Fallida'
    })
  }

  public mostrarResultados(res){
    Swal.fire({
      icon: 'success',
      title: 'Predicion',
      text: 'P: ' + res.response
    })
  }

  ngOnInit(){
  }
}
