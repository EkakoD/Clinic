import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, finalize } from 'rxjs';
import { InfoSnackBarComponent } from 'src/app/core/component/info-snack-bar/info-snack-bar.component';
import { AppointmentsService } from 'src/app/core/service/appointments/appointments.service';
import { environment } from 'src/environments/environment';
import { AppointmentTimesModel } from '../../model/appointment/appointment.model';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {
  env = environment;
  calendarWrapper: any;
  @ViewChild('calendarWrapper')
  set calendarWrapperContent(content: ElementRef) {
    if (content) {
      this.calendarWrapper = content;
      this.calendarHeight = this.calendarWrapper.nativeElement.offsetWidth;

      this.cdRef.detectChanges();
    }
  }

  @ViewChild('toolbarWrapper') toolbarWrapper: any;

  scheduleWrapper: any;
  @ViewChild('scheduleColumnWrapper')
  set scheduleColumnWrapperContent(content: ElementRef) {
    if (content) {
      this.scheduleWrapper = content;
      this.scheduleColumnWidth = this.scheduleWrapper.nativeElement.offsetWidth;
      this.cdRef.detectChanges();

    }
  }

  @ViewChild('BottomPannelLayer') bottomPanel: ElementRef;
  @ViewChild('timeDisplay') timeDisplay: ElementRef;
  @ViewChild('calendarLayer') calendarLayer: ElementRef;


  days = ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'];
  months = ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი']
  id: number;
  userRole: string;

  timeList = [];
  timeLists = [];
  calendarHeight = 0;
  scheduleColumnWidth = 0;
  calendarDate = new Date();

  appointments = [];
  appointmentTimes: AppointmentTimesModel[] = [];
  // channelEnum = AppointmentChannelEnum;
  range: FormGroup;
  toolbarMenu: any;



  loadingFlag = 0;
  firstLoad = true;


  // toltip გადასახედია მინდა თუ არა
  positionY: number;
  positionX: number;
  scrollEvent = new Subject();
  currentMonth: string;
  currentYear: number;
  constructor(
    private cdRef: ChangeDetectorRef,
    // private router: Router,
    // public dateUtilitiesService: DateUtilitiesService, არ ვიცი ზუსტად მინდა თუ არა
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private appointmentsService: AppointmentsService,
    private route: ActivatedRoute
  ) {
    this.id = parseFloat(this.route.snapshot.paramMap.get('id'));
    this.userRole = localStorage.getItem("role");
    this.calendarDate.setHours(0, 0, 0, 0);
    this.currentMonth = this.months[this.calendarDate.getMonth()];
    this.currentYear = this.calendarDate.getFullYear();
    this.range = new FormGroup({
      start: new FormControl<Date | null>(this.calendarDate),
      end: new FormControl<Date | null>(new Date(this.calendarDate.getTime() + 1000 * 60 * 60 * 24 * 7))
    });
    this.getAppointmentTimes();
    this.getCalendar();

  }

  ngOnInit() {
    var start = this.calendarDate;
    // const end = new Date(this.range.value.end).getDate();
    // draw calendar
    console.log(this.id, this.userRole);
    console.log(this.timeLists)
    this.timeLists = this.getDatesInRange(this.range.value.start, this.range.value.end);

  }

  getAppointmentTimes() {
    this.appointmentsService.getAppointmentTimes()
      .subscribe(res => {
        this.appointmentTimes = res.data;
        console.log(this.appointmentTimes);

      });

  }
  getDatesInRange(startDate, endDate) {
    let start = new Date(startDate);
    let dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(
        {
          date: start.getDate(),
          day: this.days[start.getDay()]
        }
      );
      start = new Date(start.getTime() + 1000 * 60 * 60 * 24);

    }
    // const dates = [];

    //   while (date <= new Date(endDate)) {
    //    dates.push(new Date(date));
    //    date.setDate(date.getDate() + 1);
    //  }
    return dates;
  }

  // scroll
  calendarScrollX(event: any, elemnt: HTMLElement) {
    this.calendarWrapper.nativeElement.scrollLeft = this.calendarLayer.nativeElement.scrollLeft = this.timeDisplay.nativeElement.scrollLeft = event.target.scrollLeft;
    const timeWrapper = document.getElementsByClassName('time-display-wrapper')[0];
    timeWrapper.scrollLeft = event.target.scrollLeft;
  }

  getCalendar() {
    const start = this.dateToString(this.range.value.start);
    const end = this.dateToString(this.range.value.end);
    this.loadingFlag++;
    this.appointmentsService.getAppointmentForCalendar(start, end, null,)
      .pipe(
        finalize(() => this.loadingFlag--))
      .subscribe(res => {
        this.appointments = res.data
        console.log(this.appointments);

      });

  }

  nextMonth(index: number) {
    if (index == this.months.length - 1) {
      index = -1;
      this.currentYear = this.currentYear + 1;
    }
    this.currentMonth = this.months[index + 1];
    const startDate = new Date(this.range.get('start').value)
    this.range.get('start').setValue(new Date(this.currentYear, index + 1, startDate.getDate()));
    this.range.get('end').setValue(new Date(this.currentYear, index + 1, startDate.getDate()).getTime() + 1000 * 60 * 60 * 24 * 7)
    this.timeLists = this.getDatesInRange(this.range.value.start, this.range.value.end);

    this.getCalendar();

  }
  prevMonth(index: number) {
    if (index == 0) {
      index = this.months.length;
      this.currentYear = this.currentYear - 1;

    }
    this.currentMonth = this.months[index - 1];
    const startDate = new Date(this.range.get('start').value)
    // const year =
    this.range.get('start').setValue(new Date(this.currentYear, index - 1, startDate.getDate()));
    this.range.get('end').setValue(new Date(this.currentYear, index - 1, startDate.getDate()).getTime() + 1000 * 60 * 60 * 24 * 7)
    this.timeLists = this.getDatesInRange(this.range.value.start, this.range.value.end);

    this.getCalendar();

  }

  nextWeek() {

    let date = this.range.value.start;

    this.range.get('start').setValue(new Date(date.getTime() + 1000 * 60 * 60 * 24 * 7));
    this.range.get('end').setValue(new Date(date.getTime() + 1000 * 60 * 60 * 24 * 14))
    this.currentMonth = this.months[new Date(this.range.get('start').value).getMonth()];
    this.currentYear = new Date(this.range.get('start').value).getFullYear();
    this.timeLists = this.getDatesInRange(this.range.value.start, this.range.value.end);
    this.getCalendar();

  }
  prevWeek() {
    this.currentYear
    let date = this.range.value.start;

    this.range.get('start').setValue(new Date(date.getTime() - 1000 * 60 * 60 * 24 * 7));
    this.range.get('end').setValue(new Date(date.getTime() - 1000 * 60 * 60 * 24 * 14))
    this.currentMonth = this.months[new Date(this.range.get('start').value).getMonth()];
    this.currentYear = new Date(this.range.get('start').value).getFullYear();
    this.timeLists = this.getDatesInRange(this.range.value.start, this.range.value.end);
    this.getCalendar();
  }


  // draw  and get calendar on date change
  filterByDate(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    if (dateRangeEnd.value) {
      this.loadingFlag--;
      this.timeList = this.getDatesInRange(this.range.value.start, this.range.value.end);
      this.calendarLayer.nativeElement.scrollLeft = this.timeDisplay.nativeElement.scrollLeft = 0;
      const timeWrapper = document.getElementsByClassName('time-display-wrapper')[0];
      timeWrapper.scrollLeft = 0;
      this.getCalendar();
    } else {
      this.loadingFlag++;
    }
  }


  trackByTimeId(item: any) {
    return item.timeId;
  }

  trackByDate(item: any) {
    return item.date;
  }

  trackByAppointmentId(item: any) {
    return item.id;
  }



  // tooltip event
  toolTipEvent(e: { x: number, y: number }) {
    this.positionX = e.x;
    this.positionY = e.y;
  }
  dateToString(date: Date) {

    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }

    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');

  }

  snackbarAdapter(msg: string, success: boolean) {

    const statusClass = success ? 'success-snackbar' : 'error-snackbar';

    this.snackBar.openFromComponent(InfoSnackBarComponent, {
      data: `<i class="fal fa-info-circle mr-2"></i> ${msg}`,
      duration: 5 * 1000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar', statusClass]
    });

  }
}
