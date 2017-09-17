# Diograph test app

## Usage / Development

```
npm start
```
Then go to: http://localhost:4202/


## Tests

```
npm test
```

## Deploy

```
webpack
cp app/index.html dist/index.html
# Change "../dist/bundle.js" to "bundle.js" in dist/index.html
surge ./dist diory-test-app.surge.sh
```
