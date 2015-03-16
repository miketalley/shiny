define(['knockout', 'nobles', 'level1', 'level2', 'level3', 'methods'], function (ko, nobles, level1, level2, level3, methods) {

  	function Home(){
		var self = this,
			decks;

		self.path = '../Splendor';

		self.chips = {
			white: ko.observable(7),
		  	blue: ko.observable(7),
		  	green: ko.observable(7),
		  	red: ko.observable(7),
		  	brown: ko.observable(7),
		  	yellow: ko.observable(5)
		};

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
		self.selectedChips = ko.observableArray();
		self.selectedCardToReserve = ko.observable();
		self.selectedCardToBuy = ko.observable();

		self.playerWon = ko.computed(function(){
		  	return self.players().filter(function(player, i, array){
				return player.points() >= 15;
		  	});
		});

		self.selectedChipsWithinLimits = ko.computed(function(){
		  	// Filter chips to make sure only 2 of same color
		  	// or 3 of all different colors are selected

		  	// TODO

		  	return true;
		});

		self.numPlayers.subscribe(function(newVal){
		  	for(var i = 0; i < newVal; i++){
				var player = new Player();
				player.number = i;
				self.players.push(player);
		  	}

		  	// self.currentPlayer(self.players()[0]);
		});

		self.activate = function(){
		  	self.numPlayers(4);
		  	self.currentPlayer(self.players()[0]);

		  	flipInitialCards();
		  	nextPlayerTurn();
		};

		function nextPlayerTurn(){
		  	var currentPlayer = self.currentPlayer().number,
				players = self.players();

		  	// If the last player just went
		  	if(currentPlayer >= self.numPlayers()){
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
				self.currentPlayer(players[currentPlayer - 1]);
		  	}
		}

		function buyCard(){
		  	var confirmed = confirm('Are you sure you want to buy this card?');

		  	if(confirmed){
				self.currentPlayer().purchasedCards.push();
				nextPlayerTurn();
		  	}
		}

		function reserveCard(){
		  	var confirmed = confirm('Are you sure you want to reserve this card?');

		  	if(confirmed){
				self.currentPlayer().reservedCards.push();
				nextPlayerTurn();
		  	}
		}

		function takeChips(){
		  	if(self.selectedChipsWithinLimits()){
				giveSelectedChipsToPlayer();
				self.selectedChips([]);
				nextPlayerTurn();
		  	}
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
				white: 0,
			  	blue: 0,
			  	green: 0,
			  	red: 0,
			  	brown: 0,
			  	yellow: 0
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
	}

  	return Home;

});
