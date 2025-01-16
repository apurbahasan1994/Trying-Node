import Payment from "./events/payment.js";
import Marketting from "./observers/markettings.js";
import Shipment from "./observers/shipment.js";
import PaymentSubject from "./subjects/paymentSubject.js";

const subject = new PaymentSubject();

const marketting = new Marketting();

const shipment = new Shipment();

subject.subscribe(marketting);
subject.subscribe(shipment);

const payment = new Payment(subject);
payment.creditCrad({
    id : '0011',
    username : "Apurba",
    description : "Simple payment"
})