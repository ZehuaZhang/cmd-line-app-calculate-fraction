import { I_OpList } from '../interfaces/op.interface'
import { isOperator, precedence, compute, stringifyFraction } from '../utils/algorithms/calculator.util'

export default function calculate(opList: I_OpList) {
    const operands: number[][] = []
    const operators: string[] = []
    opList.forEach(op => {
        if (isOperator(op as string)) {
            const operator = op as string
            while (operators.length && precedence(operator) <= precedence(operators[operators.length])) {
                compute(operands, operators);
            }
            operators.push(operator);
        } else {
            operands.push(op as number[])
        }
    })

    while (operators.length) {
        compute(operands, operators)
    }

    return stringifyFraction(operands[operands.length - 1])
}