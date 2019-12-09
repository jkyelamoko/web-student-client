import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private studentservice: StudentService) { }

  student: Student = new Student();
  submitted = false;

  studentsaveform = new FormGroup({
    student_name: new FormControl('', [Validators.required , Validators.minLength(5)]),
    student_email: new FormControl('', [Validators.required, Validators.email]),
    student_branch: new FormControl()
  });

  saveStudent(saveStudent) {
    this.student = new Student();
    this.student.studentName = this.StudentName.value;
    this.student.studentEmail = this.StudentEmail.value;
    this.student.studentBranch = this.StudentBranch.value;
    this.submitted = true;
    this.save();
  }

  save() {
    this.studentservice.createStudent(this.student)
      .subscribe(data => console.log(data), error => console.log(error));
    this.student = new Student();
  }

  get StudentName() {
    return this.studentsaveform.get('studentName');
  }

  get StudentEmail() {
    return this.studentsaveform.get('studentEmail');
  }

  get StudentBranch() {
    return this.studentsaveform.get('studentBranch');
  }

  addStudentForm() {
    this.submitted = false;
    this.studentsaveform.reset();
  }

  ngOnInit() {
    this.submitted = false;
  }

}
