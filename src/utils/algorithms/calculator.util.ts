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