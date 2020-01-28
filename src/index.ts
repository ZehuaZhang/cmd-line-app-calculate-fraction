import { parseUserInputsFromCLI, getOpList } from './libraries/parse.library'
import calculate from './algorithms/calculator.algorithms'

function app() {
    console.log()
    return parseUserInputsFromCLI()
        .then(input => {
            const opList = getOpList()
            const result = calculate(opList)
            console.log(result)
        })
        .catch(error => {
            console.error(error)
        })
        .finally(async () => {
            await app()
        })
}

app()