import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../service/client.service';
import { Router } from '@angular/router';
import {ModelService} from '../service/modelService/model.service'



@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClientComponent implements OnInit {
 
  @ViewChild('exampleModal', { static: true }) modal!: ElementRef<any>;

  fullName: string = '';
  apellido: string = '';
  fechaCreacion: Date = new Date();


  formularioC: FormGroup;


  constructor(private formBuilder: FormBuilder, public service: ClientService , private router :Router , public modalService: ModelService ) {
    this.formularioC = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/.*\s.*/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\d+$/)]],
      startDate: ['', [Validators.required]]
    });
  }


  ngOnInit(): void {

  }

  enviarFormulario() {
    if (this.formularioC.valid) {
      this.fullName = this.formularioC.get('name')!.value;
      const indiceEspacio = this.fullName.indexOf(' ');

      const data = {
        shared_key: this.fullName.charAt(0) + this.fullName.substring(indiceEspacio + 1),
        bussines_id: this.formularioC.value.name,
        date_added: this.formularioC.value.startDate.split('-').join('/'),
        email: this.formularioC.value.email,
        phone: Number(this.formularioC.value.phone)
      };
      console.log(data)
      this.service.addClient(data).subscribe(response => {
        console.log('Se ejecutpo el servicio de forma correcta');
      });
      window.location.reload();  


    } else {
      console.error('Por favor, complete todos los campos.');
    }
  }
   
  hasError(controlName:string , errorType :string){
    return this.formularioC.get(controlName)?.hasError(errorType) && this.formularioC.get(controlName)?.touched; 

  }

  





}
