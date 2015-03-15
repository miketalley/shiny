define(['knockout', 'nobles', 'level1', 'level2', 'level3', 'methods'], function (ko, nobles, level1, level2, level3, methods) {

  function Home(){
    var self = this,
        decks;

    self.numPlayers = ko.observable(4);
    self.playerData = ko.observableArray();

    self.numPlayers.subscribe(function(newVal){
      // TODO -- Add Names & Accounts
      var playerData = {
        purchasedCards: [],
        reservedCards: [],
        chips: {
          white: 0,
          blue: 0,
          green: 0,
          red: 0,
          brown: 0,
          yellow: 0
        },
        points: ko.computed(function(){
          return this.purchasedCards.reduce(function(prev, curr, i, array){
            return prev + curr;
          });
        })
      };

      for(var i = 0; i < newVal; i++){
        self.playerData.push(playerData);
      }
    });

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

    self.activate = function(){
      flipInitialCards();
    };

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

  }

  return Home;

});
