const toCode = (char: string, key: string): string => {
	const keyArr: string[] = key.split('')
	const charCode: string = char.charCodeAt(0).toString(4)
	const charCodeFull: string = '0'.repeat(4 - charCode.length) + charCode

	return keyArr.reduce((current, dna, index) => {
		const regex = new RegExp(index.toString(), 'g')
		return current.replace(regex, dna)
	}, charCodeFull)
}

const toChar = (code: string, key: string): string => {
	const keyArr: string[] = key.split('')
	const charCode: string = keyArr.reduce((current, dna, index) => {
		const regex = new RegExp(dna, 'g')
		return current.replace(regex, index.toString())
	}, code)

	return String.fromCharCode(parseInt(charCode, 4))
}

export const encrypt = (str: string, key: string): string => {
	const char: string[] = str.split('')

	return char.map(val => {
		return toCode(val, key)
	}).join('')
}

export const decrypt = (str: string, key: string): string => {
	const char: RegExpMatchArray | null = str.match(/.{4}/g)

	if (char == null)
		return ''

	return char.map(val => {
		return toChar(val, key)
	}).join('')
}
