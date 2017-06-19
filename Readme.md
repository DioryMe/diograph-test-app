# Diograph test app

## Usage / Development

```
npm install
webpack
http-server .
```
Then go to: http://localhost:8080/app/index.html

To use and update a local node_module:
```
# Package.json
"diograph-authentication": "../diograph-authentication"
# Update
rm -r node_modules/diograph-authentication/; npm install; webpack
```

## Tests

```
npm test
```

## Deploy

Copy `app/index.html` to `dist/index.html`

```
surge ./dist
```
