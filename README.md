# cucumber-json-to-html
A Node.js app for converting a JSON file generated via `cucumber -f json` into a user friendly HTML list of features and scenarios.

### Usage
To print the generated HTML to console:  
  
`node ./src/app {inputJSONfile}`
  
to save to disk just redirect the output to file (i.e. on Windows)

`node ./src/app {inputJSONfile} > {outputHTMLfile}`
