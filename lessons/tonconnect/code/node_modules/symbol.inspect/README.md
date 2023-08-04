# symbol.inspect

    <symbol> that can be used to declare custom inspect functions.

see https://nodejs.org/api/util.html#util_util_inspect_custom

## install

```
npm install symbol.inspect
```

```ts
import SymbolInspect = require('symbol.inspect');

class A
{
	[SymbolInspect]()
	{
		return 'my custom inspect display'
	}
}

console.log(new A);
```
