import {postRequestBody} from '../../fixtures/testData.json'
import {putRequestBody} from '../../fixtures/testData.json'


describe('API Project01', () => {


    let studentId 

    it('Create a new user', () => {

        const newUser = {
            firstName : 'Aziz',
            lastName : 'Elm',
            email : 'Aziz.elm@techGlobal.com',
            dob : '1994-04-02' 
           }

           cy.request({
            method: 'POST',
            url : Cypress.env('baseUrl'),
            body : newUser
        }).then((response) => {
            cy.log(JSON.stringify(response.body, null, 2))
    
            studentId = response.body.id

            expect(response.status).to.equal(200)
            expect(response.duration).to.be.below(200)
            cy.validateResponse(response, postRequestBody)
        })

    })


    it('Retrieve a specific user-created', () => {

        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/${studentId}`
        }).then((response) => {

            studentId = response.body.id
            
            expect(response.status).to.equal(200)
            JSON.stringify(response.body, null, 2)
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.below(200)
            cy.validateResponse(response, postRequestBody)
        })
    })




    it('Update an existing user', () => {

        cy.request({
            method: 'PUT',
            url : `${Cypress.env('baseUrl')}/${studentId}`,
            body : putRequestBody
        }).then((response) => {
            cy.log(JSON.stringify(response.body, null, 2))
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.below(200)
            cy.validateResponse(response, putRequestBody)
        })
    })

    it('Retrieve a specific user created to confirm the update', () => {

        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/${studentId}`
        }).then((response) => {

            studentId = response.body.id
            
            expect(response.status).to.equal(200)
            JSON.stringify(response.body, null, 2)
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.below(200)
            cy.validateResponse(response, putRequestBody)
        })
    })

    
    it('Delete the user that you created', () => {

        cy.request({

            method : 'DELETE',
            url    : `${Cypress.env('baseUrl')}/${studentId}`,
        }).then((response) => {
        
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.below(200)
            
        })
    })
    

})