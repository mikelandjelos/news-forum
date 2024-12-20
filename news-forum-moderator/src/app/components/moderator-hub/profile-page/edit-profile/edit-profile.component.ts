import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Moderator } from '../../../../models/moderator.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RadioButtonModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit {
  editProfileForm!: FormGroup;
  readonly initialModerator!: Moderator;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly config: DynamicDialogConfig,
    private readonly selfRef: DynamicDialogRef
  ) {
    this.initialModerator = Object.freeze(this.config.data);
  }

  ngOnInit(): void {
    const moderator: Moderator = this.config.data;

    this.editProfileForm = this.formBuilder.group({
      firstName: [moderator.firstName, []],
      lastName: [moderator.lastName, []],
      email: [moderator.email, [Validators.email]],
      age: [moderator.age, [Validators.min(0)]],
      gender: [moderator.gender, []],
    });
  }

  saveChanges() {
    if (this.editProfileForm.valid) {
      const dirtyControls: Partial<Omit<Moderator, 'password'>> = Object.keys(
        this.editProfileForm.controls
      )
        .filter((key) => this.editProfileForm.get(key)?.dirty)
        .reduce(
          (acc, key) => ({
            ...acc,
            [key]: this.editProfileForm.get(key)?.value,
          }),
          {}
        );

      console.log(dirtyControls);

      this.selfRef.close(dirtyControls);
    }
  }
}
