import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;

  constructor(private fb:FormBuilder, private router:Router, private toaster:ToastrService){
    this.loginForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    });
  }
  ngOnInit(): void {
    // this.handlePassword();
  }
  handlePassword() {
    let checkbox = document.getElementById('see');
    let passField = document.getElementById('pass');
    checkbox.addEventListener('click', ()=> {
      let value = passField.getAttribute('type');
      if (value == 'password') {
        passField.setAttribute('type', 'text');
      } else {
        passField.setAttribute('type', 'password');
      }
    });
  }

  login(){
    console.log(this.loginForm);
    
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    };
    this.router.navigate(['employe']);
    this.toaster.success('Login Successfully')
  }
}
