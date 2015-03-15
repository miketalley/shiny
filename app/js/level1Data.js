(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.level1 = factory();
    }
}(this, function () {
		var level1 = {};

		var path = '../shiny/images/level1/';

		level1.cards = [
			{
				image: path + 'IMG_0001.jpg',
				color: 'white',
				points: 0,
				white: 0,
				blue: 2,
				green: 0,
				red: 0,
				brown: 2
			},
			{
				image: path + 'IMG_0002.jpg',
				color: 'brown',
				points: 0,
				white: 2,
				blue: 2,
				green: 0,
				red: 1,
				brown: 0
			},
			{
				image: path + 'IMG_0003.jpg',
				color: 'blue',
				points: 0,
				white: 1,
				blue: 0,
				green: 1,
				red: 1,
				brown: 1
			},
			{
				image: path + 'IMG_0004.jpg',
				color: 'green',
				points: 0,
				white: 1,
				blue: 1,
				green: 0,
				red: 1,
				brown: 1
			},
			{
				image: path + 'IMG_0005.jpg',
				color: 'brown',
				points: 0,
				white: 0,
				blue: 0,
				green: 1,
				red: 3,
				brown: 1
			},
			{
				image: path + 'IMG_0006.jpg',
				color: 'green',
				points: 0,
				white: 1,
				blue: 1,
				green: 0,
				red: 1,
				brown: 2
			},
			{
				image: path + 'IMG_0007.jpg',
				color: 'brown',
				points: 0,
				white: 1,
				blue: 1,
				green: 1,
				red: 1,
				brown: 0
			},
			{
				image: path + 'IMG_0008.jpg',
				color: 'brown',
				points: 0,
				white: 0,
				blue: 0,
				green: 3,
				red: 0,
				brown: 0
			},
			{
				image: path + 'IMG_0009.jpg',
				color: 'blue',
				points: 0,
				white: 1,
				blue: 0,
				green: 2,
				red: 2,
				brown: 0
			},
			{
				image: path + 'IMG_0010.jpg',
				color: 'green',
				points: 0,
				white: 0,
				blue: 2,
				green: 0,
				red: 2,
				brown: 0
			},
			{
				image: path + 'IMG_0011.jpg',
				color: 'blue',
				points: 0,
				white: 0,
				blue: 0,
				green: 0,
				red: 0,
				brown: 3
			},
			{
				image: path + 'IMG_0012.jpg',
				color: 'blue',
				points: 0,
				white: 0,
				blue: 0,
				green: 2,
				red: 0,
				brown: 2
			},
			{
				image: path + 'IMG_0013.jpg',
				color: 'red',
				points: 0,
				white: 3,
				blue: 0,
				green: 0,
				red: 0,
				brown: 0
			},
			{
				image: path + 'IMG_0014.jpg',
				color: 'brown',
				points: 0,
				white: 2,
				blue: 0,
				green: 2,
				red: 0,
				brown: 0
			},
			{
				image: path + 'IMG_0015.jpg',
				color: 'white',
				points: 0,
				white: 0,
				blue: 1,
				green: 2,
				red: 1,
				brown: 1
			},
			{
				image: path + 'IMG_0016.jpg',
				color: 'red',
				points: 0,
				white: 0,
				blue: 2,
				green: 1,
				red: 0,
				brown: 0
			},
			{
				image: path + 'IMG_0017.jpg',
				color: 'brown',
				points: 0,
				white: 0,
				blue: 0,
				green: 2,
				red: 1,
				brown: 0
			},
			{
				image: path + 'IMG_0018.jpg',
				color: 'white',
				points: 0,
				white: 0,
				blue: 0,
				green: 0,
				red: 2,
				brown: 1
			},
			{
				image: path + 'IMG_0019.jpg',
				color: 'blue',
				points: 0,
				white: 1,
				blue: 0,
				green: 1,
				red: 2,
				brown: 1
			},
			{
				image: path + 'IMG_0020.jpg',
				color: 'white',
				points: 0,
				white: 0,
				blue: 3,
				green: 0,
				red: 0,
				brown: 0
			},
			{
				image: path + 'IMG_0021.jpg',
				color: 'white',
				points: 0,
				white: 0,
				blue: 2,
				green: 2,
				red: 0,
				brown: 1
			},
			{
				image: path + 'IMG_0022.jpg',
				color: 'green',
				points: 1,
				white: 0,
				blue: 0,
				green: 0,
				red: 0,
				brown: 4
			},
			{
				image: path + 'IMG_0023.jpg',
				color: 'red',
				points: 0,
				white: 2,
				blue: 0,
				green: 1,
				red: 0,
				brown: 2
			},
			{
				image: path + 'IMG_0024.jpg',
				color: 'red',
				points: 0,
				white: 2,
				blue: 1,
				green: 1,
				red: 0,
				brown: 1
			},
			{
				image: path + 'IMG_0025.jpg',
				color: 'brown',
				points: 0,
				white: 1,
				blue: 2,
				green: 1,
				red: 1,
				brown: 0
			},
			{
				image: path + 'IMG_0026.jpg',
				color: 'blue',
				points: 0,
				white: 1,
				blue: 0,
				green: 0,
				red: 0,
				brown: 2
			},
			{
				image: path + 'IMG_0027.jpg',
				color: 'red',
				points: 0,
				white: 1,
				blue: 0,
				green: 0,
				red: 1,
				brown: 3
			},
			{
				image: path + 'IMG_0028.jpg',
				color: 'green',
				points: 0,
				white: 2,
				blue: 1,
				green: 0,
				red: 0,
				brown: 0
			},
			{
				image: path + 'IMG_0029.jpg',
				color: 'blue',
				points: 0,
				white: 0,
				blue: 1,
				green: 3,
				red: 1,
				brown: 0
			},
			{
				image: path + 'IMG_0030.jpg',
				color: 'red',
				points: 0,
				white: 1,
				blue: 1,
				green: 1,
				red: 0,
				brown: 1
			},
			{
				image: path + 'IMG_0031.jpg',
				color: 'green',
				points: 0,
				white: 0,
				blue: 1,
				green: 0,
				red: 2,
				brown: 2
			},
			{
				image: path + 'IMG_0032.jpg',
				color: 'brown',
				points: 1,
				white: 0,
				blue: 4,
				green: 0,
				red: 0,
				brown: 0
			},
			{
				image: path + 'IMG_0033.jpg',
				color: 'white',
				points: 0,
				white: 0,
				blue: 1,
				green: 1,
				red: 1,
				brown: 1
			},
			{
				image: path + 'IMG_0034.jpg',
				color: 'green',
				points: 0,
				white: 1,
				blue: 3,
				green: 1,
				red: 0,
				brown: 0
			},
			{
				image: path + 'IMG_0035.jpg',
				color: 'blue',
				points: 1,
				white: 0,
				blue: 0,
				green: 0,
				red: 4,
				brown: 0
			},
			{
				image: path + 'IMG_0036.jpg',
				color: 'green',
				points: 0,
				white: 0,
				blue: 0,
				green: 0,
				red: 3,
				brown: 0
			},
			{
				image: path + 'IMG_0037.jpg',
				color: 'red',
				points: 1,
				white: 4,
				blue: 0,
				green: 0,
				red: 0,
				brown: 0
			},
			{
				image: path + 'IMG_0038.jpg',
				color: 'white',
				points: 0,
				white: 3,
				blue: 1,
				green: 0,
				red: 0,
				brown: 1
			},
			{
				image: path + 'IMG_0039.jpg',
				color: 'red',
				points: 0,
				white: 2,
				blue: 0,
				green: 0,
				red: 2,
				brown: 0
			},
			{
				image: path + 'IMG_0040.jpg',
				color: 'white',
				points: 1,
				white: 0,
				blue: 0,
				green: 4,
				red: 0,
				brown: 0
			}
		];

		return level1;

}));
