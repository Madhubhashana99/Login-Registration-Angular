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

  /*onSubmit() {
    this.loginService.login(this.email, this.password)
      .subscribe(
        (response) => {
          const token = response.token;
        localStorage.setItem('token', token);
          
          // Getting the user role
          this.loginService.getUserRole().subscribe(
            (role) => {

              // Navigate to specific dashboard based on the role
              switch (role) {
                case 'ADMIN':
                  this.router.navigate(['/system-admin-dash']);
                  break;
                case 'PURCHASE_COORDINATOR':
                  this.router.navigate(['/purchase-coordinator-dash']);
                  break;
                case 'INVENTORY_ADMIN':
                  this.router.navigate(['/inventory-ad-dash']);
                  break;
                case 'STOCK_MANAGER':
                  this.router.navigate(['/stock-manager-dash']);
                  break;
                case 'STOCK_KEEPER':
                  this.router.navigate(['/stock-keeper-dash']);
                  break;
                case 'DESIGNER':
                  this.router.navigate(['/designer']);
                  break;
                case 'SHOWROOM_MANAGER':
                  this.router.navigate(['/showroom']);
                  break;
                default:
                  this.router.navigate(['/']);
                  break;
              }
            }
          );
        },
        (error) => {
          if (error.status === 401) {
            this.error = 'Please enter valid credentials.';
          } else {
            this.error = 'Invalid email or password.';
          }
        }
      );
  }
  getUserRole() {
    throw new Error('Method not implemented.');
  }


  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }*/
}
