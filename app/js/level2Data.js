(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.level2 = factory();
    }
}(this, function () {
		var level2 = {};

		var path = '../shiny/images/level2/';

		level2.cards = [
			{
				image: path + 'IMG_0001.jpg',
				color: 'brown',
				points: 2,
				white: 5,
				blue: 0,
				green: 0,
				red: 0,
				brown: 0
			},
			{
				image: path + 'IMG_0002.jpg',
				color: 'brown',
				points: 2,
				white: 0,
				blue: 1,
				green: 4,
				red: 2,
				brown: 0
			},
			{
				image: path + 'IMG_0003.jpg',
				color: 'blue',
				points: 1,
				white: 0,
				blue: 2,
				green: 3,
				red: 0,
				brown: 3
			},
			{
				image: path + 'IMG_0004.jpg',
				color: 'brown',
				points: 1,
				white: 3,
				blue: 2,
				green: 2,
				red: 0,
				brown: 0
			},
			{
				image: path + 'IMG_0005.jpg',
				color: 'white',
				points: 2,
				white: 0,
				blue: 0,
				green: 0,
				red: 5,
				brown: 3
			},
			{
				image: path + 'IMG_0006.jpg',
				color: 'blue',
				points: 2,
				white: 0,
				blue: 5,
				green: 0,
				red: 0,
				brown: 0
			},
			{
				image: path + 'IMG_0007.jpg',
				color: 'white',
				points: 2,
				white: 0,
				blue: 0,
				green: 0,
				red: 5,
				brown: 0
			},
			{
				image: path + 'IMG_0008.jpg',
				color: 'green',
				points: 2,
				white: 4,
				blue: 2,
				green: 0,
				red: 0,
				brown: 1
			},
			{
				image: path + 'IMG_0009.jpg',
				color: 'white',
				points: 3,
				white: 6,
				blue: 0,
				green: 0,
				red: 0,
				brown: 0
			},
			{
				image: path + 'IMG_0010.jpg',
				color: 'red',
				points: 1,
				white: 0,
				blue: 3,
				green: 0,
				red: 2,
				brown: 3
			},
			{
				image: path + 'IMG_0011.jpg',
				color: 'green',
				points: 1,
				white: 3,
				blue: 0,
				green: 2,
				red: 3,
				brown: 0
			},
			{
				image: path + 'IMG_0012.jpg',
				color: 'white',
				points: 2,
				white: 0,
				blue: 0,
				green: 1,
				red: 4,
				brown: 2
			},
			{
				image: path + 'IMG_0013.jpg',
				color: 'white',
				points: 1,
				white: 0,
				blue: 0,
				green: 3,
				red: 2,
				brown: 2
			},
			{
				image: path + 'IMG_0014.jpg',
				color: 'red',
				points: 2,
				white: 0,
				blue: 0,
				green: 0,
				red: 0,
				brown: 5
			},
			{
				image: path + 'IMG_0015.jpg',
				color: 'brown',
				points: 2,
				white: 0,
				blue: 0,
				green: 5,
				red: 3,
				brown: 0
			},
			{
				image: path + 'IMG_0016.jpg',
				color: 'green',
				points: 2,
				white: 0,
				blue: 5,
				green: 3,
				red: 0,
				brown: 0
			},
			{
				image: path + 'IMG_0017.jpg',
				color: 'red',
				points: 1,
				white: 2,
				blue: 0,
				green: 0,
				red: 2,
				brown: 3
			},
			{
				image: path + 'IMG_0018.jpg',
				color: 'brown',
				points: 3,
				white: 0,
				blue: 0,
				green: 0,
				red: 0,
				brown: 6
			},
			{
				image: path + 'IMG_0019.jpg',
				color: 'red',
				points: 2,
				white: 3,
				blue: 0,
				green: 0,
				red: 0,
				brown: 5
			},
			{
				image: path + 'IMG_0020.jpg',
				color: 'green',
				points: 2,
				white: 0,
				blue: 0,
				green: 5,
				red: 0,
				brown: 0
			},
			{
				image: path + 'IMG_0021.jpg',
				color: 'blue',
				points: 2,
				white: 2,
				blue: 0,
				green: 0,
				red: 1,
				brown: 4
			},
			{
				image: path + 'IMG_0022.jpg',
				color: 'white',
				points: 1,
				white: 2,
				blue: 3,
				green: 0,
				red: 3,
				brown: 0
			},
			{
				image: path + 'IMG_0023.jpg',
				color: 'blue',
				points: 3,
				white: 0,
				blue: 6,
				green: 0,
				red: 0,
				brown: 0
			},
			{
				image: path + 'IMG_0024.jpg',
				color: 'green',
				points: 3,
				white: 0,
				blue: 0,
				green: 6,
				red: 0,
				brown: 0
			},
			{
				image: path + 'IMG_0025.jpg',
				color: 'red',
				points: 2,
				white: 1,
				blue: 4,
				green: 2,
				red: 0,
				brown: 0
			},
			{
				image: path + 'IMG_0026.jpg',
				color: 'red',
				points: 3,
				white: 0,
				blue: 0,
				green: 0,
				red: 6,
				brown: 0
			},
			{
				image: path + 'IMG_0027.jpg',
				color: 'blue',
				points: 2,
				white: 5,
				blue: 3,
				green: 0,
				red: 0,
				brown: 0
			},
			{
				image: path + 'IMG_0028.jpg',
				color: 'brown',
				points: 1,
				white: 3,
				blue: 0,
				green: 3,
				red: 0,
				brown: 2
			},
			{
				image: path + 'IMG_0029.jpg',
				color: 'blue',
				points: 1,
				white: 0,
				blue: 2,
				green: 2,
				red: 3,
				brown: 0
			},
			{
				image: path + 'IMG_0030.jpg',
				color: 'green',
				points: 1,
				white: 2,
				blue: 3,
				green: 0,
				red: 0,
				brown: 2
			}
		];

		return level2;

}));
