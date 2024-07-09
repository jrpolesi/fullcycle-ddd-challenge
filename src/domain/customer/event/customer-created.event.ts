import EventInterface from "../../@shared/event/event.interface";
import Customer from "../entity/customer";

export type CustomerCreatedEventData = Pick<Customer, "id" | "name">;

export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: CustomerCreatedEventData;

  constructor(eventData: CustomerCreatedEventData) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
