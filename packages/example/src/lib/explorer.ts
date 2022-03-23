import { BitcoinNetwork } from ".";

type Utxo = {
    address: string,
    transactionHash: string,
    index: number,
    value: number,
    rawHex?: string
}


export interface Exloper {
    /**
     * Fetch Uxto List from the outside serivce like an bitcoin exploer, the unconfirmed utxo should not be included
     * if includHex is set to true, the utxo item will include its raw transaction hex
     * @param addresses 
     * @param includeHex 
     */
    getUtxos(addresses: string[], includeHex: boolean): Promise<Utxo[]>

    /**
     * Fetch the raw transaction hex by the transaction hash
     * @param transactionHash 
     */
    getTransaction(transactionHash: string): Promise<string>
}

type BlockChairResponse = {
    data: {
        set: {},
        utxo: BlockChairUxto[]
    }
}

type BlockChairUxto = {
    block_id: number
    transaction_hash: string
    index: number
    value: number
    address: string
}

export class BlockChair implements Exloper {
    private apiKey: string;
    private host: string;
    private network: BitcoinNetwork
    constructor(apiKey: string, network: BitcoinNetwork) {
        this.apiKey = apiKey
        this.host = "https://api.blockchair.com"
        this.network = network
    }


    private genereateHost() {
        return this.network === BitcoinNetwork.Test ? `${this.host}/bitcoin/testnet` : `${this.host}/bitcoin`
    }

    private extractUtxo(response: BlockChairResponse) {
        return response.data.utxo.map(each => ({
            address: each.address,
            transactionHash: each.transaction_hash,
            index: each.index,
            value: each.value
        }))
    }



    async getUtxos(addresses: string[], includeHex: boolean = false): Promise<Utxo[]> {
        const host = `${this.genereateHost()}/dashboards/addresses/${addresses.join(',')}`
        const url = new URL(host);
        const params = { limit: '5000', state: "latest", key: this.apiKey }
        url.search = new URLSearchParams(params).toString();
        const resp = await fetch(url.toString());

        if (!resp.ok) {
            // process error logic for 404 return []
            if (resp.status === 404) {
                return []
            } else {
                throw new Error('fetch utxo data error')
            }
        }


        const responseJson = await resp.json();
        const utxoList = this.extractUtxo(responseJson)
        if (includeHex) {
            const utxoListWithHex = []
            for (let each of utxoList) {
                const rawHex = await this.getTransaction(each.transactionHash)
                utxoListWithHex.push({ ...each, rawHex })
            }
            return utxoListWithHex
        }
        return utxoList
    }

    async getTransaction(transactionHash: string): Promise<string> {
        const host = `${this.genereateHost()}/raw/transaction/${transactionHash}`
        const url = new URL(host);
        const resp = await fetch(url.toString());

        if (!resp.ok) {
            if (resp.status === 404) {
                throw new Error('tx not found')
            } else {
                throw new Error('fetch tx data error')
            }
        }

        const responseJson = await resp.json();
        return responseJson['data'][transactionHash]["raw_transaction"]
    }
}