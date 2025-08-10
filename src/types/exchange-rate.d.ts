/**
 * @see [country.json on GitHub](https://github.com/fawazahmed0/exchange-api/blob/main/country.json)
 */
export type CountryMap = Record<string, Country>;
export interface Country {
	country_name: string;
	country_iso3: string;
	country_iso_numeric: string;
	currency_name: string;
	currency_code: string;
	currency_number: string;
}


export interface ExchangeRates {
	date: string;
	usd: {
		[currency: string]: number;
	};
}
