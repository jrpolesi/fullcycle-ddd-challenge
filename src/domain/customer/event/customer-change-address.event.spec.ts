import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerChangeAddressEvent from "./customer-change-address.event";

const NOW_DATE = new Date("2021-01-01");

describe("CustomerChangeAddressEvent", () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(NOW_DATE);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should create an instance of CustomerChangeAddressEvent", () => {
    const customer = new Customer("c2", "Customer 2");
    const address = new Address("Street 2", 2, "22222-222", "City 2");
    customer.changeAddress(address);

    const event = new CustomerChangeAddressEvent(customer);

    expect(event.eventData).toStrictEqual(customer);
    expect(event.dataTimeOccurred).toBeInstanceOf(Date);
    expect(event.dataTimeOccurred).toEqual(NOW_DATE);
  });
});
