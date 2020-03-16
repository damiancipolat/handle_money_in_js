<img src="https://github.com/damiancipolat/handle_money_in_js/blob/master/doc/js-logo.png?raw=true" width="150px" align="right" />

# Handle money with JS
Differentes ways of how to handle money values using JS, some recommended libraries and a custom implementation

I makes this project because I consider that it is necessary to demonstrate how JS 
can be a **technology reliable to use in systems that handle money**.JS is not known to have the best reputation
in what is the handling of numbers, this in part is due to certain inaccuracies in operations
floating point.

**Origin**: surely everyone saw this example: 0.1 + 0.2 = 0.30000000000000004, wow it is something very rare and one would say
WTF? But why is this happening? This is due to the **IEEE 754 standard**, which proposes the use of point numbers
floating binary. I am not going to explain here about this standard, there are hundreds of links that have already
done I leave some.

- http://steve.hollasch.net/cgindex/coding/ieeefloat.html
- https://en.wikipedia.org/wiki/IEEE_754

## Does this happen only in JS? 
NO! It happens exactly in python and JAVA:

### **Python code:**
The same situation in **python**.

<img src="https://github.com/damiancipolat/handle_money_in_js/blob/master/doc/python.png?raw=true" width="600px"/>

### **Java code:**
The same situation in **JAVA**!!

<img src="https://github.com/damiancipolat/handle_money_in_js/blob/master/doc/java-script.png?raw=true" width="600px"/>

### Surprised?
<img src="https://github.com/damiancipolat/handle_money_in_js/blob/master/doc/yes.gif?raw=true" align="center" width="300px"/>

These two languages are reliable to work with numbers, surely yes! so javascript too. They all use the IEEE 754 standard.

## How to handle money?
Use decimals and floating point is the best way? I think it is the **most natural** way when we think about it, but
not necessarily the best, due to the imprecision and rounding of this standard. Here you can read a little about
this https://husobee.github.io/money/float/2016/09/23/never-use-floats-for-currency.html.

**Example:**
I sell 165 apples at $1.40 per apple. My accounting software uses floating point numbers for the calculation.

```sh
>>> 165 * 1.40
230.99999999999997
```

As you can see in this example, you would need to perform rounding yourself to get the correct number. Here is another common example, you are changing the the price of bananas from $1.01 to $0.99 and need to calculate the lost revenue.

```sh
>>> 1.01 - 0.99
0.020000000000000018
```

## Then what do I do?
Well there is a pattern created by Martin fowler https://martinfowler.com/eaaCatalog/money.html, in which
Money is considered as a type of data and not just a simple number.

There is a technique to solve these problems and it is simple, maybe not the best, but it is simple to develop.
and effective. We can transform a decimal value into its representation in cents. In this way we avoid
floating point details.

```sh
EXPECTED RESULT
===============
1     ===   $0.01;
10    ===   $0.10;
100   ===   $1.00;
1000  ===  $10.00;
10000 === $100.00;

$1.00 *  $0.01 ===  $0.01
$1.00 *  $0.10 ===  $0.10
$1.00 *  $1.00 ===  $1.00
$1.00 * $10.00 === $10.00
```

### Problems with use INTEGERS?
- We do extra operations.
- JS does not offer an infinite range of integers Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER.

### How to do this?
We have to add two values 0.2 and 0.1, if we do it directly with JS we already know that there will be problems.

1) Multiply each value by 100: (0.2 * 100 + 0.1 * 100) = 30 cents.
2) Recover the value to money: (0.2 * 100 + 0.1 * 100) / 100 = 0.3.

#### Code:
There are several ways we can use libraries like:
- Dinero.js, https://dinerojs.com/
- Finance.js, http://financejs.org/
- Money.js, https://www.npmjs.com/package/moneyjs
- Money Safe. https://github.com/ericelliott/moneysafe

Or perform a custom implementation ourselves, if we do we will have to worry about giving support
to these operations. For the moment, we are going to avoid making conversions to other types of currency.

- Sum
- Subtraction
- Division
- Multiplication
- Same
- Minor / Less equal
- Greater / Greater equal.

In this link you can see an implementation made by me in vanilla JS of this. https://github.com/damiancipolat/handle_money_in_js/blob/master/simple_money.js
```javascript
const {
	money,
	isEqual,
	isGt,
	add,
	sub,
	mul	
} = require('./simple_money.js');

const payment = money(100.20);
const loan	  = money(15000);
const bill 	  = money(6000);
const debth	  = money(2000.60);

const addRes = add(payment,bill);
console.log(`${payment.number} + ${bill.number} = ${addRes.number}`);

const subRes = sub(loan,debth);
console.log(`${loan.number} + ${debth.number} = ${subRes.number}`);

console.log(`${payment.number} + ${debth.number} = `,isEqual(payment,bill));
console.log(`${payment.number} + ${payment.number} = `,isEqual(payment,payment));
```

**To run**:

```sh
$ node test.js
100.2 + 6000 = 6100.2
15000 + 2000.6 = 12999.4
100.2 + 2000.6 =  false
100.2 + 100.2 =  true
```

Basically magic consists in some basic functions:
```javascript

const Money = (ammount, value) => ammount?{ammount,value:ammount*100}:{ammount:value/100,value};

//Sum function.
const sum = (a,b) => Money(null,a.value+b.value);

//Payment
const payment = Money(30.342141);

//Bill
const bill = Money(30.342141);

//Test
sum(payment,bill) = {ammount: 60.684282, value: 6068.4282}

```

There is no need for major operations to work with money in a simple system.


## Strings and money.
In several countries the representation of money is not standard and differs from how it is in the USA, so how is it handled?

It is very common to have a field in our frontend to deposit money. For example in Argentina, money is represented:
$ 100,000.85 the "." Is used as a thousands separator and the "," to separate decimals.

It is very convenient in this case, to take the money to the same way that is how JS uses it.
$ 100,000.85 -> 100000.85 with two decimal digits, with this we can save it to our BD or use it
for calculations. I call this normalization and it is important that you keep that in mind.

Now having said that we should use the monetary value as its representation in cents,
We can also choose to save it in this same form in a bd or to do operations.

## Round out:
Use two numbers, three numbers? the reality that that depends on the system we are using,
in general it is usually rounded up and with two numbers. Math.floor (). The advantage of using pennies is that it gives us a
greater degree of certainty than if we used decimals.

EYE! In JS the integers are not infinite, numerical representations can be made between these two values.

Number.MIN_SAFE_INTEGER = -9007199254740991
Number.MAX_SAFE_INTEGER = 9007199254740991

Outside this range, accurate results cannot be assured.

## Continure reading
This list of links, was the material used for this project, there are very interesting articles abount number in JS and after how to use it for handle money.

**Numbers**
- https://youtu.be/MqHDDtVYJRI
- https://medium.com/@sarafecadu/javascript-numbers-and-the-mystery-0s-b087c5cf21e2
- https://medium.com/@sarafecadu/64-bit-floating-point-a-javascript-story-fa6aad266665
- http://2ality.com/2012/04/number-encoding.html
- http://speakingjs.com/es5/ch11.html
- https://2ality.com/2012/03/displaying-numbers.html
- https://2ality.com/2012/02/nan-infinity.html
- https://2ality.com/2012/03/signedzero.html
- https://2ality.com/2012/01/object-plus-object.html
- https://2ality.com/2012/02/js-integers.html
- http://speakingjs.com/es5/ch11.html

**Money**
- https://stackoverflow.com/questions/2876536/precise-financial-calculation-in-javascript-what-are-the-gotchas
- https://medium.com/@magnusjt/how-to-handle-money-in-javascript-b954d612373c
- https://frontstuff.io/how-to-handle-monetary-values-in-javascript
- https://itnext.io/how-to-build-a-money-data-type-in-javascript-7b622beabe00
- https://husobee.github.io/money/float/2016/09/23/never-use-floats-for-currency.html


