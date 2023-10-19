import { Component, Inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-make-appointment-modal',
  templateUrl: './make-appointment-modal.component.html',
  styleUrls: ['./make-appointment-modal.component.scss']
})
export class MakeAppointmentModalComponent implements OnInit {
  comment: string = null;
  constructor(
    public dialogRef: MatDialogRef<MakeAppointmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  ngOnInit() {
    if (this.data) {
      this.comment = this.data
    }
  }



  submit() {
    const model = {
      result: true,
      comment: this.comment
    }
    this.dialogRef.close(model);
  }

}
