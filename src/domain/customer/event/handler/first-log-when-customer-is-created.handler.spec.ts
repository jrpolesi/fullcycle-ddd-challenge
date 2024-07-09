import Customer from "../../entity/customer";
import CustomerCreatedEvent from "../customer-created.event";
import FirstLogWhenUserIsCreatedHandler from "./first-log-when-customer-is-created.handler";

describe("FirstLogWhenUserIsCreatedHandler", () => {
  it("should log a message", () => {
    const handler = new FirstLogWhenUserIsCreatedHandler();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => void 0);

    const createCustomer = new Customer("c1", "Customer 1");
    handler.handle(new CustomerCreatedEvent(createCustomer));

    expect(consoleSpy).toHaveBeenCalledWith(
      "This is the first console.log of the event: CustomerCreated"
    );
  });
});
