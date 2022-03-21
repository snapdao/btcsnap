
type Utxo = {
    address: string,
    transactionHash: string,
    index: number,
    value: number,
    rawHex?: string
}


export interface Exloper {
    getUtxos(addresses: string[], includeHex: boolean): Promise<Utxo[]>
    getTransaction(transactionHash: string): Promise<string>
}

class BlockChair implements Exloper {

    private apiKey: string;
    constructor(apiKey: string) {
        this.apiKey = apiKey
    }

    async getUtxos(addresses: string[], includeHex: boolean): Promise<Utxo[]> {

        return []
    }

    async getTransaction(transactionHash: string): Promise<string> {
        return ""
    }
}