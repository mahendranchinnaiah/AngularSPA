import { Router } from '@angular/router';
import { User } from './../_models/user';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { error } from 'protractor';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
   bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private alerify: AlertifyService,
              private router: Router,  private fb: FormBuilder) { }

  ngOnInit() {

    this.bsConfig = {
       containerClass : 'theme-red'
    },
    this.createRegisterForm();
    /*
    this.registerForm = new FormGroup( {
        username: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
        confirmpassword: new FormControl('', Validators.required)
      }, this.passwordMatchValidator);
      */
  }
createRegisterForm() {
  this.registerForm = this.fb.group( {
      gender: ['male'],
      username: ['', Validators.required],
      knownas: ['', Validators.required],
      dateofbirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      confirmpassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator }
  );
}



  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmpassword').value ? null :
    { mismatch: true} ;
  }

  register() {
    if (!this.registerForm.valid) {
    this.user = Object.assign({}, this.registerForm.value);
    this.authService.register(this.user).subscribe( () => {
      this.alerify.success('Registration Successfull');
    }, error => {
      this.alerify.error(error);
    }, () => {
      this.authService.login(this.user).subscribe(() => {
        this.router.navigate(['/members']);
      });
    });
    // console.log(this.registerForm.value);
    /*
    this.authService.register(this.model).subscribe(
      () => { this.alerify.success('Register successfull');
    }
     , error => {
      this.alerify.error(error);
     }
    );
    */
    }
  }
  cancel() {
    this.alerify.message('cancelled');
    this.cancelRegister.emit(false);
  }
}
