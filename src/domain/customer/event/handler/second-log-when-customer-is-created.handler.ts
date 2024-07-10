import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SecondLogWhenUserIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(_: CustomerCreatedEvent): void {
    console.log("This is the second console.log of the event: CustomerCreated");
  }
}
