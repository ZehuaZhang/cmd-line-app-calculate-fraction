export function stringifyFraction(operand: number[]) {
    const [numeratorAggregated, denominator] = operand
    const integer = Math.trunc(numeratorAggregated / denominator)
    const numerator = Math.abs(numeratorAggregated) % denominator

    if (numerator) {
        return `${integer}_${numerator}/${denominator}`
    }

    return integer
}

export function isOperator(op: string) {
    return "+-*/".includes(op)
}

export function precedence(op: string) {
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

export function compute(operands: number[][], operators: string[]) {
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

export function computeAddition(operandA: number[], operandB: number[]) {
    const [numeratorA, denominatorA] = operandA
    const [numeratorB, denominatorB] = operandB

    return getFormalizedFraction(0, numeratorA * denominatorB + numeratorB * denominatorA, denominatorA * denominatorB)
}

export function computeSubstraction(operandA: number[], operandB: number[]) {
    const [numeratorA, denominatorA] = operandA
    const [numeratorB, denominatorB] = operandB

    return getFormalizedFraction(0, numeratorA * denominatorB - numeratorB * denominatorA, denominatorA * denominatorB)
}

export function computeMultiply(operandA: number[], operandB: number[]) {
    const [numeratorA, denominatorA] = operandA
    const [numeratorB, denominatorB] = operandB

    return getFormalizedFraction(0, numeratorA * numeratorB, denominatorA * denominatorB)
}

export function computeDivide(operandA: number[], operandB: number[]) {
    const [numeratorA, denominatorA] = operandA
    const [numeratorB, denominatorB] = operandB

    return getFormalizedFraction(0, numeratorA * denominatorB, numeratorB * denominatorA)
}

export function getFormalizedFraction(integer: number, numerator: number, denominator: number) {
    const factor = gcd(numerator, denominator)
    numerator /= factor
    denominator /= factor

    numerator = (Math.abs(integer) * denominator + numerator)
    
    if (Math.sign(integer)) {
        numerator *= Math.sign(integer)
    }

    return [numerator, denominator]
}

function gcd(a: number, b: number): number {
    return b ? gcd(b, a % b): a
}