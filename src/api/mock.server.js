import { createServer, Model, RestSerializer } from "miragejs";
import faker from "faker";

faker.seed(111);

export default function mockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },

    models: {
      productList: Model,
      wishList: Model,
      cartList: Model
    },

    routes() {
      this.namespace = "api";
      this.timing = 1000;

      this.get("/product-list", (schema, request) => {
        return schema.productLists.all();
      });

      this.get("/wish-list", (schema, request) => {
        return schema.wishLists.all();
      });

      this.post("/wish-list", (schema, request) => {
        let attrs = JSON.parse(request.requestBody).product;
        return schema.wishLists.create(attrs);
      });

      this.del("/wish-list/:id", (schema, request) => {
        const productId = request.params.id;
        schema.wishLists.findBy({ productId: productId }).destroy();
        return productId;
      });

      this.get("/cart-list", (schema, request) => {
        return schema.cartLists.all();
      });

      this.post("/cart-list", (schema, request) => {
        let attrs = JSON.parse(request.requestBody).product;
        return schema.cartLists.create(attrs);
      });

      this.del("/cart-list/:id", (schema, request) => {
        const productId = request.params.id;
        schema.cartLists.findBy({ productId: productId }).destroy();
        return productId;
      });

      this.patch("/cart-list/:id", (schema, request) => {
        const productId = request.params.id;
        let attrs = JSON.parse(request.requestBody).product;
        return schema.cartLists.findBy({ productId: productId }).update(attrs);
      });
    },

    seeds(server) {
      [...Array(50)].forEach((_) => {
        server.create("productList", {
          productId: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          image: faker.random.image(),
          price: faker.commerce.price(),
          material: faker.commerce.productMaterial(),
          brand: faker.lorem.word(),
          inStock: faker.datatype.boolean(),
          fastDelivery: faker.datatype.boolean(),
          ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
          offer: faker.random.arrayElement([
            "Save 50",
            "70% bonanza",
            "Republic Day Sale"
          ]),
          idealFor: faker.random.arrayElement([
            "Men",
            "Women",
            "Girl",
            "Boy",
            "Senior"
          ]),
          level: faker.random.arrayElement([
            "beginner",
            "amateur",
            "intermediate",
            "advanced",
            "professional"
          ]),
          color: faker.commerce.color()
        });
      });
    }
  });
}
