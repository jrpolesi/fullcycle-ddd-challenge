import Customer from "../../entity/customer";
import CustomerCreatedEvent from "../customer-created.event";
import SecondLogWhenUserIsCreatedHandler from "./second-log-when-customer-is-created.handler";

describe("SecondLogWhenUserIsCreatedHandler", () => {
  it("should log a message", () => {
    const handler = new SecondLogWhenUserIsCreatedHandler();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => void 0);;

    const createCustomer = new Customer("c1", "Customer 1");
    handler.handle(new CustomerCreatedEvent(createCustomer));

    expect(consoleSpy).toHaveBeenCalledWith(
      "This is the second console.log of the event: CustomerCreated"
    );
  });
});
