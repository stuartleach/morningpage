let n = {
	0: 'zero',
	1: 'one',
	2: 'two',
	3: 'three',
	4: 'four',
	5: 'five',
	6: 'six',
	7: 'seven',
	8: 'eight',
	9: 'nine',
	10: 'ten',
	11: 'eleven',
	12: 'twelve',
	13: 'thirteen',
	14: 'fourteen',
	15: 'fifteen',
	16: 'sixteen',
	17: 'seventeen',
	18: 'eighteen',
	19: 'nineteen',
	20: 'twenty',
	30: 'thirty',
	40: 'forty',
	50: 'fifty',
	60: 'sixty',
	70: 'seventy',
	80: 'eighty',
	90: 'ninety',
	100: 'hundred',
	1000: 'thousand',
	1000000: 'million',
	1000000000: 'billion',
}

const numToString = (num) => {
	let s = num.toString()
	let result = ''

	const hundreds = s.slice(-3)
	const thousands = s.slice(-6, -3)
	const millions = s.slice(-9, -6)

	if (millions && millions < 100) {
		if (millions < 20) {
			result += n[parseInt(millions)] + ' million '
		} else if (millions < 100) {
			result += n[millions[1] * 10] + ' ' + n[millions[2]]
		}
	} else {
		result +=
			n[millions[0]] +
			' million ' +
			n[millions[1] * 10] +
			' ' +
			n[millions[2]]
	}

	if (thousands && thousands < 100) {
		if (thousands < 20) {
			result += n[parseInt(thousands)] + ' thousand '
		} else if (thousands < 100) {
			result += n[thousands[1] * 10] + ' ' + n[thousands[2]]
		}
	} else {
		result +=
			n[thousands[0]] +
			' thousand ' +
			n[thousands[1] * 10] +
			' ' +
			n[thousands[2]]
	}

	if (hundreds && hundreds < 100) {
		if (hundreds < 20) {
			result += n[parseInt(hundreds)]
		} else if (hundreds < 100) {
			result += n[hundreds[1] * 10] + ' ' + n[hundreds[2]]
		}
	} else {
		result +=
			n[hundreds[0]] +
			' hundred ' +
			n[hundreds[1] * 10] +
			' ' +
			n[hundreds[2]]
	}

	return result
	/*
	let noOfDigits = num.toString().length;
	const doOne = (y) => {
		if (y < 1) {
			return '';
		} else {
			return n[y];
		}
	};
	const doTwo = (y) => {
		const s = y.toString();
		if (y && y < 20) {
			return n[y];
		} else {
			return (
				n[parseInt(s[0]) * 10] +
				' ' +
				(parseInt(s) ? doOne(parseInt(s.slice(1))) : '')
			);
		}
	};

	const doThree = (y) => {
		const s = y.toString();
		return (
			n[s[0]] +
			' ' +
			(y >= 100 ? n[100] : '') +
			' ' +
			(parseInt(s.slice(1)) ? doTwo(parseInt(s.slice(1))) : '')
		);
	};

	const doFour = (y) => {
		const s = y.toString();
		return (
			doOne(parseInt(s.slice(0, 1))) +
			' ' +
			(y >= 1000 ? n[1000] : '') +
			' ' +
			(parseInt(s.slice(1)) ? doThree(parseInt(s.slice(-3))) : '')
		);
	};
	const doFive = (y) => {
		const s = y.toString();
		return (
			doTwo(parseInt(s.slice(0, 2))) +
			' ' +
			(y >= 1000 ? n[1000] : '') +
			' ' +
			(parseInt(s.slice(1)) ? doThree(parseInt(s.slice(-3))) : '')
		);
	};
	const doSix = (y) => {
		const s = y.toString();
		return (
			doThree(parseInt(s.slice(0, 3))) +
			' ' +
			(y >= 1000 ? n[1000] : '') +
			' ' +
			doThree(parseInt(s.slice(-3)))
		);
	};

	const digitTester = {
		0: n[0],
		1: n[num],
		2: doTwo(num),
		3: doThree(num),
		4: doFour(num),
		5: doFive(num),
		6: doSix(num),
	};

	return digitTester[noOfDigits].replace(/\s+/g, ' ');

	*/
}
console.log(numToString(1129114))

// console.log(numToString(100090));
// numToString(100090);

// console.log(
// 	// numToString(100001) +
// 	// numToString(10000) +
// 	// numToString(8400) +
// 	// numToString(1000) +
// 	// numToString(9001) +
// 	// numToString(901) +
// 	// numToString(95) +
// 	numToString(100090)
// );

// export default numToString;

/* const wordCounter = (props) => {
	let topWords = {}
	let mostWords = {}
	let wordArr = entry.split(' ')
	const num = 5
	for (let i = 0; i < wordArr.length; i++) {
		if (!topWords[wordArr[i]]) {
			topWords[wordArr[i]] = 1
		} else {
			topWords[wordArr[i]] += 1
		}
	}

	Object.keys(topWords)
		.sort((a, b) => topWords[b] - topWords[a])
		.forEach((key, ind) => {
			if (ind < num) {
				mostWords[key] = topWords[key]
			}
		})

	const topArr = []
	Object.keys(mostWords).map((x) => topArr.push(x))
	return topArr
}

export { wordCounter } */
