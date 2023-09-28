import { Directive, ElementRef, Input, HostBinding, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAppointmentPosition]'
})
export class AppointmentPositionDirective implements OnInit {

  params: any[];

  constructor(private el: ElementRef, private render: Renderer2) {

  }

  ngOnInit() {
  }

  @Input()
  set appAppointmentPosition(param) {
    this.params = param;
    this.setAppointmentPosition();
    // this.setAppointmentHeight();
  }
  // appointment position
  setAppointmentPosition() {
    // const starße = (Number(splitedStartTime[0]) * 60) + Number(splitedStartTime[4]);
    this.el.nativeElement.style.top = (this.params[0] - 1) * 60 + 'px';
    const startDate = new Date(this.params[2]).setHours(0, 0, 0, 0);
    const date = new Date(this.params[1]).setHours(0, 0, 0, 0)
    var differenceInTime = new Date(date).getTime() - new Date(startDate).getTime();
    // To calculate the no. of days between two dates
    var differenceInDays = differenceInTime / (1000 * 3600 * 24);

    this.el.nativeElement.style.left = differenceInDays * 100 + 'px';
  }


  // // appointment height
  // setAppointmentHeight() {
  //   const diffTime = Math.abs(new Date(this.params[0]).getTime() - new Date(this.params[1]).getTime());  // 0->return Date   1  ->  pickupdate
  //   const dayDifference = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //   // const dayDifference = new Date(this.params[0]).getDate() - new Date(this.params[1]).getDate()
  //   const startTime = this.params[2];
  //   const endTime = this.params[3];
  //   const calendarHeight = this.params[4];
  //   const scheduleColumnWidth = this.params[5];
  //   const overlapCount = this.params[6] = 1;
  //   const appointmentPosition = this.params[7];
  //   // console.log(this.params, (new Date(this.params[0]).getTime() - new Date(this.params[1]).getTime()) / 1000)
  //   const splitedStartTime = startTime.split(':');
  //   const splitedEndTime = endTime.split(':');
  //   const calculatedMinute = calendarHeight / 24 / 60;
  //   const stTime = (Number(splitedStartTime[0]) * 60) + Number(splitedStartTime[1]);
  //   const enTime = (Number(splitedEndTime[0]) * 60) + Number(splitedEndTime[1]);
  //   // this.el.nativeElement.style.width = dayDifference * 150 + (splitedEndTime[0] - splitedStartTime[0])*150/24 + 'px';
  //   // this.el.nativeElement.style.height = '90px';
  //   const calendarStartDate = this.params[8];
  //   const calendarEndDate = this.params[9];
  //   const calEndDate = new Date(calendarEndDate);
  //   calEndDate.setHours(24, 0, 0, 0);
  //   const calStartDate = new Date(calendarStartDate);
  //   calStartDate.setHours(24, 0, 0, 0);

  //   let overlapWithEndDate = Math.abs(new Date(this.params[0]).getTime() - calEndDate.getTime())


  //   if (new Date(this.params[1]) < calendarStartDate) {
  //     this.el.nativeElement.style.left = '0px';
  //     const diff = Math.abs(new Date(calendarStartDate).getTime() - new Date(this.params[1]).getTime()) / 36e5;
  //     this.el.nativeElement.style.width = Math.abs(new Date(this.params[0]).getTime() - new Date(this.params[1]).getTime()) / 3600000 * 150 / 24 - diff * 150 / 24 + 'px';
  //   } else {

  //     if (new Date(this.params[0]) > calEndDate) {
  //       overlapWithEndDate = Math.abs(new Date(this.params[1]).getTime() - calEndDate.getTime()) / 3600000 * 150 / 24;
  //       this.el.nativeElement.style.width = overlapWithEndDate + 'px';
  //       const hourDiff = Math.abs(new Date(this.params[1]).getTime() - new Date(calendarStartDate).getTime()) / 36e5;
  //       this.el.nativeElement.style.left = hourDiff * 150 / 24 + 'px';
  //     } else {
  //       this.el.nativeElement.style.width = Math.abs(new Date(this.params[0]).getTime() - new Date(this.params[1]).getTime()) / 3600000 * 150 / 24 + 'px';
  //       const hourDiff = Math.abs(new Date(this.params[1]).getTime() - new Date(calendarStartDate).getTime()) / 36e5
  //       this.el.nativeElement.style.left = hourDiff * 150 / 24 + 'px';
  //     }

  //   }

  //   this.el.nativeElement.style.top = 90 * appointmentPosition + 'px'

  // }

}
