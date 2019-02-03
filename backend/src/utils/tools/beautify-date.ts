export default class BeautifyDate {
  static beautify(dateN: number) {
    const date = new Date(dateN);
    return (
      date.getMonth() +
      1 +
      '/' +
      date.getDate() +
      '/' +
      date.getFullYear() +
      ',' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds()
    );
  }
}
