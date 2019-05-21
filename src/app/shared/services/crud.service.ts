
import { Injectable } from '@angular/core';

import { Student } from '../services/student';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  studentsRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  studentRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too

  constructor(
    private db: AngularFireDatabase
    ) { 

      
    }

    AddStudent(student: Student) {
      this.studentsRef = this.db.list('student-list');
      this.studentsRef.push({
        noControl: student.noControl,
        nombre: student.nombre,
        apellidoP: student.apellidoP,
        apellidoM: student.apellidoM,
        edad: student.edad,
        us: student.user
      })
     }

     // Fetch Single Student Object
    GetStudent(id: string) {
      this.studentRef = this.db.object('students-list/' + id);
      return this.studentRef;
    }


    // Fetch Single Student Object
    GetStudentM(id: string) {
      //this.studentsRef = this.db.list('student-list');
      this.studentsRef = this.db.list('student-list', ref => ref.orderByChild('uid').equalTo(id));
      return this.studentsRef;
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
