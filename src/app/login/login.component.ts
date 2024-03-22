import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { User } from '../data-types/user.data';
import { CookieService } from 'ngx-cookie-service';
// import { JwtServiceService } from '../services/jwt-service.service';
// import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  email !: String;
  password !: String;
  userFound: boolean = true;

  constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService,
    // private jwtService: JwtServiceService, private httpService: HttpService
    ) { }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    
    
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  getUserRole(): string {
    const currentUserString = sessionStorage.getItem('currentUser');
    if (!currentUserString) {
      return 'null';
    }
    const currentUser = JSON.parse(currentUserString)
    if (currentUser && currentUser.user && currentUser.user.hasOwnProperty('role')) {
      return currentUser.user.role;
    } else {
      return 'null';
    }
  }


  onSubmit() {

    console.log("da")

    this.email = this.loginForm.get('email')?.value
    this.password = this.loginForm.get('password')?.value


    

    this.loginService.login<User>(this.loginForm.value).subscribe({
      next: () => {
       

        let userRole !: string;
        userRole = this.getUserRole()
       
        if (userRole == null) {
        
          this.userFound = false;
        } else {
            if (userRole == "admin") {
              this.router.navigate(['/'], { queryParams: { role: userRole }})
            } else if (userRole == "client") {
              this.router.navigate(['/'],  { queryParams: { role: userRole }})
            } else {
              console.log("User has no specific role!")
            }
        }

      },
      error: (error) => {
        this.userFound = false;
      }
    }
    );

  }
}

