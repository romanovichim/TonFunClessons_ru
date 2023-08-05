let camelCaseToArray = (camelCaseString) => {
	if(camelCaseString.charAt(0).charCodeAt(0) < 97) {
		camelCaseString = camelCaseString.charAt(0).toLowerCase() + camelCaseString.slice(1);
	}
	let res = camelCaseString.replace(/([A-Z])/g, " $1");
	return res.toLowerCase().split(" ");
}

let snakeCaseToArray = (snakeCaseString) => {
	return snakeCaseString.replace(/-/g, "_").toUpperCase();
}

let pascalCaseToCapital = (pascalCaseString) => {
	return pascalCaseString.replace(/([A-Z])/g, ' $1').slice(1);
}

let kebabCaseToArray = (kebabCaseString) => {
	return kebabCaseString.replace(/-/g, "_").toUpperCase();
}

let capitalCaseToArray = (capitalCaseString) => {
	return capitalCaseString.split(" ").map(val => val.toLowerCase());
}

let constantCaseToArray = (constantCaseString) => {
	return constantCaseString.split("_").map(val => val.toLowerCase());
}

// One case to another case method group.

/**
 * A method for converting camelCase or CamelCase string to Capital Case string.
 * @param {string} camelCaseString camelCase string for converting in capital case.
 * @returns {string} `Capital Case` string.
 */
let camelToCapital = (camelCaseString) => {
	return camelCaseToArray(camelCaseString)
		.map(val => val.charAt(0).toUpperCase() + val.slice(1)).join(" ");
}


/**
 * A method for converting camelCase or CamelCase string to CONSTENT_CASE string.
 * @param {string} camelCaseString camelCase string for converting in CONSTENT_CASE.
 * @returns {string} `CONSTENT_CASE` string.
 */
let camelToConstant = (camelCaseString) => {
	return camelCaseToArray(camelCaseString).map(val => val.toUpperCase()).join("_");
}


/**
 * A method for converting camelCase or CamelCase string to Kebab-Case string.
 * @param {string} camelCaseString camelCase string for converting in Kebab-Case.
 * @param {boolean} isCapital If you want the first letter of the kebab case to be capital. default `true`
 * @returns {string} `Kebab-Case` string.
 */
let camelToKebab = (camelCaseString, isCapital = true) => {
	if(isCapital) {
		return camelCaseToArray(camelCaseString).map(val => val.charAt(0).toUpperCase() + val.slice(1)).join("-");
	}else {
		return camelCaseToArray(camelCaseString).join("-");
	}
}


/**
 * A method for converting camelCase or CamelCase string to PascalCase string.
 * @param {string} camelCaseString camelCase string for converting in PascalCase.
 * @returns {string} `PascalCase` string.
 */
let camelToPascal = (camelCaseString) => {
	return camelCaseString.charAt(0).toUpperCase() + camelCaseString.slice(1);
}


/**
 * A method for converting camelCase or CamelCase string to snake_case string.
 * @param {string} camelCaseString camelCase string for converting in snake_case.
 * @param {boolean} isCapital If you want the first letter of the snake case to be capital.. default `true`
 * @returns {string} `Snake_Case` string.
 */
let camelToSnake = (camelCaseString, isCapital = true) => {
	if(isCapital) {
		return camelCaseToArray(camelCaseString).map(val => val.charAt(0).toUpperCase() + val.slice(1)).join("_");
	}else {
		return camelCaseToArray(camelCaseString).join("_");
	}
}

/**
 * A method for converting Capitaal Case string to camelCase string.
 * @param {string} capitalCaseString Capitaal Case string for converting in camelCase.
 * @param {boolean} isCapital if true return UpperCamelCase string, default `false`.
 * @returns {string} `camelCase` or `UpperCamelCase` string.
 */
let capitalToCamel = (capitalCaseString, isCapital = false) => {
	let res = capitalCaseString.replace(/ /g, "");
	if(!isCapital){
		return res.charAt(0).toLowerCase() + res.slice(1);
	}else {
		return res;
	}
}

/**
 * A method for converting Capitaal Case string to CONSTENT_CASE string.
 * @param {string} capitalCaseString Capitaal Case string for converting in CONSTENT_CASE.
 * @returns {string} `CONSTENT_CASE` string.
 */
let capitalToConstant = (capitalCaseString) => {
	return capitalCaseToArray(capitalCaseString).map(val => val.toUpperCase()).join("_");
}

/**
 * A method for converting Capitaal Case string to Kebab-Case string.
 * @param {string} capitalCaseString Capitaal Case string for converting in Kebab-Case.
 * @param {boolean} isCapital If you want the first letter of the kebab case to be capital. default `true`
 * @returns {string} `Kebab-Case` string.
 */
let capitalToKebab = (capitalCaseString, isCapital = true) => {
	if(isCapital) {
		return capitalCaseToArray(capitalCaseString).map(val => val.charAt(0)
			.toUpperCase() + val.slice(1).toLowerCase()).join("-");
	}else {
		return capitalCaseToArray(capitalCaseString).map(val => val.toLowerCase()).join("-");
	}
}

/**
 * A method for converting Capitaal Case string to PascalCase string.
 * @param {string} capitalCaseString Capitaal Case string for converting in PascalCase.
 * @returns {string} `PascalCase` string.
 */
let capitalToPascal = (capitalCaseString) => {
	return capitalCaseString.replace(/ /g, "");
}

/**
 * A method for converting Capitaal Case string to snake_case string.
 * @param {string} capitalCaseString Capitaal Case string for converting in snake_case.
 * @param {boolean} isCapital If you want the first letter of the snake case to be capital. default `true`
 * @returns {string} `snake_case` string.
 */
let capitalToSnake = (capitalCaseString, isCapital = true) => {
	if(isCapital) {
		return capitalCaseToArray(capitalCaseString).map(val => val.charAt(0)
			.toUpperCase() + val.slice(1).toLowerCase()).join("_");
	}else {
		return capitalCaseToArray(capitalCaseString).map(val => val.toLowerCase()).join("_");;
	}
}

/**
 * A method for converting CONSTANT_CASE string to camelCase string.
 * @param {string} constantCaseString CONSTANT_CASE string for converting in camelCase.
 * @param {boolean} isCapital If you want the first letter of the camelCase to be capital. default `false`
 * @returns {string} `camelCase` string.
 */
let constantToCamel = (constantCaseString, isCapital = false) => {
	let res = constantCaseToArray(constantCaseString).map(val => val.charAt(0).toUpperCase() + val.slice(1)).join("");
	return isCapital ? res : res.charAt(0).toLowerCase() + res.slice(1);
}

/**
 * A method for converting CONSTANT_CASE string to Capital Case string.
 * @param {string} constantCaseString CONSTANT_CASE string for converting in Capital Case.
 * @returns {string} `Capital Case` string.
 */
let constantToCapital = (constantCaseString) => {
	return constantCaseToArray(constantCaseString).map(val => val.charAt(0).toUpperCase() + val.slice(1)).join(" ");
}

/**
 * A method for converting CONSTANT_CASE string to Kebab-Case string.
 * @param {string} constantCaseString CONSTANT_CASE string for converting in Kebab-Case.
 * @param {boolean} isCapital If you want the first letter of the Capital Case to be capital. default `true`
 * @returns {string} `Kebab-Case` string.
 */
let constantToKebab = (constantCaseString, isCapital = true) => {
	let res = constantCaseToArray(constantCaseString);
	return isCapital ? res.map(val => val.charAt(0).toUpperCase() + val.slice(1)).join("-") : res.join("-");
}

/**
 * A method for converting CONSTANT_CASE string to PascalCase string.
 * @param {string} constantCaseString CONSTANT_CASE string for converting in PascalCase.
 * @returns {string} `PascalCase` string.
 */
let constantToPascal = (constantCaseString) => {
	return constantCaseToArray(constantCaseString).map(val => val.charAt(0).toUpperCase() + val.slice(1)).join("");
}

/**
 * A method for converting CONSTANT_CASE string to Snake_Case string.
 * @param {string} constantCaseString CONSTANT_CASE string for converting in Snake_Case.
 * @param {boolean} isCapital If you want the first letter of the Snake_Case to be capital. default `true`
 * @returns {string} `Snake_Case` string.
 */
let constantToSnake = (constantCaseString, isCapital = true) => {
	let res = constantCaseToArray(constantCaseString);
	return isCapital ? res.map(val => val.charAt(0).toUpperCase() + val.slice(1)).join("_") : res.join("_");
}

/**
 * A method for converting kebab-case string to camelCase string.
 * @param {string} kebabCaseString kebab-case string for converting in camelCase.
 * @param {boolean} isCapital If you want the first letter of the camelCase to be capital. default `false`
 * @returns {string} `camelCase` string.
 */
let kebabToCamel = (kebabCaseString, isCapital = false) => {
	return constantToCamel(kebabCaseToArray(kebabCaseString), isCapital);
}

/**
 * A method for converting Kebab-Case or kebab-case string to Capital Case string.
 * @param {string} kebabCaseString Kebab-Case string for converting in capital case.
 * @returns {string} `Capital Case` string.
 */
let kebabToCapital = (kebabCaseString) => {
	return constantToCapital(kebabCaseToArray(kebabCaseString));
}

/**
 * A method for converting Kebab-Case or kebab-case string to CONSTENT_CASE string.
 * @param {string} kebabCaseString Kebab-Case string for converting in CONSTENT_CASE.
 * @returns {string} `CONSTENT_CASE` string.
 */
let kebabToConstant = (kebabCaseString) => {
	return kebabCaseToArray(kebabCaseString);
}

/**
 * A method for converting Kebab-Case or kebab-case string to PascalCase string.
 * @param {string} kebabCaseString Kebab-Case string for converting in PascalCase.
 * @returns {string} `PascalCase` string.
 */
let kebabToPascal = (kebabCaseString) => {
	return constantToPascal(kebabCaseToArray(kebabCaseString));
}

/**
 * A method for converting Kebab-Case or kebab-case string to Snake_Case string.
 * @param {string} kebabCaseString kebab-case string for converting in Snake_Case.
 * @param {boolean} isCapital If you want the first letter of the Snake_Case to be capital. default `true`
 * @returns {string} `Snake_Case` string.
 */
let kebabToSnake = (kebabCaseString, isCapital = true) => {
	return constantToSnake(kebabCaseToArray(kebabCaseString), isCapital);
}

/**
 * A method for converting PascalCase string to camelCase string.
 * @param {string} pascalCaseString PascalCase string for converting in camelCase.
 * @param {boolean} isCapital if true return UpperCamelCase string, default `false`.
 * @returns {string} `camelCase` or `UpperCamelCase` string.
 */
let pascalToCamel = (pascalCaseString, isCapital = false) => {
	return capitalToCamel(pascalCaseToCapital(pascalCaseString), isCapital);
}

/**
 * A method for converting PascalCase string to Capital Case string.
 * @param {string} pascalCaseString PascalCase string for converting in Capital Case.
 * @returns {string} `Capital Case` string.
 */
let pascalToCapital = (pascalCaseString) => {
	return pascalCaseToCapital(pascalCaseString);
}

/**
 * A method for converting PascalCase string to CONSTENT_CASE string.
 * @param {string} pascalCaseString PascalCase string for converting in CONSTENT_CASE.
 * @returns {string} `CONSTENT_CASE` string.
 */
let pascalToConstant = (pascalCaseString) => {
	return capitalToConstant(pascalCaseToCapital(pascalCaseString));
}

/**
 * A method for converting PascalCase string to Kebab-Case string.
 * @param {string} pascalCaseString PascalCase string for converting in Kebab-Case.
 * @param {boolean} isCapital If you want the first letter of the kebab-case to be capital. default `true`
 * @returns {string} `Kebab-Case` string.
 */
let pascalToKebab = (pascalCaseString, isCapital = true) => {
	return capitalToKebab(pascalCaseToCapital(pascalCaseString), isCapital);
}

/**
 * A method for converting PascalCase string to Snake_Case string.
 * @param {string} pascalCaseString PascalCase string for converting in Snake_Case.
 * @param {boolean} isCapital If you want the first letter of the Snake_Case to be capital. default `true`
 * @returns {string} `Snake_Case` string.
 */
let pascalToSnake = (pascalCaseString, isCapital = true) => {
	return capitalToSnake(pascalCaseToCapital(pascalCaseString), isCapital);
}

/**
 * A method for converting snake_case or Snake_Case string to camelCase string.
 * @param {string} snakeCaseString snake_case or Snake_Case string for converting in camelCase.
 * @param {boolean} isCapital If you want the first letter of the camelCase to be capital. default `false`
 * @returns {string} `camelCase` string.
 */
let snakeToCamel = (snakeCaseString, isCapital = false) => {
	return constantToCamel(snakeCaseToArray(snakeCaseString), isCapital);
}

/**
 * A method for converting snake_case or Snake_Case string to Capital Case string.
 * @param {string} snakeCaseString snake_case string for converting in capital case.
 * @returns {string} `Capital Case` string.
 */
let snakeToCapital = (snakeCaseString) => {
	return constantToCapital(snakeCaseToArray(snakeCaseString));
}

/**
 * A method for converting snake_case or Snake_Case string to CONSTENT_CASE string.
 * @param {string} snakeCaseString snake_case string for converting in CONSTENT_CASE.
 * @returns {string} `CONSTENT_CASE` string.
 */
let snakeToConstant = (snakeCaseString) => {
	return snakeCaseToArray(snakeCaseString);
}

/**
 * A method for converting snake_case or Snake_Case string to Kebab-Case string.
 * @param {string} snakeCaseString snake_case string for converting in Kebab-Case.
 * @param {boolean} isCapital If you want the first letter of the kebab-case to be capital. default `true`
 * @returns {string} `Kebab-Case` string.
 */
let snakeToKebab = (snakeCaseString, isCapital = true) => {
	return constantToKebab(snakeCaseToArray(snakeCaseString), isCapital);
}

/**
 * A method for converting snake_case or Snake_Case string to PascalCase string.
 * @param {string} snakeCaseString snake_case string for converting in PascalCase.
 * @returns {string} `PascalCase` string.
 */
let snakeToPascal = (snakeCaseString) => {
	return constantToPascal(snakeCaseToArray(snakeCaseString));
}

module.exports = {
	camelToCapital,
	camelToConstant,
	camelToKebab,
	camelToPascal,
	camelToSnake,
	capitalToCamel,
	capitalToConstant,
	capitalToKebab,
	capitalToPascal,
	capitalToSnake,
	constantToCamel,
	constantToCapital,
	constantToKebab,
	constantToPascal,
	constantToSnake,
	kebabToCamel,
	kebabToCapital,
	kebabToConstant,
	kebabToPascal,
	kebabToSnake,
	pascalToCamel,
	pascalToCapital,
	pascalToConstant,
	pascalToKebab,
	pascalToSnake,
	snakeToCamel,
	snakeToCapital,
	snakeToConstant,
	snakeToKebab,
	snakeToPascal
}
