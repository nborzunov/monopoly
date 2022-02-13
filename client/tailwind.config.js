module.exports = {
	purge: {
		enabled: process?.argv?.indexOf("build") !== -1,
		content: ["./src/**/*.html", "./src/**/*.ts", "./projects/**/*.html", "./projects/**/*.ts"],
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [],
}
