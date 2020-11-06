import {Component, OnChanges, OnInit} from '@angular/core';
import {SchedulerEvent, CreateFormGroupArgs} from '@progress/kendo-angular-scheduler';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { sampleData, displayDate } from './events-utc';

import '@progress/kendo-date-math/tz/regions/Europe';
import {EditService} from './edit.service';
@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit, OnChanges {
  public events: SchedulerEvent[] = sampleData;
  public formGroup: FormGroup;
  public selectedDate: Date = new Date('2013-06-10T00:00:00');

  constructor(private formBuilder: FormBuilder,
              public editService: EditService
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);

  }

  ngOnInit(): void {
    this.editService.read();
  }
  ngOnChanges(events: any): void {
    console.log('ddede');
  }
  public createFormGroup = (args: CreateFormGroupArgs): FormGroup => {
    const dataItem = args.dataItem;

    this.formGroup = this.formBuilder.group({
      'TaskID': args.isNew ? 0 : dataItem.TaskID,
      'Start': [dataItem.Start, Validators.required],
      'End': [dataItem.End, Validators.required],
      'StartTimezone': [dataItem.StartTimezone],
      'EndTimezone': [dataItem.EndTimezone],
      'IsAllDay': dataItem.IsAllDay,
      'Title': dataItem.Title,
      'Description': dataItem.Description,
      'RecurrenceRule': dataItem.RecurrenceRule,
      'RecurrenceID': dataItem.RecurrenceID
    });

    return this.formGroup;
  }


}

