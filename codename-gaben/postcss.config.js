const tailwindcss = require('tailwindcss');
module.exports = {
	plugins: [
		require('@tailwindcss/ui'),
		tailwindcss('./tailwind.js'),
		require('autoprefixer')
	],
};