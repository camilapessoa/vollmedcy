describe('testes em API', () => {

    context('Testes em rotas com usuário autorizado', () => {
        beforeEach(() => {
            cy.loginApi(Cypress.env('email'), Cypress.env('senha'))

        })
        it('get Servidor', () => {
            cy.request('http://localhost:8080/clinica').then((response) => {
                expect(response.status).to.eq(200)
            })

        })

        it('get Servidor render', () => {
            cy.request('https://volserver.onrender.com/clinica').then((response) => {
                expect(response.status).to.eq(200)
            })

        })


        it('Cadastra clinica Render', () => {
            const reqBody =
            {
                planoDeSaudeAceitos: [1, 2, 3, 4],
                email: "clinica@gmail.com",
                nome: "Clinica de Todos",
                senha: "4321",
                endereco: {
                    "cep": 76541321,
                    "rua": "Rua 45",
                    "numero": 2,
                    "complemento": "casa",
                    "estado": "Amapá"
                }
            }
            cy.request({
                method: 'POST',
                // url: 'http://localhost:8080/clinica',
                url: 'https://volserver.onrender.com/clinica',
                body: reqBody,
                // failOnStatusCode: false

            }).then(response => {
                expect(response.status).to.eq(200)
                expect(response.body.id).to.exist;
            })

        })

        it('loginApi Render', () => {
            const reqBody = {
                "email": "clinica@gmail.com",
                "senha": "4321"
            }

            //     const Headers = ['Content-Type', 'Authorization', 'Accept'
            // ]
            cy.request({
                method: 'POST',
                url: 'https://volserver.onrender.com/auth/login',
                //   headers: Headers,
                body: reqBody,

                // failOnStatusCode: false

            }


            ).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body.auth).to.be.true;
                expect(response.body.rota).to.eq('/clinica');
                expect(response.body.token).to.exist;
                //   cy.wrap(response.body.token).as('token');

            })

        })



        it('GET via url front para teste em resposta da home', () => {
            cy.request('GET', '/', {
                email: 'clinica@gmail.com', senha: '4321'

            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Deve verificar se o token de autenticação é retornado após login via POST na API', () => {
            cy.get('@token').should('exist');
        })
    });

    context('Validações em respostas da API', () => {
        beforeEach(() =>{
            cy.loginApi(Cypress.env('email'), Cypress.env('senha'))
        })

        it('Requisição incorreta em criação de especialista', () => {
            cy.request({
                method: 'POST',
                url: Cypress.env('api_clinica'),
                body: {
                    nome: 'Camila',
                    email: 'camila123@exemplo',
                },
                failOnStatusCode: false

            }).then((response) => {
                expect(response.status).to.eq(500)
                expect(response.body).to.have.property('message')
            })

        })

    })

})