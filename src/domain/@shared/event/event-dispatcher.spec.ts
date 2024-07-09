import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import EventDispatcher from "./event-dispatcher";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler1 = new MockEventHandler1();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    eventDispatcher.register("MockEvent", eventHandler1);

    expect(eventDispatcher.getEventHandlers["MockEvent"][0]).toMatchObject(
      eventHandler1
    );

    const eventHandler2 = new MockEventHandler2();
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    eventDispatcher.register("MockEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["MockEvent"][1]).toMatchObject(
      eventHandler2
    );

    const mockEvent = new MockEvent({
      key1: "value1",
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(mockEvent);

    expect(spyEventHandler1).toHaveBeenCalledWith(mockEvent);
    expect(spyEventHandler2).toHaveBeenCalledWith(mockEvent);
  });
});

class MockEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}

class MockEventHandler1 implements EventHandlerInterface {
  handle(_: EventInterface): void {}
}

class MockEventHandler2 implements EventHandlerInterface {
  handle(_: EventInterface): void {}
}
