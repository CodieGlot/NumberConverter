const digits = "0123456789ABCDEF";

function validateUserInput(input, inputBase){
	const validChars = digits.slice(0, inputBase);
	return input.split("").every(x => validChars.includes(x) || x === ".") && input.split(".").length < 3;
}

function convertToDecimal(input, inputBase){
	let res = 0;

	input.split().reverse().forEach((x, i) => {
		res += parseInt(x, inputBase) * (inputBase ** i);
	});

	return res;
}

function convertFromDecimal(num, outputBase){
	let output = [];
	while(num !== 0){
		output.push(digits[num % outputBase]);
		num = Math.floor(num / outputBase);
	}
	return output.reverse().join("");
}

function convertFracToDecimal(input, inputBase){
	let res = 0;
	input.split("").forEach((x, i) => {
		res += parseInt(x, inputBase) / (inputBase ** (i+1));
		console.log(res);
	})
	
	return res;
}

function convertFracFromDecimal(num, outputBase){
	let output = [];
	for(let i= 0; i != 10; i++){
		num *= outputBase;
		output.push(digits[Math.floor(num)]);
		num -= Math.floor(num);
		if(num === 0) break;
	}
	return output.join("");
}

document.querySelector("form").addEventListener("submit", (event) => {
	event.preventDefault();

	const input = document.getElementById("input").value.toUpperCase();
	const inputBase = parseInt(document.getElementById("input-base").value);
	const outputBase = parseInt(document.getElementById("output-base").value);

	if(!validateUserInput(input, inputBase)){
		document.getElementById("output").textContent = "You've typed the invalid number for the selected base. Type again !";
		return;
	}

	let inte = "", frac = "";
	if(input.includes('.')) [inte, frac] = input.split(".");
	else inte = input;

	let num = (inputBase === 10) ? parseInt(inte) : convertToDecimal(inte, inputBase);

	let output = (outputBase === 10) ? num : convertFromDecimal(num, outputBase);

	if(frac !== ""){
		let fracVal = (inputBase === 10) ? parseFloat("0." + frac) : convertFracToDecimal(frac, inputBase);
		output += (outputBase === 10) ? fracVal.toString().slice(1) : "." + convertFracFromDecimal(fracVal, outputBase);
	}

	document.getElementById("output").textContent = output;
})
