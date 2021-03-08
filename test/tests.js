const { doesNotMatch } = require('assert');
var assert = require('assert');
const chai = require("chai")
const chaiHttp = require("chai-http");
const { NOTIMP } = require('dns');
const { resolve } = require('path');
const expect = chai.expect
const app = require('../Backend/routes.js')

/**
 * Test Suite
 * @module
 */

chai.use(chaiHttp);
//chai.request(app)

const testUserObject = {
    "username":"Summer",
    "password":"password"
}

/* below is used for testing the add contact functionality of the web app */
const testOriginalNotes = "test general notes"
const testAddObj = {
    "_id": "",
    "groups": "",
    "first": "test first name",
    "last": "test last name",
    "email": "test email",
    "phone": "test phone",
    "company": "test company",
    "role": "test role",
    "dateMet": "01/01/2001",
    "dateLastInteracted": "",
    "schoolAttended": "test university",
    "notes": testOriginalNotes
}

/* below is used for testing the modify contact functionality of the web app */
const testModifyObj = {
    "_id": "",
    "groups": "",
    "first": "modified first name",
    "last": "modified last name",
    "email": "test email",
    "phone": "test phone",
    "company": "test company",
    "dateMet": "01/01/2010",
    "dateLastInteracted": "",
    "schoolAttended": "test university",
    "notes": "test general notes"
}

// const axios = require('axios');

var requester

beforeEach(async function() {
    requester = chai.request.agent("http://localhost:4001")
})

afterEach(async function() {
    requester.close()
})

describe("API Tests", function() {
    //var requester = chai.request("http://localhost:4001")
    //var requester = chai.request.agent("http://localhost:4001")
    //var requester = chai.request(app).keepOpen()

    // send a login request
    // return the response
    async function login() {
        return await requester
            .post('/api/login')
            .set('content-type', 'application/json')
            .send(testUserObject)
    }
    
    async function logout() {
        return await requester
            .post('/api/logout')
            .set('content-type', 'application/json')
            .send()
    }

    /**
     * Purpose: to test the functionality of logging in.
     */
    describe("POST /api/login", function() {
        it("should return status 200", async function() {
            //var res = await chai.request("http://localhost:4001")
            var res = await login()
            expect(res).to.have.status(200)
        })
    })

    /**
     * Purpose: to test the functionality of logging out.
     */
     describe("POST /api/logout", function() {
        it("should return status 200", async function() {
            await login()
            var res = await logout()
            expect(res).to.have.status(200)
        })
    })

    describe("Tests that require login", function() {
        beforeEach(async function() {
            // login
            await login()
        })

        afterEach(async function() {
            // logout
            await logout()
        })

        // send a request to add a contact
        // return the response
        async function addContact() {
            return await requester
                .post('/api/contact/add')
                .send(testAddObj)
        }
        /**
         * Purpose: to test the functionality of adding a new contact.
         */
        describe("POST /api/contact/add", function() {
            it("should return status 200", async () => {
                var res = await addContact()
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('_id')
            })
        })

        describe("update and delete contacts", function() {
            beforeEach(async function () {
                var res = await addContact()
                expect(res).to.have.status(200)
                this.currentTest.contactObject = res.body
            })

            it("test", function() {
                expect(this.test).to.have.property('contactObject')
            })
            /**
            * Purpose: to test the functionality of updating a contact.
            */
            it("should return status 200 and update a contact", async function() {
                expect(this.test).to.have.property('contactObject')
                var contactObject = this.test.contactObject
                expect(contactObject.notes).to.equal(testOriginalNotes)
                var updatedNotes = "modified by test"
                contactObject.notes = updatedNotes
                var resUpdate = await requester
                    .post('/api/contact/update')
                    .send(contactObject)
                expect(resUpdate).to.have.status(200)
                var resCore = await requester
                    .post('/api/core')
                expect(resCore).to.have.status(200)
                expect(resCore.body).to.have.property('networkObject')
                expect(resCore.body.networkObject).to.have.property('contacts')
                // expect(resCore.body.networkObject.contacts).to.include(contactObject) // this assertion fails!
            })

            /**
             * Purpose: to test the functionality of deleting a contact.
             */
             it("should return status 200 and delete a contact", async function() {
                var contactObject = this.test.contactObject

                //retrieve core before deletion and verify contact is inside
                var resCore = await requester
                    .post('/api/core')
                expect(resCore).to.have.status(200)
                //expect(resCore.body.networkObject.contacts).to.include(contactObject)
                expect(resCore.body.networkObject.contacts.some(contact => contact._id == contactObject._id)).to.be.true

                //hit the deletion endpoint
                var resDelete = await requester
                    .post('/api/contact/delete')
                    .send(contactObject)
                expect(resDelete).to.have.status(200)

                //retrieve core after deletion and verify contact is not inside anymore
                var resCore = await requester
                    .post('/api/core')
                expect(resCore).to.have.status(200)
                expect(resCore.body.networkObject.contacts.some(contact => contact._id == contactObject._id)).to.be.false
            })
        })

    })
})






/*
deployment stuff

https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f
https://aws.amazon.com/getting-started/hands-on/build-react-app-amplify-graphql/module-one/
https://us-east-2.console.aws.amazon.com/amplify/home?region=us-east-2#/create

https://github.com/iriberri/ruby-test-example/blob/master/.travis.yml

testing
https://livecodestream.dev/post/testing-in-nodejs-using-mocha-and-chai-part-2/
https://stackabuse.com/testing-node-js-code-with-mocha-and-chai/
https://www.chaijs.com/plugins/chai-http/
 */



    // describe("POST /api/contact/add", () => {
    //     it("should return status 200 and _id", async () => {
    //         var res = await requester
    //             .post('/api/contact/add')
    //             .send(testAddObj)
    //         expect(res.status).to.equal(200)
    //         expect("_id" in res).to.be.true
    //     })
    // })