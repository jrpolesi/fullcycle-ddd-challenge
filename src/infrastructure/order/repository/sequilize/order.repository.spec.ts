import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";

async function createOrder(suffixCounter: number) {
  const customerRepository = new CustomerRepository();

  const customer = new Customer(
    `c-${suffixCounter}`,
    `Customer ${suffixCounter}`
  );
  const address = new Address(
    `Street ${suffixCounter}`,
    suffixCounter,
    `ZipCode ${suffixCounter}`,
    `City ${suffixCounter}`
  );
  customer.changeAddress(address);

  await customerRepository.create(customer);

  const productRepository = new ProductRepository();

  const product = new Product(
    `p-${suffixCounter}`,
    `Product ${suffixCounter}`,
    10 * suffixCounter
  );
  await productRepository.create(product);

  const orderItem = new OrderItem(
    `o_i-${suffixCounter}`,
    product.name,
    product.price,
    product.id,
    2 * suffixCounter
  );

  const order = new Order(`o-${suffixCounter}`, customer.id, [orderItem]);

  return {
    order,
    orderItem,
    customer,
  };
}

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const { order, orderItem } = await createOrder(1);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should find all orders", async () => {
    const orderRepository = new OrderRepository();

    const { order: order1 } = await createOrder(1);
    await orderRepository.create(order1);

    const { order: order2 } = await createOrder(2);
    await orderRepository.create(order2);

    const foundOrders = await orderRepository.findAll();
    const expectedOrders = [order1, order2];

    expect(foundOrders).toStrictEqual(expectedOrders);
  });

  it("should find an order", async () => {
    const { order } = await createOrder(1);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundOrder = await orderRepository.find(order.id);

    expect(foundOrder).toStrictEqual(order);
  });
});
