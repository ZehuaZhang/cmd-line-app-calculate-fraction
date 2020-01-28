import inquirer from 'inquirer'
import { isString } from '../utils/object.util'
import { isStringWithSpaces, getTrimmedString } from '../utils/string.util'
import { I_OpList } from '../interfaces/op.interface'
import { getFormalizedFraction } from '../utils/algorithms/calculator.util'

let opList: I_OpList

export function parseUserInputsFromCLI() {
    const questions = [
        {
            name: 'calculation',
            type: 'input',
            message: 'Enter Calculation:',
            validate: (value: string) => validate(value)
        }
    ]

    return inquirer.prompt(questions)
}

function validate(input: string) {
    opList = [] as any

    if (!isString(input) || isStringWithSpaces(input)) {
        return 'Please enter a non-empty string'
    }

    const inputList = input.split(' ')
        .map(word => getTrimmedString(word))
        .filter(word => word)

    const error = {
        message: ''
    }

    const operatorList = ['*', '/', '+', '-']

    inputList.some((op, index) => {
        if (index % 2) {
            if (!operatorList.includes(op)) {
                return error.message = `Invalid operator ${op}`
            }
            opList.push(op)

        } else {
            let integerText = null
            let fractionText = null
            const numberList = op.split('_').filter(number => number)
            if (numberList.length === 1) {
                if (op.startsWith('_')) {
                    integerText = '0'
                    fractionText = numberList[0]
                } else {
                    integerText = numberList[0]
                    fractionText = '1/1'
                }
            } else {
                integerText = numberList[0]
                fractionText = numberList[1]
            }

            if (fractionText && !fractionText.includes('/')) {
                fractionText += '/1'
            }

            const integer = integerText ? parseInt(integerText) : NaN
            if (!isString(integerText) && !isNaN(integer) && integer.toString() !== integerText) {
                return error.message = `Invalid integer for operand ${op}`
            }

            console.log(integerText, integer)

            const [numeratorText, denominatorText] = fractionText && fractionText.split('/') || [null, null]
            const [numerator, denominator] = [numeratorText, denominatorText].map(text => parseInt(text as string))
            if (!isString(numeratorText) || isNaN(numerator) || numerator < 0 || numerator.toString() !== numeratorText) {
                return error.message = `Invalid numerator for operand ${op}`
            }
            if (!isString(denominatorText) || !denominator || denominator < 0 || denominator.toString() !== denominatorText) {
                return error.message = `Invalid denominator for operand ${op}`
            }

            opList.push(getFormalizedFraction(integer, numerator, denominator))
        }
    })

    return error.message || true
}

export function getOpList() {
    return opList
}