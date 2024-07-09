import Customer from "../entity/customer";
import CustomerCreatedEvent from "./customer-created.event";

const NOW_DATE = new Date("2021-01-01");

describe("CustomerCreatedEvent", () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(NOW_DATE);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should create a new CustomerCreatedEvent instance", () => {
    const customer = new Customer("c1", "Customer 1");
    const event = new CustomerCreatedEvent(customer);

    expect(event.eventData).toStrictEqual(customer);
    expect(event.dataTimeOccurred).toBeInstanceOf(Date);
    expect(event.dataTimeOccurred).toStrictEqual(NOW_DATE);
  });
});
