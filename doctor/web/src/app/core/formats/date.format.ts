import { MAT_NATIVE_DATE_FORMATS, MatDateFormats } from "@angular/material/core";

export const DATE_FORMATS: MatDateFormats = {
    ...MAT_NATIVE_DATE_FORMATS,
    parse: {
      dateInput: 'DD/MM/YYYY',
    },
    display: {
      monthYearLabel: 'MMM/YYYY',
      dateA11yLabel: 'DD',
      monthYearA11yLabel: 'MMMM/YYYY',
      monthLabel: 'MMMM',
      dateInput: 'DD/MM/YYYY',
    },
  };
