import { useState, useEffect } from "react";
import axios from "axios";

export default function Alerts() {
  const [items, setItems] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const sendEmail = async () => {
    const emailData = {
      to: "akshit.1422@gmail.com",
      subject: "Items to restock",
      text: "test mail",
    html: `
    <html>
    <body>
        <h2>Items to Restock</h2>
        <ul style="list-style-type: none; padding: 0;">
            ${alerts.map(alert => `
                <li style="background-color: #ffffff; padding: 10px; margin-bottom: 10px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <p style="font-size: 16px; font-weight: bold;">Name: ${alert.name}</p>
                    <p style="font-size: 16px;">PL: ${alert.pl}</p>
                    <p style="font-size: 16px;">Quantity Remaining: ${alert.netQuantity}</p>
                </li>
            `).join('')}
        </ul>
    </body>
    </html>
`
    };

    try {
      const response = await fetch("http://localhost:5000/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log("Email sent successfully!");
        // Handle success
      } else {
        console.error("Failed to send email.");
        // Handle failure
      }
    } catch (error) {
      console.error("Error sending email:", error);
      // Handle error
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/api/items");
        setItems(response.data);
        const alertItems = response.data.filter(
          (item) => item.netQuantity < item.threshold
        );
        setAlerts(alertItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className=" p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          ALERTS (Need to be restocked)
        </h1>
        {alerts.length > 0 ? (
          <ul className="space-y-4">
            {alerts.map((alert) => (
              <li
                key={alert._id.$oid}
                className="p-4 bg-white shadow rounded-md"
              >
                <p className="text-lg">
                  <span className="font-semibold">Name:</span> {alert.name}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">PL:</span> {alert.pl}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Quantity Remaining:</span>{" "}
                  {alert.netQuantity}
                </p>
              </li>
            ))}
            <button onClick={sendEmail}>Send Restock Mail</button>
          </ul>
        ) : (
          <p className="text-lg text-center text-gray-600">
            No alerts. All items are above their threshold quantities.
          </p>
        )}
      </div>
    </div>
  );
}
