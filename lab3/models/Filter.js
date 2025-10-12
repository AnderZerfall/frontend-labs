export class Filter {
  constructor({ dateFrom = new Date(), dateTo = new Date(), time = "00:00" }) {
    if (dateFrom > dateTo) {
      throw new Error("Date from can not be bigger than Date to");
    }

    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.time = time;
  }
}
