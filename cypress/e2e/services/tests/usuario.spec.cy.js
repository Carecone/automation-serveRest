import * as GETUsuario from "../requests/usuarios/GETUsuario.request"
import * as DELETEUsuario from "../requests/usuarios/DELETEUsuario.request"
import * as POSTusuario from "../requests/usuarios/POSTUsuario.request"

describe('POST usuarios', () => {
    it.only('Cadastrar usuário', () => {
        POSTusuario.addUser().then((response) =>{
            expect(response.status).to.eq(201)
            expect(response.body).to.eq('Cadastro realizado com sucesso');
        })
    });
});

describe('GET usuarios', () => {
    it('Listar usuários cadastrados', () => {
        GETUsuario.allUsers().then((response) => {
           expect(response.status).to.eq(200); 
           expect(response.body).to.be.not.null;
        })
    });
});

describe('DELETE usuários', () => {
    it('Excluir usuário inexistente', () => {
        DELETEUsuario.deleteUser(10).then((response) =>{
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Nenhum registro excluído')
        } )
    });

    it('Excluir usuário existente', () => {
        DELETEUsuario.deleteUser('hcLrRc1QxwU9hmKM').then((response) => { 
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Registro excluído com sucesso')
        })
    });
});
