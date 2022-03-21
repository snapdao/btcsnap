import { genreateAddresses } from '../../lib/index'


describe('lib', () => {
    
    it('should generate bitcoin address from extended public key', () => {
        const testPubKey = "xpub6D1X1DZrtN8YfLx6XpTtSbT8vd5eML2oKQcKihTaQxZXGGDYZhda3irdG6Vigs7WP7aw6tzMYES3bfW6gCwKWPWkKHsLfAFAHPYMpHazhYP"
        const {recieve, change} = genreateAddresses(testPubKey)
        expect(recieve.length).toEqual(10)
        expect(recieve[4]).toEqual('19PBcHvaG13Eh7rt2WfLDHR9bHEXxG6xZs')
        expect(change.length).toEqual(10)
        expect(change[4]).toEqual('1J9VLbrrK2MN9iDUZhZ9k2X8h851UWrq76')
    })
})