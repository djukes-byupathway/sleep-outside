function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class Alert {
  constructor(path = "/json/alerts.json") {
    this.path = path;
  }

  getAlerts() {
    return fetch(this.path).then(convertToJson);
  }

  alertTemplate(alert) {
    return `<p style="background-color: ${alert.background}; color: ${alert.color}">${alert.message}</p>`;
  }

  async render() {
    const alerts = await this.getAlerts();

    if (!alerts || !alerts.length) {
      return;
    }

    const alertList = document.createElement("section");
    alertList.classList.add("alert-list");
    alertList.innerHTML = alerts
      .map((alert) => this.alertTemplate(alert))
      .join("");

    document.querySelector("main").prepend(alertList);
  }
}
