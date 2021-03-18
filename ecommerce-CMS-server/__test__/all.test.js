const request = require("supertest");
const app = require("../app");
const { User, Product } = require("../models");
// Login -> POST /login
const { hash, compare } = require("../helpers/bcrypt");
const { decoded } = require("../helpers/jwt");

// LOGIN TESTING

describe("Login testing", () => {
  describe("Succes Login", () => {
    it("should return status 200, email and access token when succes login", (done) => {
      let body = {
        email: "admin@mail.com",
        password: "1234",
      };
      request(app)
        .post("/login")
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          // console.log(res.body, "<<<<<<<<<<<<<<<<<<");
          expect(res.status).toEqual(200);
          expect(typeof res.body).toEqual("object");
          expect(res.body.user).toHaveProperty("id");
          expect(res.body.user).toHaveProperty("email");
          expect(res.body.user).toHaveProperty("role");
          expect(res.body).toHaveProperty("token");
          expect(typeof res.body.token).toEqual("string");
          expect(typeof res.body.user.id).toEqual("number");
          expect(typeof res.body.user.email).toEqual("string");
          expect(typeof res.body.user.role).toEqual("string");
          done();
        });
    });
  });
  describe("Unsuccess Login", () => {
    describe("Email does not exist in the database", () => {
      it("should return status 400 and error message when email does not exist in database", (done) => {
        let body = {
          email: "daffa@mail.com",
          password: "qweqwe",
        };
        request(app)
          .post("/login")
          .send(body)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            // console.log(res.body, "<<<<<<<<<<<<<<<<<<");

            expect(res.status).toEqual(400);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message");
            expect(typeof res.body.message).toEqual("string");
            done();
          });
      });
    });
    describe("Password was wrong", () => {
      it("should return status 400 and error message when email correct but password was wrong", (done) => {
        let body = {
          email: "admin@mail.com",
          password: "qweqwe",
        };
        request(app)
          .post("/login")
          .send(body)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            // console.log(res.body, "<<<<<<<<<<<<<<<<<<");

            expect(res.status).toEqual(400);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message");
            expect(typeof res.body.message).toEqual("string");
            done();
          });
      });
    });
    describe("Email or Password is empty", () => {
      it("should return 400 and error message when email or password empty", (done) => {
        let body = {
          email: "",
          password: "",
        };
        request(app)
          .post("/login")
          .send(body)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            expect(res.status).toEqual(400);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message");
            expect(typeof res.body.message).toEqual("string");
            done();
          });
      });
    });
  });
});

// PRODUCT TESTING

describe("Products testing", () => {
  let product;
  let user;
  let tokenAdmin;
  let tokenOther;
  beforeEach((done) => {
    let body1 = {
      email: "admin@mail.com",
      password: "1234",
    };
    let body2 = {
      email: "test@mail.com",
      password: "1234",
    };
    request(app)
      .post("/login")
      .send(body1)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        tokenAdmin = res.body.token;
        user = decoded(res.body.token);
        // console.log(user, token, "<<<<<<<<<<<<<<<<<<<<<<<<<<");
        done();
      });
    request(app)
      .post("/login")
      .send(body2)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        tokenOther = res.body.token;
        user = decoded(res.body.token);
        // console.log(user, token, "<<<<<<<<<<<<<<<<<<<<<<<<<<");
        done();
      });
  });
  beforeEach(() => {
    let input = {
      name: "Sepatu adidas",
      image_url: "https://helloworld.com",
      price: 500000,
      stock: 2,
    };
    return Product.create({
      name: input.name,
      image_url: input.image_url,
      price: input.price,
      stock: input.stock,
    })
      .then((data) => {
        product = {
          id: data.id,
          name: data.name,
          image_url: data.image_url,
          price: data.price,
          stock: data.stock,
        };

        // console.log(product, "HAAALLLLOOOO");
      })
      .catch((err) => {
        // console.log(err, "<<<<<<<<<<<<<<< before each");
      });
  });
  afterEach(() => {
    // console.log(product, "<<<<<<<AFTEREACH");
    return Product.destroy({ where: {} })
      .then(() => {
        // console.log("sukses");
      })
      .catch((err) => {
        // console.log(err, "<<<<<<<<<<<<<<< after each");
      });
  });

  // CREATING PRODUCT

  describe("Creating a product", () => {
    describe("Success creating", () => {
      it("should return status 201 with a created product ", (done) => {
        let body = {
          name: "Sepatu adidas",
          image_url: "https://helloworld.com",
          price: 500000,
          stock: 2,
        };
        request(app)
          .post("/products")
          .set("Token", tokenAdmin)
          .send(body)
          .end((err, res) => {
            if (err) {
              // console.log(err, "<<<<<<<<<<< testing");
              done(err);
            }
            // console.log(res.body, "<<<<<<<<<< RES BODY");
            expect(res.status).toEqual(201);
            expect(typeof res.body).toEqual("object");
            expect(typeof res.body.message).toEqual("string");
            expect(typeof res.body.product).toEqual("object");
            expect(res.body.product).toHaveProperty("name");
            expect(res.body.product).toHaveProperty("price");
            expect(res.body.product).toHaveProperty("stock");
            expect(typeof res.body.product.name).toEqual("string");
            expect(typeof res.body.product.price).toEqual("number");
            expect(typeof res.body.product.stock).toEqual("number");
            done();
          });
      });
    });
    describe("Unsuccess creating", () => {
      describe("Not including an access token", () => {
        it("should return status 401 with error message when access token not included", (done) => {
          let body = {
            name: "Sepatu adidas",
            image_url: "https://helloworld.com",
            price: 500000,
            stock: 2,
          };
          request(app)
            .post("/products")
            .send(body)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              expect(res.status).toEqual(401);
              expect(typeof res.body).toEqual("object");
              expect(res.body).toHaveProperty("message");
              expect(typeof res.body.message).toEqual("string");
              done();
            });
        });
      });
      describe("Not have access with this access token", () => {
        it("should return status 401 with error message when access token not authorized", (done) => {
          let body = {
            name: "Sepatu adidas",
            image_url: "https://helloworld.com",
            price: 500000,
            stock: 2,
          };
          request(app)
            .post("/products")
            .send(body)
            .set("Token", tokenOther)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              expect(res.status).toEqual(401);
              expect(typeof res.body).toEqual("object");
              expect(res.body).toHaveProperty("message");
              expect(typeof res.body.message).toEqual("string");
              done();
            });
        });
      });
      describe("Fields validation", () => {
        it("should return status 400 with error message when one of required field is empty", (done) => {
          let body = {
            name: "",
            image_url: "https://helloworld.com",
            price: 500000,
            stock: 2,
          };
          request(app)
            .post("/products")
            .send(body)
            .set("Token", tokenAdmin)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              expect(res.status).toEqual(400);
              expect(typeof res.body).toEqual("object");
              expect(res.body).toHaveProperty("message");
              expect(Array.isArray(res.body.message)).toEqual(true);
              done();
            });
        });
        it("should return status 400 with error message when field price filled with minus number", (done) => {
          let body = {
            name: "",
            image_url: "https://helloworld.com",
            price: -500000,
            stock: 2,
          };
          request(app)
            .post("/products")
            .send(body)
            .set("Token", tokenAdmin)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              expect(res.status).toEqual(400);
              expect(typeof res.body).toEqual("object");
              expect(res.body).toHaveProperty("message");
              expect(Array.isArray(res.body.message)).toEqual(true);
              done();
            });
        });
        it("should return status 400 with error message when field stock filled with minus number", (done) => {
          let body = {
            name: "",
            image_url: "https://helloworld.com",
            price: 500000,
            stock: -2,
          };
          request(app)
            .post("/products")
            .send(body)
            .set("Token", tokenAdmin)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              expect(res.status).toEqual(400);
              expect(typeof res.body).toEqual("object");
              expect(res.body).toHaveProperty("message");
              expect(Array.isArray(res.body.message)).toEqual(true);
              done();
            });
        });
        it("should return status 400 with error message when the entered data type does not match", (done) => {
          let body = {
            name: 123,
            image_url: "https://helloworld.com",
            price: "500000",
            stock: 2,
          };
          request(app)
            .post("/products")
            .send(body)
            .set("Token", tokenAdmin)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              expect(res.status).toEqual(400);
              expect(typeof res.body).toEqual("object");
              expect(res.body).toHaveProperty("message");
              done();
            });
        });
      });
    });
  });

  // UPDATING PRODUCT

  describe("Updating a product", () => {
    describe("Success updating", () => {
      it("should return status 200 with a data of updating product", (done) => {
        let body = {
          name: "Sepatu adidas",
          image_url: "https://helloworld.com",
          price: 500000,
          stock: 2,
        };
        request(app)
          .put(`/products/${product.id}`)
          .set("Token", tokenAdmin)
          .send(body)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            // console.log(res.body, "<<<<<<<<<<<<<<<<<<<<<");
            expect(res.status).toEqual(200);
            expect(typeof res.body).toEqual("object");
            expect(typeof res.body.message).toEqual("string");
            expect(typeof res.body.product).toEqual("object");
            expect(typeof res.body.product.name).toEqual("string");
            expect(typeof res.body.product.price).toEqual("number");
            expect(typeof res.body.product.stock).toEqual("number");
            done();
          });
      });
    });
    describe("Unsuccess updating", () => {
      describe("Not including an access token", () => {
        it("should return status 401 with error message when access token not included", (done) => {
          let body = {
            name: "Sepatu adidas",
            image_url: "https://helloworld.com",
            price: 500000,
            stock: 2,
          };
          request(app)
            .post("/products")
            .send(body)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              expect(res.status).toEqual(401);
              expect(typeof res.body).toEqual("object");
              expect(res.body).toHaveProperty("message");
              expect(typeof res.body.message).toEqual("string");
              done();
            });
        });
      });
      describe("Not have access with this access token", () => {
        it("should return status 401 with error message when access token not authorized", (done) => {
          let body = {
            name: "Sepatu adidas",
            image_url: "https://helloworld.com",
            price: 500000,
            stock: 2,
          };
          request(app)
            .post("/products")
            .send(body)
            .set("Token", tokenOther)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              expect(res.status).toEqual(401);
              expect(typeof res.body).toEqual("object");
              expect(res.body).toHaveProperty("message");
              expect(typeof res.body.message).toEqual("string");
              done();
            });
        });
      });
      describe("Fields validation", () => {
        it("should return status 400 with error message when one of required field is empty", (done) => {
          let body = {
            name: "",
            image_url: "https://helloworld.com",
            price: 500000,
            stock: 2,
          };
          request(app)
            .post("/products")
            .send(body)
            .set("Token", tokenAdmin)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              expect(res.status).toEqual(400);
              expect(typeof res.body).toEqual("object");
              expect(res.body).toHaveProperty("message");
              expect(Array.isArray(res.body.message)).toEqual(true);
              done();
            });
        });
        it("should return status 400 with error message when field price filled with minus number", (done) => {
          let body = {
            name: "",
            image_url: "https://helloworld.com",
            price: -500000,
            stock: 2,
          };
          request(app)
            .post("/products")
            .send(body)
            .set("Token", tokenAdmin)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              expect(res.status).toEqual(400);
              expect(typeof res.body).toEqual("object");
              expect(res.body).toHaveProperty("message");
              expect(Array.isArray(res.body.message)).toEqual(true);
              done();
            });
        });
        it("should return status 400 with error message when field stock filled with minus number", (done) => {
          let body = {
            name: "",
            image_url: "https://helloworld.com",
            price: 500000,
            stock: -2,
          };
          request(app)
            .post("/products")
            .send(body)
            .set("Token", tokenAdmin)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              expect(res.status).toEqual(400);
              expect(typeof res.body).toEqual("object");
              expect(res.body).toHaveProperty("message");
              expect(Array.isArray(res.body.message)).toEqual(true);
              done();
            });
        });
        it("should return status 400 with error message when the entered data type does not match", (done) => {
          let body = {
            name: 123,
            image_url: "https://helloworld.com",
            price: "500000",
            stock: -2,
          };
          request(app)
            .post("/products")
            .send(body)
            .set("Token", tokenAdmin)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              expect(res.status).toEqual(400);
              expect(typeof res.body).toEqual("object");
              expect(res.body).toHaveProperty("message");
              expect(Array.isArray(res.body.message)).toEqual(true);
              done();
            });
        });
      });
    });
  });

  // DELETE PRODUCT

  describe("Deleting a product", () => {
    let product;
    let user;
    let tokenAdmin;
    let tokenOther;
    beforeEach((done) => {
      let body1 = {
        email: "admin@mail.com",
        password: "1234",
      };
      let body2 = {
        email: "test@mail.com",
        password: "1234",
      };
      request(app)
        .post("/login")
        .send(body1)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          tokenAdmin = res.body.token;
          user = decoded(res.body.token);
          // console.log(user, token, "<<<<<<<<<<<<<<<<<<<<<<<<<<");
          done();
        });
      request(app)
        .post("/login")
        .send(body2)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          tokenOther = res.body.token;
          user = decoded(res.body.token);
          // console.log(user, token, "<<<<<<<<<<<<<<<<<<<<<<<<<<");
          done();
        });
    });
    beforeEach(() => {
      let input = {
        name: "Sepatu adidas",
        image_url: "https://helloworld.com",
        price: 500000,
        stock: 2,
      };
      return Product.create({
        name: input.name,
        image_url: input.image_url,
        price: input.price,
        stock: input.stock,
      })
        .then((data) => {
          product = {
            id: data.id,
            name: data.name,
            image_url: data.image_url,
            price: data.price,
            stock: data.stock,
          };

          // console.log(product, "HAAALLLLOOOO");
        })
        .catch((err) => {
          // console.log(err, "<<<<<<<<<<<<<<< before each");
        });
    });
    afterEach(() => {
      // console.log(product, "<<<<<<<AFTEREACH");
      return Product.destroy({ where: {} })
        .then(() => {
          // console.log("sukses");
        })
        .catch((err) => {
          // console.log(err, "<<<<<<<<<<<<<<< after each");
        });
    });

    describe("Success deleting", () => {
      it("should return status 200 with message", (done) => {
        request(app)
          .delete(`/products/${product.id}`)
          .set("Token", tokenAdmin)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty("message");
            expect(typeof res.body.message).toEqual("string");

            done();
          });
      });
    });
    describe("Unsuccess deleting", () => {
      describe("Not including an access token", () => {
        it("should return status 401 with error message when access token not included", (done) => {
          request(app)
            .post("/products")
            .end((err, res) => {
              if (err) {
                done(err);
              }
              expect(res.status).toEqual(401);
              expect(typeof res.body).toEqual("object");
              expect(res.body).toHaveProperty("message");
              expect(typeof res.body.message).toEqual("string");
              done();
            });
        });
      });
      describe("Not have access with this access token", () => {
        it("should return status 401 with error message when access token not authorized", (done) => {
          request(app)
            .post("/products")
            .set("Token", tokenOther)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              expect(res.status).toEqual(401);
              expect(typeof res.body).toEqual("object");
              expect(res.body).toHaveProperty("message");
              expect(typeof res.body.message).toEqual("string");
              done();
            });
        });
      });
    });
  });
});
