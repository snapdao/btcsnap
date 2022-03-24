import { genreateAddresses } from '../../lib/index'


describe('lib', () => {
    it('should generate bitcoin address from extended public key', () => {
        const testPubKey = "tpubDDJbAqXq6EFowpDuCv4Q3Wa7WGHJjUCQyY3pxAFMrrna7FTLV8Q835J8kqPyFvNBE7oXtvES6jJsS51jNoYMpmG39kYBGG8Ps8XWccA16vB"
        const {recieve, change} = genreateAddresses(testPubKey)
        expect(recieve.length).toEqual(10)
        expect(recieve[4]['address']).toEqual('mfd7TvZMbF9gcn5JzyjsdJ64A6pVPoSLdk')
        expect(change.length).toEqual(10)
        expect(change[4]['address']).toEqual('mn4feBQ2XWjQ2c1WnZBo4pFWyjr2NJLLCu')
    })
})