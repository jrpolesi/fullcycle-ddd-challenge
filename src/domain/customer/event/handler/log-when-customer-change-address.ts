import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change-address.event";

export default class LogWhenCustomerChangeAddressHandler
  implements EventHandlerInterface
{
  handle(event: CustomerChangeAddressEvent): void {
    console.log(
      `Address of the customer: ${event.eventData.id}, ${event.eventData.name} changed to: ${event.eventData.Address.street}, ${event.eventData.Address.number} - ${event.eventData.Address.city}, ${event.eventData.Address.zip}`
    );
  }
}
