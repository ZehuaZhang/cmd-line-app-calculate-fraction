import { parseUserInputsFromCLI, getOpList } from './libraries/parse.library'
import calculate from './algorithms/calculator.algorithms'
import { EXIT } from './utils/constants.util'

function app() {
    let shouldExit = false
    console.log()
    return parseUserInputsFromCLI()
        .then(input => {
            if (shouldExit = input.calculation === EXIT) {
                return
            }

            const opList = getOpList()
            const result = calculate(opList)
            console.log(`  Result\t   : ${result}`)
        })
        .catch(error => {
            console.error(error)
        })
        .finally(async () => {
            if (shouldExit) {
                return
            }
            await app()
        })
}

app()