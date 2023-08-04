export declare type TokenType = object;
export declare type DerivativeFunc<DesignToken extends TokenType, DerivativeToken extends TokenType> = (designToken: DesignToken, derivativeToken?: DerivativeToken) => DerivativeToken;
