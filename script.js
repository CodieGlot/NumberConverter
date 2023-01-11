const digits = "0123456789ABCDEF";

function validateUserInput(input, inputBase){
	const validChars = digits.slice(0, inputBase);
	return input.split("").every(x => validChars.includes(x));
}

function convertToDecimal(input, inputBase){
	let res = 0;
	let inputArr = input.split("").reverse();
	inputArr.forEach((x, i) => {
		res += parseInt(x, inputBase) * (inputBase ** i);
	});

	return res;
}

function convertFromDecimal(num, outputBase){
	let output = [];
	while(num !== 0){
		output.unshift(digits[num % outputBase]);
		num = Math.floor(num / outputBase);
	}
	return output.join("");
}

document.querySelector("form").addEventListener("submit", (event) => {
	event.preventDefault();

	const input = document.getElementById("input").value.toUpperCase();
	const inputBase = parseInt(document.getElementById("input-base").value);
	const outputBase = parseInt(document.getElementById("output-base").value);

	let output = "";
	if(!validateUserInput(input, inputBase)){
		document.getElementById("output").textContent = "Nhap sai roi nhap lai di ban oi";
		return;
	}

	let num = (inputBase === 10) ? parseInt(input) : convertToDecimal(input, inputBase);

	output = (outputBase === 10) ? num : convertFromDecimal(num, outputBase);

	document.getElementById("output").textContent = output;
})