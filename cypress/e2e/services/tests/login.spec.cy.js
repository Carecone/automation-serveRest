import * as POSTLogin from '../requests/login/POSTLogin.request' 

describe('POST Login', () =>{

    it('Realizar login', () => {
        POSTLogin.login().then((response) =>{
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("Login realizado com sucesso");
        })
    });
})