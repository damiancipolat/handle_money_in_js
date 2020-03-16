//Conversion function.
const toCents = val => val*100;
const toNum   = val => Math.round(val)/100;

//Integer conversion.
const toInt = a => {
    const x = Number(a);
    return x < 0 ? Math.ceil(x) : Math.floor(x);
}

//Detector functions.
const isSafe  = n => (typeof n === 'number' && Math.round(n) === n && Number.MIN_SAFE_INTEGER <= n &&  n <= Number.MAX_SAFE_INTEGER);
const isEqual = (a,b) => Math.abs(a.number - b.number) < Number.EPSILON;
const isNaN 	= value => typeof value === 'number' && isNaN(value);

//Comparer functions.
const isLte = (a,b) => a.value <= b.value;
const isGte = (a,b) => a.value >= b.value;
const isLt  = (a,b) => a.value < b.value;
const isGt  = (a,b) => a.value > b.value;

//Money constructor.
const money = (number,value) =>{

	const moneyResult = number?{number,value:toCents(number)}:{number:toNum(value),value};
	
	if (!isSafe(moneyResult.value))
			throw new Error('Number exced integer SAFE range');

	return moneyResult;

}

//Arithmetic operators.
const add = (a,b) => money(null,a.value+b.value);
const sub = (a,b) => money(null,a.value-b.value);
const mul = (a,b) => money(null,a.value*b.value);
const div = (a,b) => money(null,a.value/b.value);

module.exports = {
	isSafe,
	isEqual,
	isNan,
	toInt,
	toCents,
	toNum,
	money,
	isLte,
	isGte,
	isLt,
	isGt,
	add,
	sub,
	mul,
	div
};