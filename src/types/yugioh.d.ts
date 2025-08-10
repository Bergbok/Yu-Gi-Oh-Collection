import type { ImageMetadata } from 'astro';

export interface CardCSV {
	/** https://yugipedia.com/wiki/Card_Number */
	card_number: string;
	/** https://yugipedia.com/wiki/Edition */
	edition: string;
}

export interface Card extends CardCSV {
	/** https://yugipedia.com/wiki/Archetype */
	archetype?: 'Aesir' | 'Alligator' | 'Amazoness' | 'Ancient Gear' | 'Arcana Force' | 'Archfiend' | 'Artifact' | 'Atlantean' | "Battlin' Boxer" | 'Blackwing' | 'Blaze Accelerator' | 'Blue-Eyes' | 'Bounzer' | 'Bujin' | 'Butterfly' | 'Butterspy' | '"C"' | 'Chaos' | 'Chronomaly' | 'Constellar' | 'CXyz' | 'Cyber Dragon' | 'Dark World' | 'Djinn' | 'Dododo' | 'Duston' | 'Egyptian God' | 'Exodia' | 'Fire Fist' | 'Fire King' | 'Fishborg' | 'Flamvell' | 'Forbidden' | 'Gagaga' | 'Galaxy-Eyes' | 'Geargia' | 'Ghostrick' | 'Gimmick Puppet' | 'Gogogo' | 'Gorgonic' | "Gravekeeper's" | 'Greed' | 'Hazy' | 'Heraldic' | 'Heraldry' | 'Heroic' | 'Hieratic' | 'Hole' | 'Inzektor' | 'Junk' | 'Kuriboh' | 'Laval' | 'Lightsworn' | 'Live☆Twin' | 'Madolche' | 'Madoor' | 'Malefic' | 'Mask' | 'Mecha Phantom Beast' | 'Mermail' | 'Mist Valley' | 'Monarch' | 'Mystical Beast of the Forest' | 'Nephthys' | 'Nimble' | 'Ninja' | 'Noble Knight' | 'Penguin' | 'Photon' | 'Power Tool' | 'Resonator' | 'Runick' | 'Scrap' | 'Shark' | 'Six Samurai' | 'Slime' | 'Spellbook' | 'Star Seraph' | 'Sylvan' | 'Synchron' | 'Toon' | 'Train' | 'Umi' | 'Utopia' | 'Vampire' | 'Volcanic' | 'Watt' | 'Wind-Up' | 'X-Saber';
	/** https://yugipedia.com/wiki/ATK */
	atk?: number;
	/** https://yugipedia.com/wiki/Attribute */
	attribute?: 'DARK' | 'DIVINE' | 'EARTH' | 'FIRE' | 'LIGHT' | 'WATER' | 'WIND';
	/** https://yugipedia.com/wiki/Artwork */
	card_images?: {
		cropped: ImageMetadata;
		full: ImageMetadata;
	};
	/** https://www.yugiohcardprices.io */
	card_prices: CardPrice[];
	/** https://www.yugiohcardguide.com/yugioh-sets-by-date.html */
	card_sets: CardSet[];
	/** Amount of copies of this card in collection */
	count: number;
	/** https://yugipedia.com/wiki/DEF */
	def?: number;
	/** https://yugipedia.com/wiki/Card_text */
	desc: string;
	/** https://yugipedia.com/wiki/Edition */
	edition: '1st Edition' | 'Limited Edition' | 'Unlimited Edition';
	/** https://yugipedia.com/wiki/Card_colors */
	frameType: 'effect' | 'fusion' | 'normal' | 'ritual' | 'spell' | 'synchro' | 'trap' | 'xyz';
	/** https://yugipedia.com/wiki/Card_type */
	humanReadableCardType: 'Continuous Spell' | 'Continuous Trap' | 'Counter Trap' | 'Effect Monster' | 'Equip Spell' | 'Field Spell' | 'Flip Effect Monster' | 'Fusion Effect Monster' | 'Gemini Effect Monster' | 'Normal Monster' | 'Normal Spell' | 'Normal Trap' | 'Quick-Play Spell' | 'Ritual Effect Monster' | 'Ritual Spell' | 'Synchro Effect Monster' | 'Synchro Tuner Effect Monster' | 'Toon Effect Monster' | 'Tuner Effect Monster' | 'Union Effect Monster' | 'Xyz Effect Monster';
	/** https://yugipedia.com/wiki/Password - marked as '| string' because Astro collection IDs need to be strings */
	id: number | string;
	/** https://yugipedia.com/wiki/Level */
	level?: number;
	/** https://yugipedia.com/wiki/Card_name */
	name: string;
	/** https://yugipedia.com/wiki/Type */
	race: 'Aqua' | 'Beast' | 'Beast-Warrior' | 'Continuous' | 'Counter' | 'Cyberse' | 'Dinosaur' | 'Divine-Beast' | 'Dragon' | 'Equip' | 'Fairy' | 'Field' | 'Fiend' | 'Fish' | 'Insect' | 'Machine' | 'Normal' | 'Plant' | 'Psychic' | 'Pyro' | 'Quick-Play' | 'Reptile' | 'Ritual' | 'Rock' | 'Sea Serpent' | 'Spellcaster' | 'Thunder' | 'Warrior' | 'Winged Beast' | 'Zombie';
	/** https://yugipedia.com/wiki/Card_type | https://yugipedia.com/wiki/Monster_card_type */
	type: 'Effect Monster' | 'Flip Effect Monster' | 'Fusion Monster' | 'Gemini Monster' | 'Normal Monster' | 'Ritual Effect Monster' | 'Spell Card' | 'Synchro Monster' | 'Synchro Tuner Monster' | 'Toon Monster' | 'Trap Card' | 'Tuner Monster' | 'Union Effect Monster' | 'XYZ Monster';
	/** https://yugipedia.com/wiki/Type_line */
	typeline?: ('Aqua' | 'Beast' | 'Beast-Warrior' | 'Cyberse' | 'Dinosaur' | 'Divine-Beast' | 'Dragon' | 'Effect' | 'Fairy' | 'Fiend' | 'Fish' | 'Flip' | 'Fusion' | 'Gemini' | 'Insect' | 'Machine' | 'Normal' | 'Plant' | 'Psychic' | 'Pyro' | 'Reptile' | 'Ritual' | 'Rock' | 'Sea Serpent' | 'Spellcaster' | 'Synchro' | 'Thunder' | 'Toon' | 'Tuner' | 'Union' | 'Warrior' | 'Winged Beast' | 'Xyz' | 'Zombie')[];
	/** https://ygoprodeck.com/card/{expanded_card_number} */
	ygoprodeck_url: string;
}

/** Response from https://db.ygoprodeck.com/api/v7/cardsets.php */
export interface CardSets {
	set_name: string;
	set_code: string;
	num_of_cards: number;
	tcg_date: string;
	set_image?: string;
}

/** card_sets array from https://db.ygoprodeck.com/api/v7/cardinfo.php */
interface CardSet extends Omit<CardSets, 'num_of_cards' | 'tcg_date' | 'set_image'> {
	set_rarity: string;
	set_rarity_code: string;
	set_price: number;
}

/** Response from https://db.ygoprodeck.com/api/v7/cardsetsinfo.php */
export interface CardSetInfo {
	id: number;
	name: string;
	set_name: string;
	set_code: string;
	set_rarity: "Collector's Rare" | 'Common' | 'Duel Terminal Normal Parallel Rare' | 'Duel Terminal Normal Rare Parallel Rare' | 'Duel Terminal Rare Parallel Rare' | 'Duel Terminal Super Parallel Rare' | 'Duel Terminal Ultra Parallel Rare' | 'Ghost/Gold Rare' | 'Ghost Rare' | 'Gold Rare' | 'Gold Secret Rare' | 'Mosaic Rare' | 'Normal Parallel Rare' | 'Platinum Rare' | 'Platinum Secret Rare' | 'Premium Gold Rare' | 'Prismatic Secret Rare' | 'Quarter Century Secret Rare' | 'Rare' | 'Secret Rare' | 'Shatterfoil Rare' | 'Short Print' | 'Starfoil Rare' | 'Starlight Rare' | 'Super Rare' | 'Super Short Print' | 'Ultimate Rare' | 'Ultra Parallel Rare' | 'Ultra Rare' | "Ultra Rare (Pharaoh's Rare)";
	set_price: number;
}

export interface CardImages {
	[card_id: string]: {
		cropped: ImageMetadata;
		full: ImageMetadata;
	};
}

export interface CardPrice {
	cardmarket_price: number;
	tcgplayer_price: number;
	ebay_price: number;
	amazon_price: number;
	coolstuffinc_price: number;
}

// Variables that have to be cast to numbers

interface RawCardPrice extends CardPrice {
	cardmarket_price: string;
	tcgplayer_price: string;
	ebay_price: string;
	amazon_price: string;
	coolstuffinc_price: string;
}

interface RawCardSet extends CardSet {
	set_price: string;
}

export interface RawCardData extends Card {
	card_prices: RawCardPrice[];
	card_sets: RawCardSet[];
}

export interface RawCardSetInfo extends CardSetInfo {
	set_price: string;
}
