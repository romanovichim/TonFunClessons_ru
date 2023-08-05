![Case-Shift](/static/logo.gif)<br>
Simple npm package for converting the case from one format to another.

<b>📦 Install with the help of npm or yarn</b>

```sh
npm install case-shift
# or
yarn add case-shift
```

## Case Conversion
The one case string converts the below to all the categories. Follow the further documentation.
- [camelCase](#camelcase)
- [Capital Case](#capital-case)
- [CONSTANT_CASE](#CONSTANT_CASE)
- [Kebab-Case](#Kebab-Case)
- [PascalCase](#PascalCase)
- [Snake_Case](#Snake_Case)


### camelCase
In this category, all the method converts the camelCase string to another category string. The camelCase method supports both lowerCamelCase(`isAnString`) and UpperCamelCase(`IsAnString`) strings for conversion.

```javascript
const {
	camelToCapital,
	camelToConstant,
	camelToKebab,
	camelToPascal,
	camelToSnake
} = require("case-shift");
```

- <b>camelToCapital</b><br>
This method converts camelCase string to capital case.
```javascript
console.log(camelToCapital("isAnString"));
// Is An String
```
<br>

- <b>camelToConstant</b><br>
This method converts camelCase string to constant case.
```javascript
console.log(camelToConstant("isAnString"));
// IS_AN_STRING
```
<br>

- <b>camelToKebab</b><br>
This method converts camelCase string to kebab case. If the second argument is true, returns capital kebab case string, else small kebab case string. Defaults are `true`.
```javascript
console.log(camelToKebab("isAnString"));
// Is-An-String
console.log(camelToKebab("isAnString", false));
// is-an-string
```
<br>

- <b>camelToPascal</b><br>
This method converts camelCase string to pascal case.
```javascript
console.log(camelToPascal("isAnString"));
// IsAnString
```
<br>

- <b>camelToSnake</b><br>
This method converts camelCase string to snake case. If the second argument is true, returns capital snake case string, else small snake case string. Defaults are `true`.
```javascript
console.log(camelToSnake("isAnString"));
// Is_An_String
console.log(camelToSnake("isAnString", false));
// is_an_string
```
<br>


### Capital Case
In this category, all the method converts the Capital Case string to another category string.

```javascript
const {
	capitalToCamel,
	capitalToConstant,
	capitalToKebab,
	capitalToPascal,
	capitalToSnake
} = require("case-shift");
```

- <b>capitalToCamel</b><br>
This method converts Capital Case string to camelCase case. If second optional argument is true return `UpperCamelCase` string, default `false`.
```javascript
console.log(capitalToCamel("Is An String"));
// isAnString
console.log(capitalToCamel("Is An String", true));
// IsAnString
```
<br>

- <b>capitalToConstant</b><br>
This method converts Capital Case string to constant case.
```javascript
console.log(capitalToConstant("Is An String"));
// IS_AN_STRING
```
<br>

- <b>capitalToKebab</b><br>
This method converts Capital Case string to kebab case. If the second argument is true, returns capital kebab case string, else small kebab case string. Defaults are `true`.
```javascript
console.log(capitalToKebab("Is An String"));
// Is-An-String
console.log(capitalToKebab("Is An String", false));
// is-an-string
```
<br>

- <b>capitalToPascal</b><br>
This method converts Capital Case string to pascal case.
```javascript
console.log(capitalToPascal("Is An String"));
// IsAnString
```
<br>

- <b>capitalToSnake</b><br>
This method converts Capital Case string to snake case. If the second argument is true, returns capital snake case string, else small snake case string. Defaults are `true`.
```javascript
console.log(capitalToSnake("Is An String"));
// Is_An_String
console.log(capitalToSnake("Is An String", false));
// is_an_string
```
<br>


### CONSTANT_CASE
In this category, all the method converts the CONSTANT_CASE string to another category string.

```javascript
const {
	constantToCamel,
	constantToCapital,
	constantToKebab,
	constantToPascal,
	constantToSnake
} = require("case-shift");
```

- <b>constantToCamel</b><br>
This method converts CONSTANT_CASE string to camelCase case. If second optional argument is true return `UpperCamelCase` string, default `false`.
```javascript
console.log(constantToCamel("IS_AN_STRING"));
// isAnString
console.log(constantToCamel("IS_AN_STRING", true));
// IsAnString
```
<br>

- <b>constantToCapital</b><br>
This method converts CONSTANT_CASE string to Capital Case string.
```javascript
console.log(constantToCapital("IS_AN_STRING"));
// Is An String
```
<br>

- <b>constantToKebab</b><br>
This method converts CONSTANT_CASE string to kebab case. If the second argument is true, returns capital kebab case string, else small kebab case string. Defaults are `true`.
```javascript
console.log(constantToKebab("IS_AN_STRING"));
// Is-An-String
console.log(constantToKebab("IS_AN_STRING", false));
// is-an-string
```
<br>

- <b>constantToPascal</b><br>
This method converts CONSTANT_CASE string to pascal case.
```javascript
console.log(constantToPascal("IS_AN_STRING"));
// IsAnString
```
<br>

- <b>constantToSnake</b><br>
This method converts CONSTANT_CASE string to snake case. If the second argument is true, returns capital snake case string, else small snake case string. Defaults are `true`.
```javascript
console.log(constantToSnake("IS_AN_STRING"));
// Is_An_String
console.log(constantToSnake("IS_AN_STRING", false));
// is_an_string
```
<br>


### Kebab-Case
In this category, all the method converts the Kebab-Case string to another category string.

```javascript
const {
	kebabToCamel,
	kebabToCapital,
	kebabToConstant,
	kebabToPascal,
	kebabToSnake
} = require("case-shift");
```

- <b>kebabToCamel</b><br>
This method converts Kebab-Case string to camelCase case. If second optional argument is true return `UpperCamelCase` string, default `false`.
```javascript
console.log(kebabToCamel("Is-An-String"));
// isAnString
console.log(kebabToCamel("Is-An-String", true));
// IsAnString
```
<br>

- <b>kebabToCapital</b><br>
This method converts Kebab-Case string to Capital Case string.
```javascript
console.log(kebabToCapital("Is-An-String"));
// Is An String
```
<br>

- <b>kebabToConstant</b><br>
This method converts Kebab-Case string to CONSTANT_CASE string.
```javascript
console.log(kebabToConstant("Is-An-String"));
// IS_AN_STRING
```
<br>

- <b>kebabToPascal</b><br>
This method converts Kebab-Case string to pascal case.
```javascript
console.log(kebabToPascal("Is-An-String"));
// IsAnString
```
<br>

- <b>kebabToSnake</b><br>
This method converts Kebab-Case string to snake_case. If the second argument is true, returns capital snake_case string, else small snake_case string. Defaults are `true`.
```javascript
console.log(kebabToSnake("Is-An-String"));
// Is_An_String
console.log(kebabToSnake("Is-An-String", false));
// is_an_string
```
<br>


### PascalCase
In this category, all the method converts the PascalCase string to another category string.

```javascript
const {
	pascalToCamel,
	pascalToCapital,
	pascalToConstant,
	pascalToKebab,
	pascalToSnake
} = require("case-shift");
```

- <b>pascalToCamel</b><br>
This method converts PascalCase string to camelCase case. If second optional argument is true return `UpperCamelCase` string, default `false`.
```javascript
console.log(pascalToCamel("IsAnString"));
// isAnString
console.log(pascalToCamel("IsAnString", true));
// IsAnString
```
<br>

- <b>pascalToCapital</b><br>
This method converts PascalCase string to Capital Case string.
```javascript
console.log(pascalToCapital("IsAnString"));
// Is An String
```
<br>

- <b>pascalToConstant</b><br>
This method converts PascalCase string to CONSTANT_CASE string.
```javascript
console.log(pascalToConstant("IsAnString"));
// IS_AN_STRING
```
<br>

- <b>pascalToKebab</b><br>
This method converts PascalCase string to kebab-case string. If the second argument is true, returns capital kebab case string, else small kebab case string. Defaults are `true`.
```javascript
console.log(pascalToKebab("IsAnString"));
// Is-An-String
console.log(pascalToKebab("IsAnString", false));
// is-an-string
```
<br>

- <b>pascalToSnake</b><br>
This method converts PascalCase string to snake_case. If the second argument is true, returns capital snake_case string, else small snake_case string. Defaults are `true`.
```javascript
console.log(pascalToSnake("IsAnString"));
// Is_An_String
console.log(pascalToSnake("IsAnString", false));
// is_an_string
```
<br>

### Snake_Case
In this category, all the method converts the Snake_Case string to another category string.

```javascript
const {
	snakeToCamel,
	snakeToCapital,
	snakeToConstant,
	snakeToPascal,
	snakeToKebab
} = require("case-shift");
```

- <b>snakeToCamel</b><br>
This method converts Snake_Case string to camelCase case. If second optional argument is true return `UpperCamelCase` string, default `false`.
```javascript
console.log(snakeToCamel("is_an_string"));
// isAnString
console.log(snakeToCamel("is_an_string", true));
// IsAnString
```
<br>

- <b>snakeToCapital</b><br>
This method converts Snake_Case string to Capital Case string.
```javascript
console.log(snakeToCapital("is_an_string"));
// Is An String
```
<br>

- <b>snakeToConstant</b><br>
This method converts Snake_Case string to CONSTANT_CASE string.
```javascript
console.log(snakeToConstant("is_an_string"));
// IS_AN_STRING
```
<br>

- <b>snakeToPascal</b><br>
This method converts Snake_Case string to pascal case.
```javascript
console.log(snakeToPascal("is_an_string"));
// IsAnString
```
<br>

- <b>snakeToKebab</b><br>
This method converts Snake_Case string to kebab-case. If the second argument is true, returns capital Kebab-Case string, else small kebab-case string. Defaults are `true`.
```javascript
console.log(snakeToKebab("is_an_string"));
// Is-An-String
console.log(snakeToKebab("is_an_string", false));
// is-an-string
```
<br>

<hr>
💻 Thank You!
