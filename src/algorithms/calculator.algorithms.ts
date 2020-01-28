import { I_OpList } from '../interfaces/op.interface'
import { getFormalizedFraction } from '../utils/algorithms/calculator.util'

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

function stringifyFraction(operand: number[]) {
    const [numeratorAggregated, denominator] = operand
    const integer = Math.trunc(numeratorAggregated / denominator)
    const numerator = Math.abs(numeratorAggregated) - Math.abs(integer)

    if (numerator) {
        return `${integer}_${numerator}/${denominator}`
    }

    return integer
}

function isOperator(op: string) {
    return "+-*/".includes(op)
}

function precedence(op: string) {
    switch (op) {
        case '+':
            return 1
        case '-':
            return 1
        case '*':
            return 2
        case '/':
            return 2
        default:
            return 0
    }
}

function compute(operands: number[][], operators: string[]) {
    const y = operands[operands.length - 1]
    operands.pop()

    const x = operands[operands.length - 1]
    operands.pop()

    const operator = operators[operators.length - 1]
    operators.pop()

    switch (operator) {
        case '+': 
            return operands.push(computeAddition(x, y))
        case '-':
            return operands.push(computeSubstraction(x, y))
        case '*':
            return operands.push(computeMultiply(x, y))
        case '/':
            return operands.push(computeDivide(x, y))
        default:
            return
    }
}

function computeAddition(operandA: number[], operandB: number[]) {
    const [numeratorA, denominatorA] = operandA
    const [numeratorB, denominatorB] = operandB

    return getFormalizedFraction(0, numeratorA * denominatorB + numeratorB * denominatorA, denominatorA * denominatorB)
}

function computeSubstraction(operandA: number[], operandB: number[]) {
    const [numeratorA, denominatorA] = operandA
    const [numeratorB, denominatorB] = operandB

    return getFormalizedFraction(0, numeratorA * denominatorB - numeratorB * denominatorA, denominatorA * denominatorB)
}

function computeMultiply(operandA: number[], operandB: number[]) {
    const [numeratorA, denominatorA] = operandA
    const [numeratorB, denominatorB] = operandB

    return getFormalizedFraction(0, numeratorA * numeratorB, denominatorA * denominatorB)
}

function computeDivide(operandA: number[], operandB: number[]) {
    const [numeratorA, denominatorA] = operandA
    const [numeratorB, denominatorB] = operandB

    return getFormalizedFraction(0, numeratorA * denominatorB, numeratorB * denominatorA)
}