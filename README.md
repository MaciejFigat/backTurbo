build script versions:
"build": "rimraf ./build && tsc backend/src/server.ts",

"build": "rimraf backend/src/server.js && tsc backend/src/server.ts",
"build": "tsc backend/src/server.ts",

"start": "npm run build && node build/index.js",

"start": "npm run build && npm run build --prefix frontend && node backend/build/src/server.js",

 "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"

 {
message: "ENOENT: no such file or directory, stat '/app/backend/build/src/frontend/build/index.html'",
stack: "Error: ENOENT: no such file or directory, stat '/app/backend/build/src/frontend/build/index.html'"
}

web: node backend/build/src/server.js


### floating action menu 

To get the text and its position in the document - browser’s window.getSelection, and a library called xpath-range.

That library gives us the path to the highlighted text in an XPath format, such as div[2]/p[7]/text[1], which means second div, seventh paragraph, and the first chunk of text, for instance. 

npm install xpath-range


1. getSelection()
 returns metadata about the text that has been selected. You can learn more about window.getSelection https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection

2. getXPathParameters(xpath): this function returns the xpath, start, and end offset of the selection, as explained above.

3. onHighlightAction 
We are using redux, so this action will build an annotation object of type highlight and dispatch a saveUserUserAnnotation that will save metadata to the database (more details to follow under the database model session). That metadata is then used to reconstruct a highlighted text once a user refreshes or loads that page again.


*** https://null.turbo-lex.pl/search/?query=test** Valid request
*** https://null.turbo-lex.pl/doc/90218449** Valid request
*** https://null.turbo-lex.pl/doc/85725494?query_doc=skarbu&selected_doc=1** Valid request