

//import { expect } from 'chai'
import {postRequestBody} from '../../fixtures/testData.json'
import {putRequestBody} from '../../fixtures/testData.json'
import {patchRequestBody} from '../../fixtures/testData.json'

describe('API Project02', () => {


    let myStudentId 

    it('Retrieve a list of all users', () => {


        cy.request({

            method: 'GET',
            url : `${Cypress.env('baseUrl')}`,
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.below(200)
            expect(response.body).to.have.length(2) 
            expect(response.body[1].firstName).to.equal('John')
            expect(response.body[1].lastName).to.equal('Doe')
            //expect(response.body.firstName).to.equal(putRequestBody.firstName)
        })

    })




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
    
            myStudentId = response.body.id

            expect(response.status).to.equal(200)
            expect(response.duration).to.be.below(200)
            cy.validateResponse(response, postRequestBody)
            
        })
    })



        it('Retrieve a specific user-created', () => {

            cy.request({
                method: 'GET',
                url: `${Cypress.env('baseUrl')}/${myStudentId}`
            }).then((response) => {
                expect(response.status).to.equal(200)
                JSON.stringify(response.body, null, 2)
            })

        })

        it('Update user using PUT', () => {

            cy.request({
                method: 'PUT',
                url : `${Cypress.env('baseUrl')}/${myStudentId}`,
                body : putRequestBody
            }).then((response) => {
                cy.log(JSON.stringify(response.body, null, 2))
                expect(response.status).to.equal(200)
               
                cy.validateResponse(response, putRequestBody)
            })

        })

        it('Partiall update an existing User using PATCH', () => {

            cy.request({
                method: 'PATCH',
                url: `${Cypress.env('baseUrl')}/${myStudentId}`,
                body: patchRequestBody
            }).then((response) => {
                cy.log(JSON.stringify(response.body, null, 2))
                expect(response.status).to.equal(200)

                cy.validateResponse(response, patchRequestBody)
                
            })

        })


        it('Retrieve a list of all users AGAIN', () => {


            cy.request({
    
                method: 'GET',
                url : `${Cypress.env('baseUrl')}`,
            }).then((response) => {
                expect(response.status).to.equal(200)
                expect(response.duration).to.be.below(200)
                expect(response.body.length).to.be.above(2)
                
            })
    
        })


        it('Retrieve a specific user-created AGAIN', () => {

            cy.request({
                method: 'GET',
                url: `${Cypress.env('baseUrl')}/${myStudentId}`
            }).then((response) => {
                expect(response.status).to.equal(200)
                JSON.stringify(response.body, null, 2)

                cy.validateResponse(response, patchRequestBody)
            })

        })



        it('Delete the user created', () => {

            cy.request({
            
                method : 'DELETE',
                url    : `${Cypress.env('baseUrl')}/${myStudentId}`,
            }).then((response) => {
            
                expect(response.status).to.equal(200)
            })
            
        })










})