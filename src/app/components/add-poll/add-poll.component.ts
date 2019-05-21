import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr

import { CrudService } from '../../shared/services/crud.service';


import { AuthService } from "../../shared/services/auth.service";
import { ConditionalExpr } from '@angular/compiler';
import { AngularFireList } from '@angular/fire/database';
//import { CrudService } from "../../shared/services/crud.service";

@Component({
  selector: 'app-add-poll',
  templateUrl: './add-poll.component.html',
  styleUrls: ['./add-poll.component.css']
})
export class AddPollComponent implements OnInit {

  public studentForm: FormGroup;  // Define FormGroup to student's form
  public items: AngularFireList<any>;

  constructor(
    public crudApi: CrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService,  // Toastr service for alert message

    public authService: AuthService,
    public crudService: CrudService
  ) {
    const id = this.authService.userData.uid;
    /*this.items = this.crudApi.GetStudentM(id);
    console.log(this.items);*/
    this.items = this.crudApi.GetStudentM(id)
   }

  ngOnInit() {
    
    //this.crudApi.GetStudentsList();  // Call GetStudentsList() before main form is being called
    this.studenForm();              // Call student form when component is ready
    //this.crudApi.GetStudent(this.authService.userData.uid);
    //const id = this.authService.userData.uid;
    //console.log(id);
    //this.items = this.crudApi.GetStudentM(id)

    //console.log();

  }

  // Reactive student form
  studenForm() {
    const id= this.authService.userData.uid;
    this.items = this.crudApi.GetStudentM(id);
    console.log(this.items);
    this.studentForm = this.fb.group({
      noControl: this.authService.userData.uid,
      nombre: [],
      apellidoP:[],
      apellidoM:[],
      edad:[],
      user:[]

    /* firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]*/
    }) 
    //console.log(this.studenForm);
  }

  get noControl(){
    return this.studentForm.get(this.authService.userData);
  }
  get nombre(){
    return this.studentForm.get('nombre');
  }
  get apellidoP(){
    return this.studentForm.get('apellidoP');
  }
  
  get apellidoM(){
    return this.studentForm.get('apellidoM');
  }

  
  get edad(){
    return this.studentForm.get('edad');
  }

  get user(){
    return this.authService.userData;
  }

  // Reset student form's values
  ResetForm() {
    this.studentForm.reset();
  }  
  
  submitStudentData() {
    // console.log(this.studentForm.value);
    this.crudApi.AddStudent(this.studentForm.value); // Submit student data using CRUD API
    //this.toastr.success(this.studentForm.controls['firstName'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
    };

}
