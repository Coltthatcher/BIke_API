export default class TimeConversions{
  constructor(unixTime) {
    this.date = new Date(unixTime * 1000)
    this.dayOfMonth = this.date.getDate();
    this.month = this.date.getMonth() +1;
    this.year = this.date.getFullYear();
  }
  formatTime() {
    return `${this.month}/${this.dayOfMonth}/${this.year}`;
  }
}




