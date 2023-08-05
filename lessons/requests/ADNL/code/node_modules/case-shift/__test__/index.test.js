const {
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
} = require("../index");


// For camelToX

test("Test: camelToCapital: for small camelCase", () => {
	expect(camelToCapital("isAnString")).toBe("Is An String");
});

test("Test: camelToCapital: for capital camelCase", () => {
	expect(camelToCapital("IsAnString")).toBe("Is An String");
});

test("Test: camelToConstant: for small camelCase", () => {
	expect(camelToConstant("isAnString")).toBe("IS_AN_STRING");
});

test("Test: camelToConstant: for capital camelCase", () => {
	expect(camelToConstant("IsAnString")).toBe("IS_AN_STRING");
});

test("Test: camelToKebab | true: for small camelCase", () => {
	expect(camelToKebab("isAnString", true)).toBe("Is-An-String");
});

test("Test: camelToKebab | false: for small camelCase", () => {
	expect(camelToKebab("isAnString", false)).toBe("is-an-string");
});

test("Test: camelToKebab | true: for capital camelCase", () => {
	expect(camelToKebab("IsAnString", true)).toBe("Is-An-String");
});

test("Test: camelToKebab | false: for capital camelCase", () => {
	expect(camelToKebab("IsAnString", false)).toBe("is-an-string");
});

test("Test: camelToPascal: for small camelCase", () => {
	expect(camelToPascal("isAnString")).toBe("IsAnString");
});

test("Test: camelToPascal: for capital camelCase", () => {
	expect(camelToPascal("IsAnString")).toBe("IsAnString");
});

test("Test: camelToSnake | true: for small camelCase", () => {
	expect(camelToSnake("isAnString", true)).toBe("Is_An_String");
});
test("Test: camelToSnake | false: for small camelCase", () => {
	expect(camelToSnake("isAnString", false)).toBe("is_an_string");
});

test("Test: camelToSnake | true: for capital camelCase", () => {
	expect(camelToSnake("IsAnString", true)).toBe("Is_An_String");
});
test("Test: camelToSnake | false: for capital camelCase", () => {
	expect(camelToSnake("IsAnString", false)).toBe("is_an_string");
});


// For CapitalToX

test("Test: capitalToCamel: for `Capital Case`", () => {
	expect(capitalToCamel("Capital Case")).toBe("capitalCase");
});

test("Test: capitalToCamel | true: for `Capital Case`", () => {
	expect(capitalToCamel("Capital Case", true)).toBe("CapitalCase");
});

test("Test: capitalToConstant: for `Capital Case`", () => {
	expect(capitalToConstant("Capital Case")).toBe("CAPITAL_CASE");
});

test("Test: capitalToKebab | true: for `Capital Case`", () => {
	expect(capitalToKebab("Capital Case", true)).toBe("Capital-Case");
});

test("Test: capitalToKebab | false: for `Capital Case`", () => {
	expect(capitalToKebab("Capital Case", false)).toBe("capital-case");
});

test("Test: capitalToPascal: for `Capital Case`", () => {
	expect(capitalToPascal("Capital Case")).toBe("CapitalCase");
});

test("Test: capitalToSnake | true: for `Capital Case`", () => {
	expect(capitalToSnake("Capital Case", true)).toBe("Capital_Case");
});

test("Test: capitalToSnake | false: for `Capital Case`", () => {
	expect(capitalToSnake("Capital Case", false)).toBe("capital_case");
});


// For CONSTANT_CASE

test("Test constantToCamel | true", () => {
	expect(constantToCamel("CONSTANT_CASE", true)).toBe("ConstantCase");
});

test("Test constantToCamel | false", () => {
	expect(constantToCamel("CONSTANT_CASE", false)).toBe("constantCase");
});

test("Test constantToCapital", () => {
	expect(constantToCapital("CONSTANT_CASE", true)).toBe("Constant Case");
});

test("Test constantToKebab | true", () => {
	expect(constantToKebab("CONSTANT_CASE", true)).toBe("Constant-Case");
});

test("Test constantToKebab | false", () => {
	expect(constantToKebab("CONSTANT_CASE", false)).toBe("constant-case");
});

test("Test constantToPascal", () => {
	expect(constantToPascal("CONSTANT_CASE", false)).toBe("ConstantCase");
});

test("Test constantToSnake | true", () => {
	expect(constantToSnake("CONSTANT_CASE", true)).toBe("Constant_Case");
});

test("Test constantToSnake | false", () => {
	expect(constantToSnake("CONSTANT_CASE", false)).toBe("constant_case");
});


// For Kebab-Case

test("Test kebabToCamel | true", () => {
	expect(kebabToCamel("Kebab-Case", true)).toBe("KebabCase");
});

test("Test kebabToCamel | false", () => {
	expect(kebabToCamel("Kebab-Case", false)).toBe("kebabCase");
});

test("Test kebabToCapital", () => {
	expect(kebabToCapital("Kebab-Case")).toBe("Kebab Case");
});

test("Test kebabToConstant", () => {
	expect(kebabToConstant("Kebab-Case", true)).toBe("KEBAB_CASE");
});

test("Test kebabToPascal", () => {
	expect(kebabToPascal("Kebab-Case", false)).toBe("KebabCase");
});

test("Test kebabToSnake | true", () => {
	expect(kebabToSnake("Kebab-Case", true)).toBe("Kebab_Case");
});

test("Test kebabToSnake | false", () => {
	expect(kebabToSnake("Kebab-Case", false)).toBe("kebab_case");
});


// For pascalToX

test("Test: pascalToCamel | false: for `IsAString`", () => {
	expect(pascalToCamel("IsAString", false)).toBe("isAString");
});

test("Test: pascalToCamel | true: for `IsAString`", () => {
	expect(pascalToCamel("IsAString", true)).toBe("IsAString");
});

test("Test: pascalToConstant: for `IsAString`", () => {
	expect(pascalToConstant("IsAString")).toBe("IS_A_STRING");
});

test("Test: pascalToKebab | true: for `IsAString`", () => {
	expect(pascalToKebab("IsAString", true)).toBe("Is-A-String");
});

test("Test: pascalToKebab | false: for `IsAString`", () => {
	expect(pascalToKebab("IsAString", false)).toBe("is-a-string");
});

test("Test: pascalToCapital: for `IsAString`", () => {
	expect(pascalToCapital("IsAString")).toBe("Is A String");
});

test("Test: pascalToSnake | true: for `IsAString`", () => {
	expect(pascalToSnake("IsAString", true)).toBe("Is_A_String");
});

test("Test: pascalToSnake | false: for `IsAString`", () => {
	expect(pascalToSnake("IsAString", false)).toBe("is_a_string");
});


// For snakeToX

test("Test: snakeToCamel | true: for `is_a_string`", () => {
	expect(snakeToCamel("is_a_string", true)).toBe("IsAString");
});

test("Test: snakeToCamel | false: for `is_a_string`", () => {
	expect(snakeToCamel("is_a_string", false)).toBe("isAString");
});

test("Test: snakeToCapital | for `is_a_string`", () => {
	expect(snakeToCapital("is_a_string")).toBe("Is A String");
});

test("Test: snakeToConstant | for `is_a_string`", () => {
	expect(snakeToConstant("is_a_string")).toBe("IS_A_STRING");
});

test("Test: snakeToKebab | true: for `is_a_string`", () => {
	expect(snakeToKebab("is_a_string", true)).toBe("Is-A-String");
});

test("Test: snakeToKebab | false: for `is_a_string`", () => {
	expect(snakeToKebab("is_a_string", false)).toBe("is-a-string");
});

test("Test: snakeToPascal | for `is_a_string`", () => {
	expect(snakeToPascal("is_a_string")).toBe("IsAString");
});
