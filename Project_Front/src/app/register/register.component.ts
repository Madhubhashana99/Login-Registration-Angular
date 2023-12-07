import { Component } from '@angular/core';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userDetails: any = {}

  constructor(private registerService: RegisterService){}

  register(){
    this.registerService.register(this.userDetails).subscribe(
      (response)=>{
        alert("Registered Successfully");
        console.log('Register successfull:',response);
      }
    )
  }
}
