import { Address, createPublicClient, encodeFunctionData, getContract, http, WalletClient } from 'viem';
import { naiveDistributorAbi } from '../../contracts';
import { DISTRIBUTOR_ADDRESS } from './constants';
import { arbitrum } from 'viem/chains';
import { RPC_URL } from '../../common';
import { PENDLE_TOKEN } from './metadata';

export class Distributor {
    private distributorContract;
    constructor() {
        this.distributorContract = getContract({
            address: DISTRIBUTOR_ADDRESS,
            abi: naiveDistributorAbi,
            client: createPublicClient({
                chain: arbitrum,
                transport: http(RPC_URL),
            }),
        });
    }

    async claim(userAddress: Address) {
        const data = encodeFunctionData({
            abi: naiveDistributorAbi,
            functionName: 'claim',
            args: [userAddress]
        })
        const gas = await this.distributorContract.estimateGas.claim([userAddress], {
            account: userAddress,
        })
        return {
            from: userAddress,
            to: DISTRIBUTOR_ADDRESS,
            data,
            gas,
        };
    }

    async getAccruedAmount(userAddress: Address) {
        const amount = await this.distributorContract.read.accrued([userAddress]);
        return {
            amount,
            token: PENDLE_TOKEN,
        };
    }

    async getClaimedAmount(userAddress: Address) {
        const amount = await this.distributorContract.read.claimed([userAddress]);
        return {
            amount,
            token: PENDLE_TOKEN,
        };
    }
}

export default Distributor;