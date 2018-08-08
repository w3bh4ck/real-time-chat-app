const expect = require('expect');
const {generateMessage} = require('./message');
const {Users} = require('./users');


describe('generate message', () =>{
    it('should generate correct message object', () =>{
        let from = 'jane';
        let text = 'Some message';
        let message = generateMessage(from, text);
        // expect(message).toInclude({from, text});
    })
})
