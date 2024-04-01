import { Injectable } from '@angular/core';
import { SweetAlertOptions } from 'sweetalert2';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  
  constructor() { }

  errorOcurred(message : any) {
    if(message === "Unknown Error")
      message= "No se pudo establecer conexión con el servidor. Intente nuevamente"

    if(message === "Gateway Timeout")
      message= "Revise su conexión. Intente nuevamente"

    if(message == undefined ||  message == null  || message.length == 0)
      message = "Error Desconocido. \n Por favor, comunicarse con algún administrador para resolver el problema lo antes posible."

    let config: SweetAlertOptions = {
      title: message,
      icon: 'error',
      showConfirmButton: true
    };

    Swal.fire(config).then(result => {
    });
  }

  messageSuccessfully(message : any, timer?: number) {
    if(!timer)
      timer = 2500;
      
    let config: SweetAlertOptions = {
      title: message,
      icon: 'success',
      showConfirmButton: false,
      timer: timer
    };

    Swal.fire(config).then(result => {});
  }
  
}
