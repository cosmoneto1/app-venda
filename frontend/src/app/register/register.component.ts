import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MobileService } from '../_services/mobile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  mobileForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  mob: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private ms: MobileService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.mobileForm = this.formBuilder.group({
      model: ['', Validators.required],
      price: ['', Validators.required],
      brand: ['', Validators.required],
      photo: ['', Validators.required]
    });
    moment.locale('pt-br');
  }

  get f() { return this.mobileForm.controls; }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.mobileForm.invalid) {
      return;
    }

    this.loading = true;
    this.mob.date = moment().format('L');
    this.mob.code = this.uuidv4();

    this.ms.createItem(this.mob)
      .then((result) => {
        this.mob = {};
        this.loading = false;
        this.mobileForm.reset();
        this.submitted = false;
        this.toastr.success('Salvo com sucesso!', 'Cadastro');
      }).catch((err) => {
        console.log(err);
        this.loading = false;
        this.toastr.error(err, 'Error');
      });

  }

}

