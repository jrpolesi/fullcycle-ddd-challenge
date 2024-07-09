import Customer from "../../entity/customer";
import Address from "../../value-object/address";
import CustomerChangeAddressEvent from "../customer-change-address.event";
import LogWhenCustomerChangeAddressHandler from "./log-when-customer-change-address";

describe("LogWhenCustomerChangeAddressHandler", () => {
  it("should log the address change", () => {
    const handler = new LogWhenCustomerChangeAddressHandler();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => void 0);;

    const customerUpdated = new Customer("c1", "Customer 1");
    const newAddress = new Address("Any street", 123, "19284-270", "São Paulo");
    customerUpdated.changeAddress(newAddress);
    handler.handle(new CustomerChangeAddressEvent(customerUpdated));

    expect(consoleSpy).toHaveBeenCalledWith(
      "Address of the customer: c1, Customer 1 changed to: Any street, 123 - São Paulo, 19284-270"
    );
  });
});
