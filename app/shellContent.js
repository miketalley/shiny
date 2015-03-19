define(['knockout', 'jquery', 'nobles', 'level1', 'level2', 'level3', 'methods'], function (ko, $, nobles, level1, level2, level3, methods) {

  	function Home(){
		var self = this,
			MAX_CHIPS = 10,
			MAX_SELECTION = 3,
			MAX_RESERVE = 3,
			decks;

		self.path = '../Splendor';

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
		  	self.numPlayers(4);
		  	self.currentPlayer({
		  		number: -1
		  	});

		  	flipInitialCards();
		  	nextPlayerTurn();
		};

		self.buyCard = function(){
		  	var confirmed = confirm('Are you sure you want to buy this card?');

		  	if(confirmed){
				self.currentPlayer().purchasedCards.push();
				nextPlayerTurn();
		  	}
		}

		self.reserveCard = function(){
		  	var confirmed = confirm('Are you sure you want to reserve this card?');

		  	if(confirmed){
				self.currentPlayer().reservedCards.push();
				nextPlayerTurn();
		  	}
		}

		self.selectChip = function(chip){
			if(chipSelectionValid(chip)){
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

		  	for(var i = 0; i < selectedChips.length; i++){
		  		currentPlayer.chips[selectedChips[i].color](currentPlayer.chips[selectedChips[i].color]() + 1);
		  	}

		  	self.selectedChips([]);
		  	nextPlayerTurn();
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

		  	this.purchasedCards = [];
		  	this.reservedCards = [];

		  	this.chips = {
				white: ko.observable(0),
			  	blue: ko.observable(0),
			  	green: ko.observable(0),
			  	red: ko.observable(0),
			  	brown: ko.observable(0),
			  	yellow: ko.observable(0)
		  	};

		  	this.points = ko.computed(function(){
				if(!thisPlayer.purchasedCards.length){
			  		return 0;
				}
				return thisPlayer.purchasedCards.reduce(function(prev, curr, i, array){
			  		return prev + curr;
				});
		  	});

		  	
		  	return this;
			
		}

		function chipSelectionValid(chip){
		  	var selectedChips = self.selectedChips(),
		  		currentPlayer = self.currentPlayer(),
		  		playerChipCount = currentPlayerChipCount(),
		  		alreadySelectedThisColor = selectedChips.filter(function(c){
		  			return c.color === chip.color;
		  		}).length;

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
			// First chip being selected
			else if(!selectedChips.length && playerChipCount < MAX_CHIPS){
				return true;
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

		function notification(message){
			$('#notification-area').text(message);

			setTimeout(function(){
				$('#notification-area').text(null);
			}, 1000);
		}
	}

  	return Home;

});
