import EventInterface from "../../@shared/event/event.interface";
import Customer from "../entity/customer";

type CustomerChangeAddressEventData = Pick<Customer, "id" | "name" | "Address">;

export default class CustomerChangeAddressEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: CustomerChangeAddressEventData;

  constructor(eventData: CustomerChangeAddressEventData) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
