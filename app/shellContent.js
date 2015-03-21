define(['knockout', 'jquery', 'nobles', 'level1', 'level2', 'level3', 'methods'], function (ko, $, nobles, level1, level2, level3, methods) {

  	function Home(){
		var self = this,
			MAX_CHIPS = 10,
			MAX_SELECTION = 3,
			MAX_RESERVE = 3,
			decks;

		self.path = '../Splendor';
		// ../

		self.chips = [
			{
				color: 'white',
				count: ko.observable(7),
				image: '/images/misc/chip_white.jpg',
				hex: '#ffffff'
			},
		  	{
				color: 'blue',
				count: ko.observable(7),
				image: '/images/misc/chip_blue.jpg',
				hex: '#0000e6'
			},
		  	{
		  		color: 'green',
				count: ko.observable(7),
				image: '/images/misc/chip_green.jpg',
				hex: '#009d00'
			},
		  	{
				color: 'red',
				count: ko.observable(7),
				image: '/images/misc/chip_red.jpg',
				hex: '#cc0000'
			},
		  	{
		  		color: 'brown',
				count: ko.observable(7),
				image: '/images/misc/chip_brown.jpg',
				hex: '#070503'
			},
		  	{
				color: 'yellow',
				count: ko.observable(5),
				image: '/images/misc/chip_yellow.jpg',
				hex: '#ffc200'
			}
		];

		decks = {
		  	nobles: methods.shuffle(nobles.cards),
		  	level3: methods.shuffle(level3.cards),
		  	level2: methods.shuffle(level2.cards),
		  	level1: methods.shuffle(level1.cards)
		};

		self.displayedCards = {
		  	nobles: ko.observableArray(),
		  	level3: ko.observableArray(),
		  	level2: ko.observableArray(),
		  	level1: ko.observableArray()
		};

		self.numPlayers = ko.observable();
		self.players = ko.observableArray();
		self.currentPlayer = ko.observable();
		self.viewedPlayer = ko.observable();
		self.selectedChips = ko.observableArray();
		self.selectedCardToReserve = ko.observable();
		self.selectedCardToBuy = ko.observable();

		self.playerWon = ko.computed(function(){
		  	return self.players().filter(function(player, i, array){
				return player.points() >= 15;
		  	}).length;
		});

		self.numPlayers.subscribe(function(newVal){
		  	for(var i = 0; i < newVal; i++){
				var player = new Player();
				player.number = i;
				self.players.push(player);
		  	}
		});

		self.activate = function(){
			var numPlayers;

			while(!numPlayers || numPlayers < 2 || numPlayers > 4){
		  		numPlayers = prompt("Enter number of players: ", "2");
			}
		  	self.numPlayers(numPlayers);
		  	self.currentPlayer({
		  		number: -1
		  	});

		  	flipInitialCards();
		  	nextPlayerTurn();
		};

		self.buyCard = function(card){
			var purchaseDetails = canAffordCard(card);

			if(purchaseDetails){
			  	var confirmed = confirm('Are you sure you want to buy this card?');

			  	if(confirmed){
			  		var currentPlayer = self.currentPlayer(),
			  			deckType = 'level' + card.level,
			  			index = self.displayedCards[deckType].indexOf(card);

			  		for(var chipColor in card.cost){
			  			var chipObj = self.chips.filter(function(chip){ return chip.color === chipColor; })[0];
			  				ownedCardsThisColor = currentPlayer.purchasedCards().filter(function(card){ return card.color === chipColor; }).length,
			  				chipCost = Math.max((card.cost[chipColor] - ownedCardsThisColor), 0);

			  			currentPlayer.chips[chipColor](currentPlayer.chips[chipColor]() - chipCost);
			  			chipObj.count(chipObj.count() + chipCost);
			  		}

			  		if(purchaseDetails.yellowChipsNeeded){
			  			currentPlayer.chips.yellow(currentPlayer.chips.yellow() -= purchaseDetails.yellowChipsNeeded);
			  		}

			  		var purchasedCard = self.displayedCards[deckType].splice(index, 1)[0];

					currentPlayer.purchasedCards.push(purchasedCard);
					flipCard(deckType, index);
					checkNobleVisits(currentPlayer);
					nextPlayerTurn();
			  	}
			}
		};

		self.reserveCard = function(card){
		  	var confirmed = confirm('Are you sure you want to reserve this card?');

		  	if(confirmed){
		  		var currentPlayer = self.currentPlayer(),
			  		cardLevel = 'level' + card.level,
			  		index = self.displayedCards[cardLevel].indexOf(card),
			  		yellowChips = self.chips.filter(function(chip){ return chip.color === 'yellow'; })[0];

			  	var reservedCard = self.displayedCards[cardLevel].splice(index, 1)[0];

				self.currentPlayer().reservedCards.push(reservedCard);
				if(yellowChips.count() > 0){
					yellowChips.count(yellowChips.count() - 1);
					currentPlayer.chips.yellow(currentPlayer.chips.yellow() + 1);
				}
				flipCard(cardLevel, index);
				nextPlayerTurn();
		  	}
		};

		self.buyReservedCard = function(card){
			if(self.viewedPlayer() === self.currentPlayer()){
				self.buyCard(card);
			}
		};

		self.selectChip = function(chip){
			if(chip && chipSelectionValid(chip)){
				chip.count(chip.count() - 1);
				self.selectedChips.push(chip);
			}
		};

		self.removeChip = function(chip){
			var i = self.selectedChips().indexOf(chip);

			self.selectedChips.splice(i, 1);
			chip.count(chip.count() + 1);
		};

		self.viewingPlayer = function(player){
			self.viewedPlayer(player);
		};

		self.takeChips = function(){
		  	var currentPlayer = self.currentPlayer(),
		  		selectedChips = self.selectedChips();

		  	if((selectedChips.length > 1 && selectedChips[0].color === selectedChips[1].color) || selectedChips.length > 2){
			  	for(var i = 0; i < selectedChips.length; i++){
			  		currentPlayer.chips[selectedChips[i].color](currentPlayer.chips[selectedChips[i].color]() + 1);
			  	}

			  	self.selectedChips([]);
			  	nextPlayerTurn();
		  	}
		  	else{
		  		notification('Please select up to three chips!');
		  	}
		};

		self.viewedPlayerChips = function(data){
			var color = data.color;

			return self.viewedPlayer().chips[color]();
		};

		function nextPlayerTurn(){
		  	var currentPlayerNum = self.currentPlayer().number,
				players = self.players();

		  	// If the final player in each round just went
		  	if(currentPlayerNum === (self.numPlayers() - 1)){
				// Check if somebody won and display winner if so
				if(self.playerWon()){
			  		displayWinner();
				}
				// If not switch back to player 1
				else{
			  		self.currentPlayer(players[0]);
				}
		  	}
		  	// Switch to the next player
		  	else{
				self.currentPlayer(players[currentPlayerNum + 1]);
		  	}

		  	self.viewedPlayer(self.currentPlayer());
		}


		function flipInitialCards(){
		  	var numPlayers = self.numPlayers();

		  	// Flip numPlayers + 1 noble tiles
		  	for(var i = 0; i <= numPlayers; i++){
				flipCard('nobles', i);
		  	}

		  	// Flip 4 cards for each level
		  	for(var j = 0; j < 4; j++){
				flipCard('level3', j);
				flipCard('level2', j);
				flipCard('level1', j);
		  	}
		}

		function flipCard(type, position){
		  	self.displayedCards[type].splice(position, 0, decks[type].shift());
		}

		function Player(){
		  	var thisPlayer = this;

		  	this.purchasedCards = ko.observableArray();
		  	this.purchasedWhiteCards = ko.computed(function(){
		  		return thisPlayer.purchasedCards() && thisPlayer.purchasedCards().filter(function(card){ return card.color === 'white'});
		  	});
		  	this.purchasedBlueCards = ko.computed(function(){
		  		return thisPlayer.purchasedCards() && thisPlayer.purchasedCards().filter(function(card){ return card.color === 'blue'});
		  	});
		  	this.purchasedGreenCards = ko.computed(function(){
		  		return thisPlayer.purchasedCards() && thisPlayer.purchasedCards().filter(function(card){ return card.color === 'green'});
		  	});
		  	this.purchasedRedCards = ko.computed(function(){
		  		return thisPlayer.purchasedCards() && thisPlayer.purchasedCards().filter(function(card){ return card.color === 'red'});
		  	});
		  	this.purchasedBrownCards = ko.computed(function(){
		  		return thisPlayer.purchasedCards() && thisPlayer.purchasedCards().filter(function(card){ return card.color === 'brown'});
		  	});

		  	this.reservedCards = ko.observableArray();
		  	this.nobleCards = ko.observableArray();

		  	this.chips = {
				white: ko.observable(0),
			  	blue: ko.observable(0),
			  	green: ko.observable(0),
			  	red: ko.observable(0),
			  	brown: ko.observable(0),
			  	yellow: ko.observable(0)
		  	};

		  	this.points = ko.computed(function(){
				var noble = {
						points: 0
					};

				if(!thisPlayer.purchasedCards().length){
			  		return 0;
				}

				var card = thisPlayer.purchasedCards().reduce(function(prev, curr, i, array){
			  		return { points: prev.points + curr.points };
				});

				if(thisPlayer.nobleCards().length){
					noble = thisPlayer.nobleCards().reduce(function(prev, curr, i, array){
				  		return { points: prev.points + curr.points };
					});
				}

				return card.points + noble.points;
		  	});

		  	this.cardsOfColor = function(color){
				var colorUpperCase = color.charAt(0).toUpperCase() + color.slice(1, color.length);

				return this['purchased' + colorUpperCase + 'Cards']();
			}
		  	
		  	return this;	
		}

		function chipSelectionValid(chip){
		  	var selectedChips = self.selectedChips(),
		  		currentPlayer = self.currentPlayer(),
		  		playerChipCount = currentPlayerChipCount(),
		  		alreadySelectedThisColor = selectedChips.filter(function(c){
		  			return c.color === chip.color;
		  		}).length,
		  		hasTwoSameColorChips = selectedChips.length === 2 && (selectedChips[0].color === selectedChips[1].color);

			if(playerChipCount === MAX_CHIPS){
				notification('You have too many chips! You can only buy or reserve a card!');
				return false;
			}
			else if(selectedChips.length === MAX_SELECTION){
				notification('You have already selected the maximum number of chips per turn!');
				return false;
			}
			else if(chip.count() === 0){
				notification('There are no more ' + chip.color + ' chips remaining! Choose another color!');
				return false;
			}
			else if(hasTwoSameColorChips){
				notification('You cannot select 3 chips if you have two of the same color!');
				return false;
			}
			// First chip being selected
			else if(!selectedChips.length && playerChipCount < MAX_CHIPS){
				return true;
			}
			else if(selectedChips.length === 2 && playerChipCount > (MAX_CHIPS - 1)){
				notification('You already have the maximum of ten chips!');
			}
			else if(selectedChips.length === 2 && selectedChips[0].color === selectedChips[1].color){
				notification('You already have two chips of the same color and cannot select a third!');
				return false;
			}
			else if(selectedChips.length < 3 && !alreadySelectedThisColor){
				return true;
			}
			else if(selectedChips.length === 1 && playerChipCount < 9 && alreadySelectedThisColor && chip.count() >= 3){
				return true;
			}
			else if(selectedChips.length === 1 && playerChipCount < 9 && alreadySelectedThisColor && chip.count() < 3){
				notification('You cannot select two same color chips if there are less than four!');
				return false;
			}
			else if(selectedChips.length === 2 && alreadySelectedThisColor){
				notification('You are only allowed to select two chips of the same color per turn!');
				return false;
			}
			else{
				return false;
			}
		}

		function currentPlayerChipCount(){
			var chips = self.currentPlayer().chips,
				sum = 0;
			
			for(var prop in chips){
				sum += chips[prop]();
			}

			return sum;
		}

		 function canAffordCard(card){
			var currentPlayer = self.currentPlayer(),
				yellowChips = currentPlayer.chips.yellow(),
				yellowChipsNeeded = 0;

			var deficitArray = Object.keys(card.cost).filter(function(color){
				var deficit = card.cost[color] - (currentPlayer.chips[color]() + currentPlayer.cardsOfColor(color));

				if(deficit > 0){
					yellowChipsNeeded = yellowChipsNeeded + deficit;
					return true;
				}

				return false;
			});

			if(!deficitArray.length){
				return true;
			} 
			else if(yellowChips > yellowChipsNeeded){
				var confirmed = confirm('This transaction requires you to spend ' + yellowChipsNeeded + ' yellow chips. Are you sure?');
				if(confirmed){
					return {
						yellowsChipsNeeded: yellowChipsNeeded
					}
				}
			}

			return notification('You do not have enough chips to buy this card!');
		}

		function checkNobleVisits(currentPlayer){
			var nobles = self.displayedCards.nobles();

			for(var i = 0; i < nobles.length; i++){
				var requirements = [],
					cost = nobles[i].cost;

				for(var color in cost){
					requirements.push((currentPlayer.cardsOfColor(color).length + 1) >= cost[color]);
				}

				if(requirements.indexOf(false) === -1){
					currentPlayer.nobleCards.push(nobles[i]);
					flipCard('nobles', i);
				}	
			}
		}

		function notification(message){
			$('#notification-area').text(message);

			setTimeout(function(){
				$('#notification-area').text(null);
			}, 1000);

			return false;
		}

	}

  	return Home;

});
