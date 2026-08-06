export default class Alert {
    constructor(
        alertPath = new URL("../json/alerts.json", import.meta.url),
        parentElement = document.querySelector("main"),
    ) {
        this.alertPath = alertPath;
        this.parentElement = parentElement;
    }

    async init() {
        try {
            const response = await fetch(this.alertPath);

            if (!response.ok) {
                throw new Error(`Unable to load alerts: ${response.status}`);
            }

            const alerts = await response.json();

            if (Array.isArray(alerts) && alerts.length > 0) {
                this.renderAlerts(alerts);
            }
        } catch (error) {
            console.error("Error loading alerts:", error);
        }
    }

    renderAlerts(alerts) {
        const alertSection = document.createElement("section");
        alertSection.classList.add("alert-list");

        alerts.forEach((alert) => {
            const alertParagraph = document.createElement("p");

            alertParagraph.textContent = alert.message;
            alertParagraph.style.backgroundColor = alert.background;
            alertParagraph.style.color = alert.color;

            alertSection.appendChild(alertParagraph);
        });

        this.parentElement.prepend(alertSection);
    }
}