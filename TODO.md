* Add form to new game
  - Choose num players
  - Public/Private Slots
* Pickup num players from params in JS
* Search for a game to join
* Once another player connects to the game, add them in as second player
* Get web sockets running
* Send game state through web sockets
* Handle updates through web sockets
  - Player leaves the game
  - Player takes chips
  - Player reserves a card
    - Yellow chips!
  - Player buys a card
  - Player wins
* Make a more welcoming landing page
* Make an instructions page
* Add omniauth, confirmable, and lockable to accounts
* Create list of MyGames and if it is my turn on each(indicator to know if I should play)
* Make game images smaller resolution and file size


DONE * Think about what the model should look like
  - Have separate models for noble/cards? different levels?
  Item:
    type: 'level1, level2, level3, noble'
    level: 1, 2, 3
    image: paperclip image on S3
    color: white, blue, green, red, brown
    points: number of points it's worth
    cost: {
      red: 1-7
      blue: 1-7
      etc: 1-7
    }
DONE * Seed card data into DB
DONE * Setup get call when running game
DONE * Install paperclip and upload images to S3
DONE * Set up controllers for serving card data
  - Level1
  - Level2
  - Level3
  - Nobles
DONE * Create admin role within devise to edit game settings via paperclip
  - https://github.com/plataformatec/devise/wiki/How-To:-Add-an-Admin-Role

