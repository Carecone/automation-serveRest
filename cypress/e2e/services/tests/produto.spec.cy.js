const POSTProduto = require("../requests/produtos/POSTProduto.request");
const DELETEProduto = require("../requests/produtos/DELETEProduto.request");
const GETProduto = require("../requests/produtos/GETProduto.request");
const PUTProduto = require("../requests/produtos/PUTProdutos.request");
const Login = require("../requests/login/POSTLogin.request");

describe("POST Produtos", () => {
  it("Cadastrado com sucesso", () => {
    Login.loginAdm().then((token) => {
      POSTProduto.addProduct(token.body.authorization).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq("Cadastro realizado com sucesso");
        DELETEProduto.deleteProduct(
          response.body._id,
          token.body.authorization
        );
      });
    });
  });

  it("Já existe produto com esse nome", () => {
    Login.loginAdm().then((token) => {
      POSTProduto.addProduct(token.body.authorization).then((resAddProduto) => {
        POSTProduto.addProduct(token.body.authorization).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body.message).to.eq(
            "Já existe produto com esse nome"
          );
          DELETEProduto.deleteProduct(
            resAddProduto.body._id,
            token.body.authorization
          );
        });
      });
    });
  });

  it("Token de acesso expirado/inválido/ausente", () => {
    POSTProduto.addProduct("").then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq(
        "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
      );
    });
  });

  it("Rota exclusiva para administradores", () => {
    Login.login().then((token) => {
      POSTProduto.addProduct(token.body.authorization).then((response) => {
        expect(response.status).to.eq(403);
        expect(response.body.message).to.eq(
          "Rota exclusiva para administradores"
        );
      });
    });
  });
});

describe("GET Produtos", () => {
  it("Buscar produto por ID", () => {
    Login.loginAdm().then((token) => {
      POSTProduto.addProduct(token.body.authorization).then((resAddProduct) => {
        GETProduto.getProduct(resAddProduct.body._id).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body._id).to.eq(resAddProduct.body._id);
          DELETEProduto.deleteProduct(
            response.body._id,
            token.body.authorization
          );
        });
      });
    });
  });

  it("Listar produtos cadastrados", () => {
    GETProduto.getAllProduct().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.produtos).to.not.have.length(1);
    });
  });

  it("Buscar produto por ID", () => {
    GETProduto.getProduct("asdasdasdasdasdas").then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq("Produto não encontrado");
    });
  });
});

describe("PUT produtos", () => {
  it("Alterado com sucesso", () => {
    Login.loginAdm().then((token) => {
      POSTProduto.addProduct(token.body.authorization).then((resAddProduto) => {
        PUTProduto.updateProduct(
          token.body.authorization,
          resAddProduto.body._id
        ).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq("Registro alterado com sucesso");
          DELETEProduto.deleteProduct(
            resAddProduto.body._id,
            token.body.authorization
          );
        });
      });
    });
  });

  it("Cadastrado com sucesso", () => {
    Login.loginAdm().then((token) => {
      PUTProduto.updateProduct(token.body.authorization).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq("Cadastro realizado com sucesso");
        DELETEProduto.deleteProduct(
          response.body._id,
          token.body.authorization
        );
      });
    });
  });

  it("Rota exclusiva para administadores", () => {
    Login.loginAdm().then((token) => {
      POSTProduto.addProduct(token.body.authorization).then((resAddProduto) => {
        Login.login().then((tokenZezinho) => {
          PUTProduto.updateProduct(
            tokenZezinho.body.authorization,
            resAddProduto.body._id
          ).then((response) => {
            expect(response.status).to.eq(403);
            expect(response.body.message).to.eq(
              "Rota exclusiva para administradores"
            );
          });
        });
        DELETEProduto.deleteProduct(
          resAddProduto.body._id,
          token.body.authorization
        );
      });
    });
  });

  it("Token de acesso expirado/inválido/ausente", () => {
    Login.loginAdm().then((token) => {
      POSTProduto.addProduct(token.body.authorization).then((resAddProduto) => {
        PUTProduto.updateProduct("", resAddProduto.body._id).then(
          (response) => {
            expect(response.status).to.eq(401);
            expect(response.body.message).to.eq(
              "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
            );
          }
        );
        DELETEProduto.deleteProduct(
          resAddProduto.body._id,
          token.body.authorization
        );
      });
    });
  });
  /*
  it("Já existe produto com esse nome", () => {
    Login.loginAdm().then((token) => {
      POSTProduto.addProduct(token.body.authorization).then(
        (resAddProdutoFirst) => {
          POSTProduto.addProduct(token.body.authorization).then(
            (resAddProdutoSecond) => {
              PUTProduto.updateProduct(
                token.body.authorization,
                resAddProdutoSecond.body._id
              ).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.message).to.eq(
                  "Já existe produto com esse nome"
                );
                DELETEProduto.deleteProduct(
                  resAddProdutoFirst.body._id,
                  token.body.authorization
                );
                DELETEProduto.deleteProduct(
                  resAddProdutoSecond.body._id,
                  token.body.authorization
                );
              });
            }
          );
        }
      );
    });
  });
  */
});

describe("DELETE Produtos", () => {
  it("Registro excluído com sucesso", () => {
    Login.loginAdm().then((token) => {
      POSTProduto.addProduct(token.body.authorization).then((response) => {
        DELETEProduto.deleteProduct(
          response.body._id,
          token.body.authorization
        ).then((responseDel) => {
          expect(responseDel.status).to.eq(200);
          expect(responseDel.body.message).contain(
            "Registro excluído com sucesso"
          );
        });
      });
    });
  });

  it("Rota exclusiva para administradores", () => {
    Login.loginAdm().then((token) => {
      POSTProduto.addProduct(token.body.authorization).then((response) => {
        Login.login().then((tokenZezinho) => {
          DELETEProduto.deleteProduct(
            response.body._id,
            tokenZezinho.body.authorization
          ).then((responseDel) => {
            expect(responseDel.status).to.eq(403);
            expect(responseDel.body.message).to.eq(
              "Rota exclusiva para administradores"
            );
          });
        });
        DELETEProduto.deleteProduct(
          response.body._id,
          token.body.authorization
        );
      });
    });
  });

  it("Token de acesso expirado/inválido/ausente", () => {
    Login.loginAdm().then((token) => {
      POSTProduto.addProduct(token.body.authorization).then((response) => {
        DELETEProduto.deleteProduct(response.body._id, "").then(
          (responseDel) => {
            expect(responseDel.status).to.eq(401);
            expect(responseDel.body.message).to.eq(
              "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
            );
          }
        );
        DELETEProduto.deleteProduct(
          response.body._id,
          token.body.authorization
        );
      });
    });
  });
  /*
  it("Produto de um carrinho", () => {
    Login.loginAdm().then((token) => {
      POSTProduto.addProduct(token.body.authorization).then((response) => {
        DELETEProduto.deleteProduct(
          response.body._id,
          tokenZezinho.body.authorization
        ).then((responseDel) => {
          expect(responseDel.status).to.eq(400);
          expect(responseDel.body.message).to.eq(
            "Não é permitido excluir produto que faz parte de carrinho"
          );
        });
        DELETEProduto.deleteProduct(
          response.body._id,
          token.body.authorization
        );
      });
    });
  });
  */
});
