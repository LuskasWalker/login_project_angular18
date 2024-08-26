import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj:any = {
    "EmailId" : "",
    "Password": ""
  };

  http = inject(HttpClient);

  constructor(private router:Router){

  }

  onLogin() {
    this.http.post("https://freeapi.miniprojectideas.com/api/User/Login", this.loginObj).subscribe((res:any) => {
      if (res.result) {
        localStorage.setItem("angular18Login", this.loginObj.User)
        this.router.navigateByUrl("dashboard")
      } else {
        const passwordBtn = document.getElementById('password-btn');
        if (passwordBtn) {
          passwordBtn.style.borderColor = "red";
          passwordBtn.addEventListener('focus', () => {
            passwordBtn.style.borderColor = "rgb(255, 255, 255)";
          });
        }
        const emailBtn = document.getElementById('email-btn');
        if (emailBtn) {
          emailBtn.style.borderColor = "red";
          emailBtn.addEventListener('focus', () => {
            emailBtn.style.borderColor = "rgb(255, 255, 255)";
          });
        }
      }
    })
  }

}
