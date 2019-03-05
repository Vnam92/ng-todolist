import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

import { IAuthCredentials } from "../../../shared/auth";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  private form: FormGroup;
  @Input() private firstBtnText: string;
  @Input() private secondBtnText: string;
  @Input() private formTitle: string;
  @Input() private errorMsg: string;
  @Output() private firstBtnClick: EventEmitter<Event> = new EventEmitter();
  @Output() private submitClick: EventEmitter<IAuthCredentials> = new EventEmitter();

  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.fbForm();
  }

  private fbForm(): void {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i),
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
      ]],
    })
  }

  onSubmit(): void {
    this.submitClick.emit({
      email: this.form.value.email.trim(),
      password: this.form.value.password,
    });
    this.form.markAsUntouched();
    this.form.markAsPristine();
  }

  onFirstBtnClick(): void {
    this.firstBtnClick.emit();
    this.form.markAsUntouched();
    this.form.markAsPristine();
    this.form.reset();
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }
}
