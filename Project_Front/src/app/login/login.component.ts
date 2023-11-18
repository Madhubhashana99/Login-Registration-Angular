import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email='';
  password='';
  error='';
  

  constructor(private loginService: LoginService,private router:Router){}


  onSubmit(){
    this.loginService.login(this.email,this.password).subscribe(
      (Response)=>{
        const token = Response.token;
        localStorage.setItem('token',token);

        //Getting the user roles
        this.loginService.getUserRole().subscribe(
          (role)=>{
            switch(role){
              case 'ADMIN':
                this.router.navigate(['/admindash']);
                break;
              case 'USER':
                this.router.navigate(['/userdash']);
                break;
              default:
                this.router.navigate(['/']);
                break;
            }
          }
        );
      },

      (error)=>{
        if(error.status === 401){
          this.error = "Please enter vaid credentials";
        }else{
          this.error = "Invalid email or password";
        }
      }

    );
  }

  getUserRole(){
    throw new Error('Method not implemened');
  }

  onLogout(){
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
