module.exports = {
  overrides: [
    {
      files: "*.ts",
      options: {
        ...require("prettier-config-standard")
      }
    },
    {
      files: '*.html',
      options: {
        trailingComma: "es5",
        tabWidth: 4,
        semi: false,
        singleQuote: true
      }
    }
  ]
}