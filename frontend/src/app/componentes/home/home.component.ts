import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../servicios/app-service.service';
import { Data } from '../../modelos/data';
import  Swal  from 'sweetalert2/dist/sweetalert2.js';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: Data;

  constructor(private servicio: AppServiceService){
    this.data = new Data();
  }
  
  public hacerPeticion(){
    this.servicio.postData(this.data).subscribe(
      res => { this.mostrarResultados(res) },
      error => { this.mostrarAlertaError(error.error)}
    );
  }

  public mostrarAlertaError(error){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    })
  }

  public mostrarResultados(res){
    Swal.fire({
      icon: 'info',
      title: 'Predicion',
      text: 'P: ' + res.response
    })
  }

  ngOnInit(): void {
  }

}
