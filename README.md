<p align='center'>
Data from <a href='https://ygoprodeck.com/api-guide'>YGOPRODeck's API</a> (V7) using <a href='https://db.ygoprodeck.com/api/v7/checkDBVer.php'>database version</a> 141.22.
</p>

<div align='center'>
	<picture>
		<img alt=':D' src='src/assets/friendship.png' height='100' width='100'>
	</picture>
</div>

<!-- 
https://img.yugioh-card.com/en/downloads/rulebook/SD_RuleBook_EN_10.pdf#page=6

jq -r '.data[].card_sets[].set_rarity' ./src/assets/cardinfo/*.json | sort -u
find . -wholename "./src/assets/cardinfo/*.json" -exec jq -r '.data[0] | has("archetype")' {} \; | grep -c "true"
-->
