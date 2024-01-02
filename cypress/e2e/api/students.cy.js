
import {postRequestBody} from '../../fixtures/testData.json'
import {putRequestBody} from '../../fixtures/testData.json'



describe('CRUD descriptions', () => {


    
let studentId 

it('Create a new student using POST', () => {

   const newUser = {
    firstName : 'Aziz',
    lastName : 'Elm',
    email : 'Van_Johns000000@example.org',
    dob : '1994-04-02' 
   }


    cy.request({
        method: 'POST',
        url : Cypress.env('baseUrl'),
        body : newUser
    }).then((response) => {
        cy.log(JSON.stringify(response.body, null, 2))

        studentId = response.body.id
        cy.validateResponse(response, postRequestBody)
    })
/*
        expect(response.status).to.equal(200)
        cy.log(response.duration)
        expect(response.body.firstName).to.equal(postRequestBody.firstName)
        expect(response.body.id).to.be.below(200)
    })
*/

})

it('Get one student using GET', () => {

    cy.request({
        method: 'GET',
        url: `${Cypress.env('baseUrl')}/${studentId}`
    }).then((response) => {
        expect(response.status).to.equal(200)
        JSON.stringify(response.body, null, 2)
    })
})

it('Update user using PUT', () => {

    cy.request({
        method: 'PUT',
        url : `${Cypress.env('baseUrl')}/${studentId}`,
        body : putRequestBody
    }).then((response) => {
        cy.log(JSON.stringify(response.body, null, 2))
        expect(response.status).to.equal(200)
       
        cy.validateResponse(response, putRequestBody)
    })


})

it('Read the updated student GET', () => {

    cy.request({

        method: 'GET',
        url : `${Cypress.env('baseUrl')}/${studentId}`,
    }).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.duration).to.be.below(200)
        expect(response.body.firstName).to.equal(putRequestBody.firstName)
    })
})

it('Delete the user DELETE', () => {

cy.request({

    method : 'DELETE',
    url    : `${Cypress.env('baseUrl')}/${studentId}`,
}).then((response) => {

    expect(response.status).to.equal(200)
})




})




})


