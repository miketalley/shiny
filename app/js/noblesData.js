(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.level1 = factory();
    }
}(this, function () {
    var nobles = {};

    var path = '../shiny/images/nobles/';

    nobles.cards = [
      {
        image: path + 'IMG_0001.jpg',
        points: 3,
        white: 0,
        blue: 0,
        green: 0,
        red: 4,
        brown: 4
      },
      {
        image: path + 'IMG_0002.jpg',
        points: 3,
        white: 0,
        blue: 0,
        green: 3,
        red: 3,
        brown: 3
      },
      {
        image: path + 'IMG_0003.jpg',
        points: 3,
        white: 3,
        blue: 0,
        green: 0,
        red: 3,
        brown: 3
      },
      {
        image: path + 'IMG_0004.jpg',
        points: 3,
        white: 4,
        blue: 4,
        green: 0,
        red: 0,
        brown: 0
      },
      {
        image: path + 'IMG_0005.jpg',
        points: 3,
        white: 3,
        blue: 3,
        green: 3,
        red: 0,
        brown: 0
      },
      {
        image: path + 'IMG_0006.jpg',
        points: 3,
        white: 0,
        blue: 4,
        green: 4,
        red: 0,
        brown: 0
      },
      {
        image: path + 'IMG_0007.jpg',
        points: 3,
        white: 3,
        blue: 3,
        green: 0,
        red: 0,
        brown: 3
      },
      {
        image: path + 'IMG_0008.jpg',
        points: 3,
        white: 4,
        blue: 0,
        green: 0,
        red: 0,
        brown: 4
      },
      {
        image: path + 'IMG_0009.jpg',
        points: 3,
        white: 0,
        blue: 0,
        green: 4,
        red: 4,
        brown: 0
      },
      {
        image: path + 'IMG_0010.jpg',
        points: 3,
        white: 0,
        blue: 3,
        green: 3,
        red: 3,
        brown: 0
      }
    ];

    return nobles;

}));
