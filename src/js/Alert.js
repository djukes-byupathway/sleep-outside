export default class Alert {
  constructor(message) {
    this.message = message;
  }

  render() {
    console.log(this.message);
  }
}