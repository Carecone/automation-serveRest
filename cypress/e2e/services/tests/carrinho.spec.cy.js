const POSTCarrinho = require("../requests/carrinho/POSTCarrinho.request");
const POSTProduto = require("../requests/produtos/POSTProduto.request");
const DELETEProduto = require("../requests/produtos/DELETEProduto.request");
const GETProduto = require("../requests/produtos/GETProduto.request");
const Login = require("../requests/login/POSTLogin.request");
describe("POST Carrinho", () => {
  it("Cadastro realizado com sucesso", () => {
    Login.loginAdm().then((token) => {
      POSTProduto.addProduct(token.body.authorization).then((resAddPdt) => {
        POSTCarrinho.addCarrinho(token.body.authorization, resAddPdt.body._id).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.message).to.eq("Cadastro realizado com sucesso");
        });
        DELETEProduto.deleteProduct(
            resAddPdt.body._id,
          token.body.authorization
        );
      });
    });
  });

  it("Não é permitido possuir produto duplicado", () => {});

  it("Token de acesso expirado/inválido/ausente", () => {});
});
