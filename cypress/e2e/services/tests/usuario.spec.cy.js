const GETUsuario = require("../requests/usuarios/GETUsuario.request");
const DELETEUsuario = require("../requests/usuarios/DELETEUsuario.request");
const POSTUsuario = require("../requests/usuarios/POSTUsuario.request");
const PUTUsuario = require("../requests/usuarios/PUTUsuario.request");

var postResponse;
var putFakeID;

describe("POST usuarios", () => {
  it("Cadastrar usuário", () => {
    POSTUsuario.addUser().then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("Cadastro realizado com sucesso");
      postResponse = response.body._id;
    });
  });

  it("E-mail já cadastrado", () => {
    POSTUsuario.addUser().then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq("Este email já está sendo usado");
    });
  });
});

describe("GET usuarios", () => {
  it("Buscar usuário por ID", () => {
    GETUsuario.user(postResponse).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body._id).to.eq(postResponse);
    });
  });
  it("Listar usuários cadastrados", () => {
    GETUsuario.allUsers().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.not.null;
    });
  });

  it("Usuário não encotrado", () => {
    GETUsuario.user("teste").then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq("Usuário não encontrado");
    });
  });
});

describe("PUT usuários", () => {
  it("Alterar usuário existente", () => {
    PUTUsuario.updateUser(postResponse).then((resUpdateUser) => {
      expect(resUpdateUser.status).to.eq(200);
      expect(resUpdateUser.body.message).to.eq("Registro alterado com sucesso");
    });
  });

  it("Alterar usuário inexistente", () => {
    PUTUsuario.updateUserFake("teste").then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("Cadastro realizado com sucesso");
      putFakeID = response.body._id;
    });
  });

  it("Este email já está sendo usado", () => {
    PUTUsuario.updateUserFake(postResponse).then((resUpdateUser) => {
      expect(resUpdateUser.status).to.eq(400);
      expect(resUpdateUser.body.message).to.eq(
        "Este email já está sendo usado"
      );
      DELETEUsuario.deleteUser(postResponse);
    });
  });
});

describe("DELETE usuários", () => {
  it("Excluir usuário existente", () => {
    DELETEUsuario.deleteUser(putFakeID).then((resDeleteUser) => {
      expect(resDeleteUser.status).to.eq(200);
      expect(resDeleteUser.body.message).to.eq("Registro excluído com sucesso");
    });
  });

  it("Excluir usuário inexistente", () => {
    DELETEUsuario.deleteUser(10).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Nenhum registro excluído");
    });
  });

  it("Usuário com carrinho cadastrado", () => {
    const userCarrinho = "oUb7aGkMtSEPf6BZ";
    DELETEUsuario.deleteUser(userCarrinho).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq(
        "Não é permitido excluir usuário com carrinho cadastrado"
      );
    });
  });
});
