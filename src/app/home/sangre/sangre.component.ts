import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Sangre } from 'src/app/models/sangre';
import { UserServices } from '../../services/userservices.services';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../services/alert/alert.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sangre',
  templateUrl: './sangre.component.html',
  styleUrls: ['./sangre.component.css']
})

export class SangreComponent {

  @Input() content_sangres : Array<Sangre> = [];
  
  @ViewChild('dt') dt? : Table;
  
  //Variables que serán utilizadas dentro de la tabla
  public _selected_columns: any = [];
  public lazy = false;
  public show_filters = true;

  //Objeto para guardar la información del sangreo seleccionado
  public sangre : Sangre = {};
  
  //Objetos que serán utilizado para llamar el modal
  public modalReference : any;
  public closeResult: string | undefined;
  public titleModal : string = "";

  public table_cols = [
    { field: 'code', header: 'Código' },
    { field: 'name', header: 'Nombre' },
    { field: 'level', header: 'Nivel de Sangre' },
    { field: 'type', header: 'Tipo de Sangre' },
    { field: 'createBy', header: 'Creado Por' },
    { field: 'actions', header: 'Acciones' },
  ];

  public categories = [
    { code: "1", title: 'A+' },
    { code: "2", title: 'A-' },
    { code: "3", title: 'AB+' },
    { code: "4", title: 'AB-' },
    { code: "5", title: 'B+' },
    { code: "6", title: 'B-' },
    { code: "7", title: 'O+' },
    { code: "7", title: 'O-' },
  ]

  private apiUrl : string = environment.apiUrl;
  public action = "";

  constructor(public userService: UserServices,
              private modalService: NgbModal,
              private alertService: AlertService) { 
    localStorage.setItem('view', '1');
  }

  ngOnInit(): void {
    this._selected_columns = this.table_cols;
    this.getSangre();
  }

  public getSangre(){
    localStorage.setItem('spinner', '1');

    this.userService
      .getUrl('sangres')
      .then(response => {
        this.content_sangres = response;
        console.log(this.content_sangres)
        localStorage.setItem('spinner', '0');
      })
      .catch(error => {
        console.log(error.error)
        this.alertService.errorOcurred(error.statusText);
      });
  }

  public clearData(){
    this.sangre = new Sangre();
  }

  public deleteSangre(id : any){
    this.userService
    .deleteUrl('sangres/{id}', [id])
    .then(response => {
      console.log(response);
      this.getSangre();
      this.modalReference.close();
    })
    .catch(error => {
      console.log(error);
    })
  }

  open(content: any, data : any) {

    if(data != null){
      this.sangre._id = data._id;
      this.sangre.code = data.code;
      this.sangre.name = data.name;
      this.sangre.content = data.content;
      this.sangre.level = data.level.replace("mm", "");
      this.sangre.type = data.type;
      this.sangre.createBy = data.createBy;
      this.titleModal = "Editar Sangre";

      this.action = "U";
    }else{
      this.sangre.code = this.content_sangres.length + 1;
      this.sangre.name = "Sangre #" + this.sangre.code;
      this.sangre.content = "";
      this.sangre.level = "75";
      this.sangre.type = "1";
      this.sangre.createBy = localStorage.getItem('username')!;
      this.titleModal = "Agregar Sangre";
      this.action = "C";
    }

    this.modalReference = this.modalService.open(content, { size: 'lg', centered: true});

    this.modalReference.result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.clearData();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  public createOrUpdateSangre(){    
    let sangres = {
      'code': this.sangre.code,
      'name': this.sangre.name,
      'content': this.sangre.content,
      'level': this.sangre.level! + "mm",
      'type': this.sangre.type,
      'createBy': this.sangre.createBy }

    localStorage.setItem('spinner', '1');
    if(this.action == "C"){
      this.userService
        .postUrl('sangres', sangres)
        .then(response => {
          console.log(response)
          this.getSangre();
          this.modalReference.close();
        })
    }else{
      let id : any = this.sangre._id;
      this.userService
        .putUrl('sangres/{id}', sangres, [id])
        .then(response => {
          console.log(response);
          this.getSangre();
          this.modalReference.close();
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  public categoryName(code : any){
    let name = "No Aplicado";

    for (let index = 0; index < this.categories.length; index++) {
      if(this.categories[index].code == code){
        name = this.categories[index].title;
      }
    }

    return name;
  }

  delete(content: any, data : any){
    if(data != null){
      this.sangre._id = data._id;
    }

    this.modalReference = this.modalService.open(content, { centered: true});

    this.modalReference.result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.clearData();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  @Input() get selected_columns(): any[] {
    return this._selected_columns;
  }

  set selected_columns(val: any[]) {
    //restore original order
    this._selected_columns = this.table_cols.filter(col => val.includes(col));
  }

  //PrimeNG Functions and Procedures
  apply_filter($event : any) {
    console.log($event.target.value);
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
  }
}
