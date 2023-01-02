const POSTLogin = require("../requests/login/POSTLogin.request");

describe("POST Login", () => {
  it("Realizar login", () => {
    POSTLogin.loginAdm().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Login realizado com sucesso");
    });
  });
});
