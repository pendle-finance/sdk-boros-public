import { PendleContractErrorsAbi } from '../src/contracts';
import { writeTsThenFormat } from './writeTsThenFormat';

const FILENAME = './src/errors/PendleContractError/type.ts';
const lines = [];

lines.push(`
// This file is generated via \`yarn generateContractErrors\`
import { Address, Hex } from 'viem';

/**
 * This type is generated from the ABI of Pendle contract Errors.
 *
 * @see https://github.com/pendle-finance/pendle-core-v3/blob/main/contracts/lib/Errors.sol
 */
`);
lines.push('export type PendleContractErrorMessageHandler = {');

function abiPrimitiveTypeToTypescript(t: string) {
    if (t === 'address') {
        return 'Address';
    }
    if (/^u?int\d{1,3}$/.test(t)) {
        return 'bigint';
    }
    if (/^bytes\d*$/.test(t)) {
        return 'Hex';
    }
    if (t === 'bool') {
        return 'boolean';
    }
    throw new Error(`Can not map TS type for solidity type ${JSON.stringify(t)}`);
}

for (const fragment of PendleContractErrorsAbi) {
    if (fragment.type !== 'error') {
        continue;
    }
    lines.push(
        `\t${fragment.name}: (${fragment.inputs
            // @ts-ignore
            .map((input, index) => `${input.name || `param_${index}`}: ${abiPrimitiveTypeToTypescript(input.type)}`)
            .join(', ')}) => string;`
    );
}

lines.push('};');

writeTsThenFormat(FILENAME, lines.join('\n'));
