* Set up controllers for serving card data
  - Level1
  - Level2
  - Level3
  - Nobles

* Think about what the model should look like
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

* Seed card data into DB
* Setup get call when running game
* Install paperclip and upload images to S3
DONE * Create admin role within devise to edit game settings via paperclip
  - https://github.com/plataformatec/devise/wiki/How-To:-Add-an-Admin-Role
