

/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor() { }
}
*/


import { Injectable } from '@angular/core';

import { Student } from './student';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  studentsRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  studentRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too

  constructor(
    private db: AngularFireDatabase
    ) { }

    AddStudent(student: Student) {
      this.studentsRef.push({
      noControl: student.noControl,
      nombre: student.nombre,
      apellidoP: student.apellidoP,
      apellidoM: student.apellidoM,
      edad: student.edad
      })
     }

     // Fetch Single Student Object
    GetStudent(id: string) {
      this.studentRef = this.db.object('students-list/' + id);
      return this.studentRef;
    }

    // Fetch Students List
    GetStudentsList() {
      this.studentsRef = this.db.list('students-list');
      return this.studentsRef;
    }  



      // Update Student Object
  UpdateStudent(student: Student) {
    this.studentRef.update({
      noControl: student.noControl,
      nombre: student.nombre,
      apellidoP: student.apellidoP,
      apellidoM: student.apellidoM,
      edad: student.edad
    })
  }  

  // Delete Student Object
  DeleteStudent(id: string) { 
    this.studentRef = this.db.object('students-list/'+id);
    this.studentRef.remove();
  }

}
