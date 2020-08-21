import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { AppointmentService } from 'src/app/_services/appt.service';
import { Router } from '@angular/router';
import { Fitness } from 'src/app/model/fitness';
@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html'
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {

  @Output() fitnessdata = new EventEmitter<Fitness>();
  fitnessForm: FormGroup;
  inr_int: number;
  inr: number;
  paisa: number;
  price: string;
  packages: string;
  wpackage: string;

  errorfirst: string;
  errorlast: string;
  errorage: string;
  errorstreet: string;
  errorcity: string;
  errorcountry: string;
  errorstate: string;
  errorpincode: string;
  erroremail: string;
  errorphone: string;
  
  
  public obj: any = {};
  constructor(private fb: FormBuilder, private router: Router,
    private apptService: AppointmentService) { }


  ngOnInit() {
    window.onload = function() { 
      document.getElementById("firstname").focus(); 
    } 
    
    this.fitnessForm = this.fb.group({
      firstname: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      lastname: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      phonenumber: ["", [Validators.required]],
      email: ["", [Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],
      streetaddress:["",[Validators.required, Validators.pattern("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")]],
      city:["",[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      state:["",[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      country:["",[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      pincode:["",[Validators.required]],
      physiotherapist:["",[Validators.required]],
      packages:["",[Validators.required]],
      trainerpreference:["",[Validators.required]],
      inr: ["", [Validators.required]],
      paisa: ["", [Validators.required]],
      age: ["", [Validators.required]],
      id: []
    });
  }

  onSubmit() {
    this.errorfirst = "";
    this.errorlast = "";
    this.errorage = "";
    this.errorpincode = "";
    this.erroremail = "";
    this.errorphone = "";
    this.wpackage = "";
    this.errorstreet = "";
    this.errorcity = "";
    this.errorstate = "";
    this.errorcountry = "";
    this.obj = { ...this.fitnessForm.value, ...this.obj };
    this.fitnessForm.value;
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.fitnessForm.value",
      this.fitnessForm.value
    );

    var alph = /^[A-Za-z]*$/;
    var alphnum = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(this.fitnessForm.value.firstname == "" || 
    this.fitnessForm.value.lastname == "" ||
    this.fitnessForm.value.email == "" ||
    this.fitnessForm.value.phonenumber.toString().length == 0 ||
    this.fitnessForm.value.age.toString().length == 0 ||
    this.fitnessForm.value.streetaddress == "" ||
    this.fitnessForm.value.state == "" ||
    this.fitnessForm.value.city == "" ||
    this.fitnessForm.value.country == "" ||
    this.fitnessForm.value.pincode.toString().length == 0 ||
    this.fitnessForm.value.trainerpreference == "" ||
    this.fitnessForm.value.physiotherapist == "" ||
    this.fitnessForm.value.inr.toString().length == 0 ||
    this.fitnessForm.value.paisa.toString().length == 0 ||
    this.fitnessForm.value.packages == "" 
    ) {
        alert( "Fill in all fields!!  ")
    }
    if(!alph.test(this.fitnessForm.value.firstname) || this.fitnessForm.value.firstname == "") {
      this.errorfirst = "Enter Valid First Name!!  " ;
    }
    if(!alph.test(this.fitnessForm.value.lastname) || this.fitnessForm.value.lastname == ""){
      this.errorlast = "Enter Valid Last Name!!  " ;
    }
    if(!(re.test(this.fitnessForm.value.email))) {
      this.erroremail = "Enter Valid Email ID!!  " ;
    }
    if(this.fitnessForm.value.phonenumber.toString().length != 10) {
      this.errorphone = "Enter phone number of 10 digits!!  ";
    }
    if(this.fitnessForm.value.pincode.toString().length != 6) {
      this.errorpincode = "Enter pincode of 6 digits!!  ";
    }
    if(this.fitnessForm.value.age < 18 || this.fitnessForm.value.age > 60 ) {
      this.errorage = "Age should be between 18 and 60 years!!";
    }
    if(!alphnum.test(this.fitnessForm.value.streetaddress) || this.fitnessForm.value.streetaddress == "") {
      this.errorstreet = "Enter valid Street Address!!";
    }
    if(!alph.test(this.fitnessForm.value.city) || this.fitnessForm.value.city == ""){
      this.errorcity = "Enter a valid city name";
    }
    if(!alph.test(this.fitnessForm.value.state) || this.fitnessForm.value.state == "") {
      this.errorstate = "Enter a valid state name";
    }
    if(!alph.test(this.fitnessForm.value.country) || this.fitnessForm.value.country == ""){
      this.errorcountry = "Enter a valid country name";
    }

    if (this.fitnessForm.value.inr >= 500 && this.fitnessForm.value.inr < 10000) {
      this.wpackage = "One time package!";
      this.inr = this.fitnessForm.value.inr;
    }
    else if (this.fitnessForm.value.inr >= 10000 && this.fitnessForm.value.inr < 50000) {
      this.wpackage = "Monthly package!"
    } 
    else if (this.fitnessForm.value.inr >= 50000 && this.fitnessForm.value.inr < 90000) {
      this.wpackage = "Half Yearly Package!"
    } 
    else if (this.fitnessForm.value.inr >= 90000) {
      this.wpackage = "Yearly Package!"
    } 
    if(this.fitnessForm.value.paisa >= 100){
      this.fitnessForm.value.inr += (this.fitnessForm.value.paisa/100);
      this.fitnessForm.value.paisa  = 0;
    }
    this.price = this.fitnessForm.value.inr.toString()+"."+this.fitnessForm.value.paisa.toString();
    

    if(this.fitnessForm.value.packages == "500"){
      this.fitnessForm.value.inr = 500;
      this.fitnessForm.value.paisa = 60;
    }
    else if(this.fitnessForm.value.packages == "10000"){
      this.fitnessForm.value.inr = 10000;
      this.fitnessForm.value.paisa = 70;
    }
    else if(this.fitnessForm.value.packages == "50000"){
      this.fitnessForm.value.inr = 50000;
      this.fitnessForm.value.paisa = 80;
    }
    else if(this.fitnessForm.value.packages == "90000"){
      this.fitnessForm.value.inr = 90000;
      this.fitnessForm.value.paisa = 80;
    }
    
   
    if (this.fitnessForm.valid) {
      this.fitnessdata.emit(
        new Fitness(
          this.fitnessForm.value.inr,
          this.fitnessForm.value.paisa,
          this.fitnessForm.value.streetaddress,
          this.fitnessForm.value.city,
          this.fitnessForm.value.state,
          this.fitnessForm.value.country,
          this.fitnessForm.value.pincode,
          this.fitnessForm.value.phonenumber,
          this.fitnessForm.value.email,
          this.fitnessForm.value.firstname,
          this.fitnessForm.value.lastname,
          this.fitnessForm.value.age,
          this.fitnessForm.value.trainerpreference,
          this.fitnessForm.value.physiotherapist,        
          this.fitnessForm.value.packages,
          null
        )
      );
      this.apptService.postfitnessdata(this.fitnessForm.value).subscribe((data) => {
        if(this.wpackage == "") {
          alert("No package is available at your quoted price! You can try our lowest priced - One time Package");
        }
        else{
          alert("For your quoted price - INR "+ this.price +" you can try our " + this.wpackage + ". Update later to get "+ this.wpackage);
        
        }
        alert("Your Appointment ID is "+ data.id +". For the package you chose (Code : "+this.fitnessForm.value.packages+") - Total price charged : INR "+ this.fitnessForm.value.inr+"."+this.fitnessForm.value.paisa);
        this.router.navigate(['view-appointment']); 
      });
    }
  }
    
}
