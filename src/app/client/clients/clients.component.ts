import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { ClientService } from '../service/client.service';
import {HttpErrorResponse} from  '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelService } from '../service/modelService/model.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})


export class ClientsComponent implements OnInit {
  

  fullName: string = '';
  apellido: string = '';
  fechaCreacion: Date = new Date();
  
  @ViewChild('exampleModal') exampleModal!: ElementRef;

  data: any[] = [];

  value:string ='';

 
  formularioC: FormGroup;

  constructor(private formBuilder: FormBuilder,public service: ClientService , public modalService: ModelService ) {

    this.formularioC = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(/.*\s.*/)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^\d+$/)]],
    startDate: ['', [Validators.required]]
  });
   }

 ngOnInit(): void {
  
 }



  consultData() {
    console.log(this.value)
    if(this.value == ''){
      this.service.getClients().subscribe(data => {
        this.data = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error en la solicitud POST:', error);
        // Manejar el error
      }
    );
    }else {
      this.service.getClientId(this.value).subscribe(data => {
        this.data = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error en la solicitud POST:', error);
        // Manejar el error
      }
    );
    }
   
  }

  exportToCsv() {
    // Convertir datos a formato CSV
    const csvContent = this.convertToCsv(this.data);

    // Crear un enlace temporal para descargar el archivo CSV
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodedUri);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  convertToCsv(data: any[]) {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).join(','));
    return header + '\n' + rows.join('\n');
  }


  closeModal(): void {
    // Obtener el elemento DOM del modal
    const modalElement = this.exampleModal.nativeElement;

    // Modificar el atributo data-bs-dismiss para cerrar el modal
    modalElement.setAttribute('data-bs-dismiss', 'modal');
  }

  sendDataClient() {
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
      
      this.closeModal();

    } else {
      console.error('Por favor, complete todos los campos.');
    }
  }
   
  hasError(controlName:string , errorType :string){
    return this.formularioC.get(controlName)?.hasError(errorType) && this.formularioC.get(controlName)?.touched; 

  }

 

}
