const POSTProduto = require("../requests/produtos/POSTProduto.request");
const DELETEProduto = require("../requests/produtos/DELETEProduto.request");
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
    POSTProduto.addProduct().then((response) => {
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

describe("DELETE Produtos", () => {
  it("Registro excluído com sucesso", () => {});
});
