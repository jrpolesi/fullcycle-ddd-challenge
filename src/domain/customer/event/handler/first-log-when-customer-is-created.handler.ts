import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class FirstLogWhenUserIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(_: CustomerCreatedEvent): void {
    console.log("This is the first console.log of the event: CustomerCreated");
  }
}
