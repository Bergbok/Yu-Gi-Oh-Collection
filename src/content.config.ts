import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';
import type { Country } from './types/exchange-rate';
import type {
	Card as YuGiOhCard,
	RawCardData,
	RawCardSetInfo,
	CardCSV,
	CardSetInfo,
	RawCardSet
} from './types/yugioh';

const cards = defineCollection({
	loader: async () => {
		const cardCSV: CardCSV[] = parse(
			readFileSync('./src/assets/cards.csv', 'utf-8'),
			{
				columns: true,
				encoding: 'utf8',
				skip_empty_lines: true,
				trim: true
			}
		);

		const cardInfo = Object.fromEntries(
			Object.entries(
				import.meta.glob<RawCardData[]>('./assets/cardinfo/*.json', {
					eager: true,
					import: 'data'
				})
			).map(([_, cardArray]) => {
				const card = cardArray[0];
				return [
					card.id,
					{
						...card,
						card_prices: [
							{
								cardmarket_price: parseFloat(
									card.card_prices[0].cardmarket_price
								),
								tcgplayer_price: parseFloat(
									card.card_prices[0].tcgplayer_price
								),
								ebay_price: parseFloat(
									card.card_prices[0].ebay_price
								),
								amazon_price: parseFloat(
									card.card_prices[0].amazon_price
								),
								coolstuffinc_price: parseFloat(
									card.card_prices[0].coolstuffinc_price
								)
							}
						],
						card_sets: card.card_sets.map((set) => ({
							...set,
							set_price: parseFloat(set.set_price)
						}))
					} as YuGiOhCard
				];
			})
		);

		const cardSetInfo = Object.fromEntries(
			Object.entries(
				import.meta.glob<RawCardSetInfo>(
					'./assets/cardsetsinfo/*.json',
					{ eager: true, import: 'default' }
				)
			).map(([_, setInfo]) => {
				return [
					setInfo.set_code,
					{
						...setInfo,
						set_price: parseFloat(setInfo.set_price)
					} as CardSetInfo
				];
			})
		);

		const cards: YuGiOhCard[] = cardCSV.map((card) => {
			const cardPassword =
				cardSetInfo[card.card_number].id === 32003339
					? 32003338
					: cardSetInfo[card.card_number].id;
			const cardInfoEntry = cardInfo[cardPassword];

			return {
				...card,
				archetype: cardInfoEntry.archetype,
				atk: cardInfoEntry.atk,
				attribute: cardInfoEntry.attribute,
				card_prices: cardInfoEntry.card_prices,
				card_sets: cardInfoEntry.card_sets,
				count: cardCSV.filter((c) => c.card_number === card.card_number)
					.length,
				def: cardInfoEntry.def,
				desc: cardInfoEntry.desc,
				edition:
					card.edition === '1'
						? '1st Edition'
						: card.edition === 'L'
							? 'Limited Edition'
							: 'Unlimited Edition',
				frameType: cardInfoEntry.frameType,
				humanReadableCardType: cardInfoEntry.humanReadableCardType,
				id: cardPassword,
				level: cardInfoEntry.level,
				name: cardInfoEntry.name,
				race: cardInfoEntry.race,
				type: cardInfoEntry.type,
				typeline: cardInfoEntry.typeline,
				ygoprodeck_url: cardInfoEntry.ygoprodeck_url
			};
		});

		return cards.map((card) => ({
			...card,
			id: card.id.toString()
		}));
	},
	schema: z.object({
		id: z.union([z.string(), z.number()]),
		card_number: z.string(),
		edition: z.enum([
			'1st Edition',
			'Limited Edition',
			'Unlimited Edition'
		]),
		count: z.number(),
		archetype: z
			.enum([
				'Aesir',
				'Alligator',
				'Amazoness',
				'Ancient Gear',
				'Arcana Force',
				'Archfiend',
				'Artifact',
				'Atlantean',
				"Battlin' Boxer",
				'Blackwing',
				'Blaze Accelerator',
				'Blue-Eyes',
				'Bounzer',
				'Bujin',
				'Butterfly',
				'Butterspy',
				'"C"',
				'Chaos',
				'Chronomaly',
				'Constellar',
				'CXyz',
				'Cyber Dragon',
				'Dark World',
				'Djinn',
				'Dododo',
				'Duston',
				'Egyptian God',
				'Exodia',
				'Fire Fist',
				'Fire King',
				'Fishborg',
				'Flamvell',
				'Forbidden',
				'Gagaga',
				'Galaxy-Eyes',
				'Geargia',
				'Ghostrick',
				'Gimmick Puppet',
				'Gogogo',
				'Gorgonic',
				"Gravekeeper's",
				'Greed',
				'Hazy',
				'Heraldic',
				'Heraldry',
				'Heroic',
				'Hieratic',
				'Hole',
				'Inzektor',
				'Junk',
				'Kuriboh',
				'Laval',
				'Lightsworn',
				'Live☆Twin',
				'Madolche',
				'Madoor',
				'Malefic',
				'Mask',
				'Mecha Phantom Beast',
				'Mermail',
				'Mist Valley',
				'Monarch',
				'Mystical Beast of the Forest',
				'Nephthys',
				'Nimble',
				'Ninja',
				'Noble Knight',
				'Penguin',
				'Photon',
				'Power Tool',
				'Resonator',
				'Runick',
				'Scrap',
				'Shark',
				'Six Samurai',
				'Slime',
				'Spellbook',
				'Star Seraph',
				'Sylvan',
				'Synchron',
				'Toon',
				'Train',
				'Umi',
				'Utopia',
				'Vampire',
				'Volcanic',
				'Watt',
				'Wind-Up',
				'X-Saber'
			])
			.optional(),
		atk: z.number().optional(),
		attribute: z
			.enum(['DARK', 'DIVINE', 'EARTH', 'FIRE', 'LIGHT', 'WATER', 'WIND'])
			.optional(),
		card_images: z
			.object({
				cropped: z.object({
					src: z.string(),
					width: z.number(),
					height: z.number(),
					format: z.enum([
						'jpeg',
						'jpg',
						'png',
						'tiff',
						'webp',
						'gif',
						'svg',
						'avif'
					]),
					orientation: z.number().optional()
				}),
				full: z.object({
					src: z.string(),
					width: z.number(),
					height: z.number(),
					format: z.enum([
						'jpeg',
						'jpg',
						'png',
						'tiff',
						'webp',
						'gif',
						'svg',
						'avif'
					]),
					orientation: z.number().optional()
				})
			})
			.optional(),
		card_prices: z.array(
			z.object({
				cardmarket_price: z.number(),
				tcgplayer_price: z.number(),
				ebay_price: z.number(),
				amazon_price: z.number(),
				coolstuffinc_price: z.number()
			})
		),
		card_sets: z.array(
			z.object({
				set_name: z.string(),
				set_code: z.string(),
				set_rarity: z.enum([
					"Collector's Rare",
					'Common',
					'Duel Terminal Normal Parallel Rare',
					'Duel Terminal Normal Rare Parallel Rare',
					'Duel Terminal Rare Parallel Rare',
					'Duel Terminal Super Parallel Rare',
					'Duel Terminal Ultra Parallel Rare',
					'Ghost/Gold Rare',
					'Ghost Rare',
					'Gold Rare',
					'Gold Secret Rare',
					'Mosaic Rare',
					'Normal Parallel Rare',
					'Platinum Rare',
					'Platinum Secret Rare',
					'Premium Gold Rare',
					'Prismatic Secret Rare',
					'Quarter Century Secret Rare',
					'Rare',
					'Secret Rare',
					'Shatterfoil Rare',
					'Short Print',
					'Starfoil Rare',
					'Starlight Rare',
					'Super Rare',
					'Super Short Print',
					'Ultimate Rare',
					'Ultra Parallel Rare',
					'Ultra Rare',
					"Ultra Rare (Pharaoh's Rare)"
				]),
				set_rarity_code: z.string(),
				set_price: z.number(),
				num_of_cards: z.number().optional(),
				tcg_date: z.string().optional()
			})
		),
		def: z.number().optional(),
		desc: z.string(),
		frameType: z.enum([
			'effect',
			'fusion',
			'normal',
			'ritual',
			'spell',
			'synchro',
			'trap',
			'xyz'
		]),
		humanReadableCardType: z.enum([
			'Continuous Spell',
			'Continuous Trap',
			'Counter Trap',
			'Effect Monster',
			'Equip Spell',
			'Field Spell',
			'Flip Effect Monster',
			'Fusion Effect Monster',
			'Gemini Effect Monster',
			'Normal Monster',
			'Normal Spell',
			'Normal Trap',
			'Quick-Play Spell',
			'Ritual Effect Monster',
			'Ritual Spell',
			'Synchro Effect Monster',
			'Synchro Tuner Effect Monster',
			'Toon Effect Monster',
			'Tuner Effect Monster',
			'Union Effect Monster',
			'Xyz Effect Monster'
		]),
		level: z.number().int().min(1).max(12).optional(),
		name: z.string(),
		race: z.enum([
			'Aqua',
			'Beast',
			'Beast-Warrior',
			'Continuous',
			'Counter',
			'Cyberse',
			'Dinosaur',
			'Divine-Beast',
			'Dragon',
			'Equip',
			'Fairy',
			'Field',
			'Fiend',
			'Fish',
			'Insect',
			'Machine',
			'Normal',
			'Plant',
			'Psychic',
			'Pyro',
			'Quick-Play',
			'Reptile',
			'Ritual',
			'Rock',
			'Sea Serpent',
			'Spellcaster',
			'Thunder',
			'Warrior',
			'Winged Beast',
			'Zombie'
		]),
		type: z.enum([
			'Effect Monster',
			'Flip Effect Monster',
			'Fusion Monster',
			'Gemini Monster',
			'Normal Monster',
			'Ritual Effect Monster',
			'Spell Card',
			'Synchro Monster',
			'Synchro Tuner Monster',
			'Toon Monster',
			'Trap Card',
			'Tuner Monster',
			'Union Effect Monster',
			'XYZ Monster'
		]),
		typeline: z
			.array(
				z.enum([
					'Aqua',
					'Beast',
					'Beast-Warrior',
					'Cyberse',
					'Dinosaur',
					'Divine-Beast',
					'Dragon',
					'Effect',
					'Fairy',
					'Fiend',
					'Fish',
					'Flip',
					'Fusion',
					'Gemini',
					'Insect',
					'Machine',
					'Normal',
					'Plant',
					'Psychic',
					'Pyro',
					'Reptile',
					'Ritual',
					'Rock',
					'Sea Serpent',
					'Spellcaster',
					'Synchro',
					'Thunder',
					'Toon',
					'Tuner',
					'Union',
					'Warrior',
					'Winged Beast',
					'Xyz',
					'Zombie'
				])
			)
			.optional(),
		ygoprodeck_url: z.string()
	})
});

const cardsets = defineCollection({
	loader: file('./src/assets/cardsets.json', {
		parser: (text) => {
			return JSON.parse(text).map((item: RawCardSet) => ({
				...item,
				id: `${item.set_code} - ${item.set_name}`
			}));
		}
	}),
	schema: z.object({
		set_name: z.string(),
		set_code: z.string(),
		num_of_cards: z.number(),
		tcg_date: z.string(),
		set_image: z.string().url().optional()
	})
});

const countries = defineCollection({
	loader: file('./node_modules/@fawazahmed0/currency-api/v1/country.json', {
		parser: (text) => {
			const data = JSON.parse(text);
			return Object.entries(data).map(([countryCode, countryData]) => ({
				id: countryCode,
				...(countryData as Country)
			}));
		}
	}),
	schema: z.object({
		id: z.string(),
		country_name: z.string(),
		country_iso3: z.string(),
		country_iso_numeric: z.string(),
		currency_name: z.string(),
		currency_code: z.string(),
		currency_number: z.string()
	})
});

const exchangeRates = defineCollection({
	loader: file(
		'./node_modules/@fawazahmed0/currency-api/v1/currencies/usd.json',
		{
			parser: (text) => {
				const data = JSON.parse(text);
				return [
					{
						id: 'usd-exchange-rates',
						...data
					}
				];
			}
		}
	),
	schema: z.object({
		id: z.string(),
		date: z.string(),
		usd: z.record(z.number())
	})
});

export const collections = { cards, cardsets, countries, exchangeRates };
