const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
const app = require('/Backend/routes')

chai.use(chaiHttp);
chai.request(app)

/* below is used for testing the add contact functionality of the web app */
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
    "notes": "test general notes"
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

/**
 * Purpose: to test the functionality of adding a new contact.
 */
describe("POST /api/contact/add", () => {
    it("should return status 200", async () => {
        let res = await chai
            .request(app)
            .post('/api/contact/add')
            .send(testAddObj)

        expect(res.status).to.equal(200)
    })
})

/**
 * Purpose: to test the functionality of deleting a contact.
 */


/**
 * Purpose: to test the functionality of modifying a contact.
 */


/**
 * Purpose: to test the functionality of logging in.
 */

/**
 * Purpose: to test the functionality of registering a new user.
 */



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
