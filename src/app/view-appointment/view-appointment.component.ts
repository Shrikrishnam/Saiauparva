import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppointmentService } from 'src/app/_services/appt.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Fitness } from 'src/app/model/fitness';


@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {

  @Output() fitnessdata = new EventEmitter<Fitness>();
  editForm: FormGroup;
  appts: Fitness[];
  appts2: Fitness[];
  inr_int: number;
  inr: number;
  paisa: number;
  packages: string;
  wpackage: string;
  price: string;
  id: number;
  apptId: string;
  idToDel: number;
  searchID: number;
  idPresent: number;

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
    private apptService: AppointmentService) { 
      this.apptService.listen().subscribe((m: any)=>{
        this.getfitness();
    })
    }
  ngOnInit() {
    this.getfitness();
    this.editForm = this.fb.group({
      id:[],
      firstname: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      lastname: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      phonenumber: ["", [Validators.required]],
      email: ["", [Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],
      streetaddress:["",[Validators.required, Validators.pattern("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")]],
      city:["",[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      state:["",[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      country:["",[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      pincode:["",[Validators.required]],
      physiotherapist:["",[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      packages:["",[Validators.required]],
      trainerpreference:["",[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      inr: ["",[Validators.required] ],
      paisa: ["",[Validators.required]],
      age: ["", [Validators.required]]
    });
    
  }
  
  getfitness() {
      this.apptService.getfitnessdata().subscribe((data) => {
        this.appts = data;
        this.appts2 = data;
      });
  }

  searchApp() {
    this.idPresent = 0;
    if(this.searchID == null) {
      this.getfitness();
    }
    this.appts2.forEach(appt => {
      if(appt.id == this.searchID){
        this.idPresent = 1;
      }
    });
  
    if(this.idPresent == 1){
      this.apptService.getUserById(this.searchID).subscribe((data) =>{
        this.appts = [data];
      });
    }
    else if(this.idPresent == 0){
      alert("No Appointment Found");
        this.getfitness();
    }
}
    

  editAppt(appt: Fitness) {
    
    localStorage.removeItem('editUserId');
    localStorage.setItem('editUserId', appt.id.toString());
    this.apptId = localStorage.getItem("editUserId");
    this.apptService.getUserById(+this.apptId).subscribe((data) => {
      this.editForm.setValue(data);
    });
  }

  deleteApp(appt: Fitness, doit: string ): void {
    if(doit == 'n'){
      this.idToDel = appt.id;
    }
    if(doit == 'y'){
      this.apptService.deleteAppointment(this.idToDel).subscribe((data) => {
        this.appts = this.appts.filter((u) => u !== appt);
         this.router.navigate(['view-appointment']); 
         this.apptService.filter('Delete click');
         window.location.reload();
     
     });
    }
  }

  updApp() {
    this.errorfirst = "";
    this.errorlast = "";
    this.errorage = "";
    this.errorphone = "";
    this.erroremail = "";
    this.errorstreet = "";
    this.errorcity = "";
    this.errorstate = "";
    this.errorcountry = "";
    this.errorpincode = "";

    this.wpackage = "";
    this.obj = { ...this.editForm.value, ...this.obj };
    this.editForm.value;
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.editForm.value",
      this.editForm.value
    );
    if (this.editForm.value.inr >= 500 && this.editForm.value.inr < 10000) {
      this.wpackage = "One time package!";
      this.inr = this.editForm.value.inr;
    }
    else if (this.editForm.value.inr >= 10000 && this.editForm.value.inr < 50000) {
      this.wpackage = "Monthly package!"
    } 
    else if (this.editForm.value.inr >= 50000 && this.editForm.value.inr < 90000) {
      this.wpackage = "Half Yearly Package!"
    } 
    else if (this.editForm.value.inr >= 90000) {
      this.wpackage = "Yearly Package!"
    } 
    if(this.editForm.value.paisa >= 100){
      this.editForm.value.inr += (this.editForm.value.paisa/100);
      this.editForm.value.paisa  = 0;
    }
    this.price = this.editForm.value.inr.toString()+"."+this.editForm.value.paisa.toString();


    if(this.editForm.value.packages == "500"){
      this.editForm.value.inr = 500;
      this.editForm.value.paisa = 60;
    }
    else if(this.editForm.value.packages == "10000"){
      this.editForm.value.inr = 10000;
      this.editForm.value.paisa = 70;
    }
    else if(this.editForm.value.packages == "50000"){
      this.editForm.value.inr = 50000;
      this.editForm.value.paisa = 80;
    }
    else if(this.editForm.value.packages == "90000"){
      this.editForm.value.inr = 90000;
      this.editForm.value.paisa = 80;
    }
   
       
    var alph = /^[A-Za-z]*$/;
    var alphnum = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(this.editForm.value.firstname == "" || 
    this.editForm.value.lastname == "" ||
    this.editForm.value.email == "" ||
    this.editForm.value.phonenumber.toString().length == 0 ||
    this.editForm.value.age.toString().length == 0 ||
    this.editForm.value.streetaddress == "" ||
    this.editForm.value.state == "" ||
    this.editForm.value.city == "" ||
    this.editForm.value.country == "" ||
    this.editForm.value.pincode.toString().length == 0 ||
    this.editForm.value.trainerpreference == "" ||
    this.editForm.value.physiotherapist == "" ||
    this.editForm.value.inr.toString().length == 0 ||
    this.editForm.value.paisa.toString().length == 0 ||
    this.editForm.value.packages == "" 
    ) {
      alert( "Fill in all fields!!  ");
    }
    if(!alph.test(this.editForm.value.firstname) || this.editForm.value.firstname == "" ) {
      this.errorfirst= "Enter Valid First Name!!  " ;
    }
    if(!alph.test(this.editForm.value.lastname) || this.editForm.value.lastname == "") {
      this.errorlast = "Enter Valid Last Name!! ";
    }
    if(!(re.test(this.editForm.value.email))) {
      this.erroremail = "Enter Valid Email ID!!  ";
    }
    if(this.editForm.value.phonenumber.toString().length != 10) {
      this.errorphone = "Enter phone number of 10 digits!!  ";
    }
    if(this.editForm.value.pincode.toString().length != 6) {
      this.errorpincode = "Enter pincode of 6 digits!!  ";
    }
    if(this.editForm.value.age < 18 || this.editForm.value.age > 60 ) {
      this.errorage = "Age should be between 18 and 60 years!!";
    }
    if(!alphnum.test(this.editForm.value.streetaddress) || this.editForm.value.streetaddress == "") {
      this.errorstreet = "Enter valid Street Address!!";
    }
    if(!alph.test(this.editForm.value.city) || this.editForm.value.city == ""){
      this.errorcity = "Enter a valid city name";
    }
    if(!alph.test(this.editForm.value.state) || this.editForm.value.state == "") {
      this.errorstate = "Enter a valid state name";
    }
    if(!alph.test(this.editForm.value.country) || this.editForm.value.country == ""){
      this.errorcountry = "Enter a valid country name";
    }
    
    if (this.editForm.valid) {
      this.fitnessdata.emit(
        new Fitness(
          this.editForm.value.inr,
          this.editForm.value.paisa,
          this.editForm.value.streetaddress,
          this.editForm.value.city,
          this.editForm.value.state,
          this.editForm.value.country,
          this.editForm.value.pincode,
          this.editForm.value.phonenumber,
          this.editForm.value.email,
          this.editForm.value.firstname,
          this.editForm.value.lastname,
          this.editForm.value.age,
          this.editForm.value.trainerpreference,
          this.editForm.value.physiotherapist,        
          this.editForm.value.packages,
          null
        )
      );
      this.apptService
        .updateAppointment(this.editForm.value)
        .pipe(first())
        .subscribe(
          (data) => {

            if(this.wpackage == "") {
              alert("No package is available at your quoted price! You can try our lowest priced - One time Package");
            }
            else{
              alert("For your quoted price - INR "+ this.price +" you can try our " + this.wpackage + ". Update again to get "+ this.wpackage);
            
            }
            alert("For the package you chose (Code : "+this.editForm.value.packages+") - Total price charged : INR "+ this.editForm.value.inr+"."+this.editForm.value.paisa);
            this.router.navigate(['view-appointment']); 
            this.apptService.filter('Edit click');
            window.location.reload();
          },
          (error) => {
            alert(error);
          }
        );
    }
    
  }
}
