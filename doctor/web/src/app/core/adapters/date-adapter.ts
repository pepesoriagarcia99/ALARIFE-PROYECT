import {Inject, Injectable, InjectionToken, Optional} from '@angular/core';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import moment from 'moment';
import {MomentFormatSpecification, MomentInput} from "moment";

/** Configurable options for {@see MomentDateAdapter}. */
export interface MatMomentDateAdapterOptions {
  /**
   * When enabled, the dates have to match the format exactly.
   * See https://momentjs.com/guides/#/parsing/strict-mode/.
   */
  strict?: boolean;

  /**
   * Turns the use of utc dates on or off.
   * Changing this will change how Angular Material components like DatePicker output dates.
   * {@default false}
   */
  useUtc?: boolean;
}

/** InjectionToken for moment date adapter to configure options. */
export const MAT_MOMENT_DATE_ADAPTER_OPTIONS = new InjectionToken<MatMomentDateAdapterOptions>(
  'MAT_MOMENT_DATE_ADAPTER_OPTIONS',
  {
    providedIn: 'root',
    factory: MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY,
  },
);

/** @docs-private */
export function MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY(): MatMomentDateAdapterOptions {
  return {
    useUtc: false,
  };
}

/** Creates an array and fills it with values. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}

/** Adapts Moment.js Dates for use with Angular Material. */
@Injectable()
export class AppDateAdapter extends DateAdapter<moment.Moment> {

  private _localeData?: {
    firstDayOfWeek: number;
    longMonths: string[];
    shortMonths: string[];
    dates: string[];
    longDaysOfWeek: string[];
    shortDaysOfWeek: string[];
    narrowDaysOfWeek: string[];
  } | undefined;

  constructor(
    @Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string,
    @Optional()
    @Inject(MAT_MOMENT_DATE_ADAPTER_OPTIONS)
    private _options?: MatMomentDateAdapterOptions,
  ) {
    super();
    this.setLocale(dateLocale || moment.locale());
  }

  override setLocale(locale: string) {
    super.setLocale(locale);

    let momentLocaleData = moment.localeData(locale);
    this._localeData = {
      firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
      longMonths: momentLocaleData.months(),
      shortMonths: momentLocaleData.monthsShort(),
      dates: range(31, i => this.createDate(2017, 0, i + 1).format('D')),
      longDaysOfWeek: momentLocaleData.weekdays(),
      shortDaysOfWeek: momentLocaleData.weekdaysShort(),
      narrowDaysOfWeek: momentLocaleData.weekdaysMin(),
    };
  }

  getYear(date: moment.Moment): number {
    return this.clone(date).year();
  }

  getMonth(date: moment.Moment): number {
    return this.clone(date).month();
  }

  getDate(date: moment.Moment): number {
    return this.clone(date).date();
  }

  getDayOfWeek(date: moment.Moment): number {
    return this.clone(date).day();
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    // Moment.js doesn't support narrow month names, so we just use short if narrow is requested.
    if(this._localeData === undefined) {
      return [];
    }

    return style == 'long' ? this._localeData?.longMonths : this._localeData?.shortMonths;
  }

  getDateNames(): string[] {
    return this._localeData?.dates || [];
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (style == 'long') {
      return this._localeData?.longDaysOfWeek || [];
    }
    if (style == 'short') {
      return this._localeData?.shortDaysOfWeek || [];
    }
    return this._localeData?.narrowDaysOfWeek || [];
  }

  getYearName(date: moment.Moment): string {
    return this.clone(date).format('YYYY');
  }

  getFirstDayOfWeek(): number {
    return this._localeData?.firstDayOfWeek || 0;
  }

  getNumDaysInMonth(date: moment.Moment): number {
    return this.clone(date).daysInMonth();
  }

  clone(date: moment.Moment): moment.Moment {
    return date.clone().locale(this.locale);
  }

  createDate(year: number, month: number, date: number): moment.Moment {
    const result = this._createMoment({year, month, date}).locale(this.locale);

    // If the result isn't valid, the date must have been out of bounds for this month.
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }

    return result;
  }

  today(): moment.Moment {
    return this._createMoment().locale(this.locale);
  }

  parse(value: any, parseFormat: string | string[]): moment.Moment | null {
    if (value && typeof value == 'string') {
      return this._createMoment(value, parseFormat, this.locale);
    }
    return value ? this._createMoment(value).locale(this.locale) : null;
  }

  format(date: moment.Moment, displayFormat: string): string {
    date = this.clone(date);
    if (!this.isValid(date)) {
      throw Error('MomentDateAdapter: Cannot format invalid date.');
    }
    return date.format(displayFormat);
  }

  addCalendarYears(date: moment.Moment, years: number): moment.Moment {
    return this.clone(date).add({years});
  }

  addCalendarMonths(date: moment.Moment, months: number): moment.Moment {
    return this.clone(date).add({months});
  }

  addCalendarDays(date: moment.Moment, days: number): moment.Moment {
    return this.clone(date).add({days});
  }

  toIso8601(date: moment.Moment): string {
    return this.clone(date).format();
  }

  /**
   * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
   * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
   * string into null. Returns an invalid date for all other values.
   */
  override deserialize(value: any): moment.Moment | null {
    let date;
    if (value instanceof Date) {
      date = this._createMoment(value).locale(this.locale);
    } else if (this.isDateInstance(value)) {
      // Note: assumes that cloning also sets the correct locale.
      return this.clone(value);
    }
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      date = this._createMoment(value, moment.ISO_8601).locale(this.locale);
    }
    if (date && this.isValid(date)) {
      return this._createMoment(date).locale(this.locale);
    }
    return super.deserialize(value);
  }

  isDateInstance(obj: any): boolean {
    return moment.isMoment(obj);
  }

  isValid(date: moment.Moment): boolean {
    return this.clone(date).isValid();
  }

  invalid(): moment.Moment {
    return moment.invalid();
  }

  /** Creates a Moment instance while respecting the current UTC settings. */
  private _createMoment(
    date?: MomentInput,
    format?: MomentFormatSpecification,
    locale?: string,
  ): moment.Moment {
    const {strict, useUtc}: MatMomentDateAdapterOptions = this._options || {};

    return useUtc ? moment.utc(date, format, locale, strict) : moment(date, format, locale, strict);
  }
}
