const app = require('../server')
const { expect } = require('chai');
const supertest = require('supertest');

describe('GET /movie', () => {
    it('authorization fails if token is wrong', () =>{
        return supertest(app)
            .get('/movie')
            .set({'Authorization': 'Bearer 5872et3267e-6f76-11ea-bc55-0242ac13003'})
            .expect(401)
                .then(res => {
                    expect(res.body).to.deep.equal({ error: 'Unauthorized request' })
                })
    })
    it('authorization fails if token is empty', () =>{
        return supertest(app)
            .get('/movie')
            .set({'Authorization': ''})
            .expect(401)
                .then(res => {
                    expect(res.body).to.deep.equal({ error: 'Unauthorized request' })
                })
    })
    it('authorization passes if token is correct', () =>{
        return supertest(app)
            .get('/movie')
            .set({'Authorization': 'Bearer c5872et3267e-6f76-11ea-bc55-0242ac13003'})
            .expect(200)
    })
})