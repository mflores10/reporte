import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../shared/services/crud.service';
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component
import { ToastrService } from 'ngx-toastr';

//import { Student } from '../../shared/services/student'; 


@Component({
  selector: 'app-edit-poll',
  templateUrl: './edit-poll.component.html',
  styleUrls: ['./edit-poll.component.css']
})
export class EditPollComponent implements OnInit {
  studentForm: FormGroup;  
  //Student: Student[]; 
  itemKey: string;
  constructor(
    private crudApi: CrudService,       // Inject CRUD API in constructor
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
    private toastr: ToastrService       // Toastr service for alert message
    
  ) { }

  ngOnInit() {
    this.studenForm();   // Call updateStudentData() as soon as the component is ready 
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    console.log('id del usuario en editPol', id);

    //const id = this.actRoute.snapshot.paramMap.get('id'); 
    //console.log('id desde dashboard ', id);
    let s = this.crudApi.ValidateUser(id);
    //console.log('valor de s', s);
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      //this.Student = [];
      //console.log('valor de data ',data);
      data.forEach(item => {
        //console.log('id del Poll', item.key);
        this.itemKey=item.key
      })
      //console.log('valor de itemkey', this.itemKey);
      this.crudApi.GetStudent(this.itemKey).valueChanges().subscribe(data => {
        //console.log(this.studentForm.setValue(data.actividadActual));
        //console.log('valor de la data ', JSON.parse(data));
        this.studentForm.setValue(data)
      })
    })

  }
  studenForm() {
    const id = this.actRoute.snapshot.paramMap.get('id'); 

    this.studentForm = this.fb.group({
      user: id,
      noControl: [],
      nombre: [],
      apellidoP: [],
      apellidoM: [],
      fechaNacimiento: Date,
      curp: [],
      sexo: [],
      estadoCivil:[],
      calle: [],
      numero: [],
      colonia: [],
      cp: [],
      ciudad: [],
      municipio: [],
      estado: [],
      pais: [],
      carrera: [],
      
      celular:[],
      telefonoCasa: [],
      email: [],

      especialidad: [],
      titulado: [],
      edad: Number,
      mes_año_Egreso: [],
      

      calidadDocentes: [],
      planEstudios: [],
      oportunidadesInvestigacion: [],
      enfasisInvestigacion: [],
      infraestructura: [],
      residenciaProfesional: [],

      actividadActual: [],
      estudia: [],
      especialidad3: [],
      institucion: [],
      tiempoPrimerEmpleo: [],
      medioObtenerEmpleo: [],
      requisitosContratacion: [],
      idiomaExtranjero: [],
      hablar: [],
      escribir: [],
      leer:[],
      escuchar:[],
      antigüedadEmpleo: [],
      añoIngreso: [],
      ingresoSalarioMinimo: [],
      nivelJerarquico: [],
      condicionTrabajo: [],
      relacionTrabajo: [],
      giroEmpresa: [],
      actividadEmpresa: [],


    /* firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]*/
    }) 
    //console.log(this.studenForm);
  }

  get estudia(){
    console.log('entro getestudia')
    return this.studentForm.get('estudia');
  }
/*

  get nombre(){
    return this.studentForm.get('nombre');
  }
  get apellidoP(){
    return this.studentForm.get('apellidoP');
  }
  
  get apellidoM(){
    return this.studentForm.get('apellidoM');
  }

  get fechaNaciemiento(){
    return this.studentForm.get('fechaNaciemiento');
  }

  get curp(){
    return this.studentForm.get('curp');
  }

  get sexo(){
    return this.studentForm.get('sexo');
  }

  get calle(){
    return this.studentForm.get('calle');
  }

  get numero(){
    return this.studentForm.get('numero');
  }

  get edad(){
    return this.studentForm.get('edad');
  }

  get estadoCivil(){
    return this.studentForm.get('estadoCivil');
  }

  

  get user(){
    return this.actRoute.snapshot.paramMap.get('id');//this.authService.userData;
  }


  get calidadDocentes(){
    return this.studentForm.get('calidadDocentes');
  }

  get planEstudios(){
    return this.studentForm.get('planEstudios');
  }

  get oportunidadesInvestigacion(){
    return this.studentForm.get('oportunidadesInvestigacion');
  }
  get enfasisInvestigacion(){
    return this.studentForm.get('enfasisInvestigacion');
  }
  get infraestructura(){
    return this.studentForm.get('infraestructura');
  }
  get residenciaProfesional(){
    return this.studentForm.get('residenciaProfesional');
  }
  get actividadActual(){
    return this.studentForm.get('actividadActual');
  }
  get estudia(){
    return this.studentForm.get('estudia');
  }
  get especilidad3(){
    return this.studentForm.get('especilidad3');
  }
  get institucion(){
    return this.studentForm.get('institucion');
  }
*/
  // Reset student form's values
  ResetForm() {
    this.studentForm.reset();
  }  
  
  submitStudentData() {
    // console.log(this.studentForm.value);
    this.crudApi.UpdateStudent(this.studentForm.value); // Submit student data using CRUD API
    //this.toastr.success(this.studentForm.controls['firstName'].value + ' successfully added!'); // Show success message when data is successfully submited
    //this.ResetForm();  // Reset form when clicked on reset button
    };

}

