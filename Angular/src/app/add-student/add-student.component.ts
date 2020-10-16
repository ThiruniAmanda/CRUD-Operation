import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Student } from '../student';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private studentservice:StudentService) { }

  student : Student=new Student();
  submitted = false;

  ngOnInit() {
    this.submitted=false;
  }

  studentsaveform=new FormGroup({
    student_name:new FormControl('' , [Validators.required ] ),
    student_email:new FormControl('',[Validators.required,Validators.email]),
    student_branch:new FormControl(),
    student_gpa:new FormControl('' , [Validators.required, Validators.max(4)]),
    student_contact:new FormControl('' , [Validators.required, Validators.maxLength(10) ] )
  });

  saveStudent(){
    this.student=new Student();   
    this.student.student_name=this.StudentName.value;
    this.student.student_email=this.StudentEmail.value;
    this.student.student_branch=this.StudentBranch.value;
    this.student.student_gpa=this.StudentGpa.value;
    this.student.student_contact=this.StudentContact.value;
    this.submitted = true;
    this.save();
    this.closeForm();
  }

  

  save() {
    this.studentservice.createStudent(this.student)
      .subscribe(data => console.log(data), error => console.log(error));
    this.student = new Student();
  }

  get StudentName(){
    return this.studentsaveform.get('student_name');
  }

  get StudentEmail(){
    return this.studentsaveform.get('student_email');
  }

  get StudentBranch(){
    return this.studentsaveform.get('student_branch');
  }

  get StudentGpa(){
    return this.studentsaveform.get('student_gpa');
  }

  get StudentContact(){
    return this.studentsaveform.get('student_contact');
  }

  closeForm(){
    this.submitted=false;
    this.studentsaveform.reset();
  }
}
