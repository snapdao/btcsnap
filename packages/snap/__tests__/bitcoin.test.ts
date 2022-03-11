import {BtcTx} from '../src/bitcoin'


describe('bitcoin test', () => {
    it('should be able to construct the tx and extract the psbt json', () => {
        const testPsbtBase64 = "cHNidP8BAJwCAAAAAlVzsBWMfOCyW7PQz/c0Tjaco9vO4s5NiIhA//Sa4XzQAQAAAAD9////4BTcI2NIambjN7gC2nByKjIGX3qeT9Ta8OBnqjH45YkAAAAAAP3///8C948BAAAAAAAXqRSRWJI2amzfJK+m4cSA2yrYjGM3gIeYiVsAAAAAABepFJFYkjZqbN8kr6bhxIDbKtiMYzeAhwAAAAAAAQEg9Jg2AAAAAAAXqRSRWJI2amzfJK+m4cSA2yrYjGM3gIcBBBYAFOnPkTHZwCo6AtJGu0KXtWBsbLL5IgYC8yWoWQLSZNvLDL4UTpskY/glK9DFG8GWZvTIJGHkuqIYAQEBATEAAIAAAACAAAAAgAAAAAAAAAAAAAEBIIOEJgAAAAAAF6kUdFxWGQ0f6CdOfr6d1P4QyjSElZWHAQQWABQwB6va/o+HXD07cUQo53YUlKcfbCIGAvMlqFkC0mTbywy+FE6bJGP4JSvQxRvBlmb0yCRh5LqiGAEBAQExAACAAAAAgAAAAIAAAAAAAAAAAAAAAA==";
        const tx = new BtcTx(testPsbtBase64);
        const testJson = tx.extractPsbtJson();
        expect(testJson.inputs.length).toBe(2)
        expect(testJson.outputs.length).toBe(2)
        expect(testJson.inputs[0].prevTxId).toBe("5573b0158c7ce0b25bb3d0cff7344e369ca3dbcee2ce4d888840fff49ae17cd0")
        expect(testJson.outputs[0].address).toBe("3EwY1PaQ5fB4M4nvWRYgUn2LNmokeJ36Pj")
    })
})