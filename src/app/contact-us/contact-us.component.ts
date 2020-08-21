import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppointmentService } from 'src/app/_services/appt.service';
import { Router } from '@angular/router';
import { Contact } from 'src/app/model/contact';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html'
})
export class ContactUsComponent implements OnInit {
  @Output() contactdata = new EventEmitter<Contact>();
  contactForm: FormGroup;
  errorfirst: string;
  errorlast: string;
  errorphone: string;
  erroremail: string;
  public obj: any = {};
  constructor(private fb: FormBuilder,
    private apptService: AppointmentService, private router: Router) { }


  ngOnInit() {
    this.contactForm = this.fb.group({
      firstname: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      lastname: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      phonenumber: ["", [Validators.required]],
      email: ["", [Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],
      message:["",[Validators.required]]
    });
  }

  onSubmit() {
    this.errorfirst = "";
    this.errorlast = "";
    this.errorphone = "";
    this.erroremail = "";
    this.obj = { ...this.contactForm.value, ...this.obj };
    this.contactForm.value;
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.contactForm.value",
      this.contactForm.value
    );
    var alph = /^[A-Za-z]*$/;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(this.contactForm.value.firstname == "" || 
    this.contactForm.value.lastname == "" ||
    this.contactForm.value.email == "" ||
    this.contactForm.value.message == "") {
      alert( "Fill in all fields!!  ");
    }
    if(!alph.test(this.contactForm.value.firstname)  || this.contactForm.value.firstname == ""  ) {
      this.errorfirst = "Enter Valid First Name!!  " ;
    }
    if(!alph.test(this.contactForm.value.lastname) || this.contactForm.value.lastname == ""){
      this.errorlast = "Enter Valid Last Name!!  "
    }

    if(!(re.test(this.contactForm.value.email))) {
      this.erroremail = "Enter Valid Email ID!!  " ;
    }
    if(this.contactForm.value.phonenumber.toString().length != 10) {
      this.errorphone = "Enter phone number of 10 digits!!  ";
    }
    else if (this.contactForm.valid ){
      this.contactdata.emit(
        new Contact(
          this.contactForm.value.firstname,
          this.contactForm.value.lastname,
          this.contactForm.value.phonenumber,
          this.contactForm.value.email,
          this.contactForm.value.message
        )
      );
      this.apptService.createComment(this.contactForm.value).subscribe((data) => {
        
      });
      this.router.navigate(['landing-page']);
    }
    
  }
}
