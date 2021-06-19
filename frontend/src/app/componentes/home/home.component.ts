import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../servicios/app-service.service';
import { Data } from '../../modelos/data';
import  Swal  from 'sweetalert2/dist/sweetalert2.js';
import { ErrorComponent } from '../error/error.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataForm: FormGroup;

  constructor(private servicio: AppServiceService){
  }
  
  public hacerPeticion(dataFormValue){
    if (this.dataForm.valid){
      const data = new Data();
      data.Month = dataFormValue.Month;
      data.Hour = dataFormValue.Hour;
      data.T = dataFormValue.T;
      data.RH = dataFormValue.RH;
      data.CO = dataFormValue.CO;

      this.servicio.postData(data).subscribe(
        res => { this.mostrarResultados(res) },
        error => { this.mostrarAlertaError(error.error)}
      );
    }
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
      title: 'Predicion de Dioxido de Carbono',
      text: 'Concentración de CO2: ' + res.concentracion
    })
  }

  ngOnInit() {
    this.dataForm = new FormGroup({
      Month: new FormControl('', [Validators.required, Validators.min(1), Validators.max(12)]),
      Hour: new FormControl('', [Validators.required, Validators.min(0), Validators.max(23)]),
      T: new FormControl('', [Validators.required]),
      RH: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
      CO: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  public validateControl = (controlName: string) => {
    if (this.dataForm.controls[controlName].invalid && this.dataForm.controls[controlName].touched)
      return true;
    return false;
  }
  public hasError = (controlName: string, errorName: string) => {
    if (this.dataForm.controls[controlName].hasError(errorName))
      return true;
    return false;
  }

}
