class Card < ActiveRecord::Base

	TYPES = [
		'level1',
		'level2',
		'level3',
		'noble'
	]

	COLORS = [
		'white',
		'blue',
		'green',
		'red',
		'brown'
	]

	POINT_VALUES = [0, 1, 2, 3, 4, 5]

end
