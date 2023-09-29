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



}
