# Diograph test app

## Usage

```
npm install

npm start
```

Output:
```
Diory {
  id: '1234',
  name: 'Test diory',
  url: 'http://google.com/',
  type: 'webpage',
  background: null,
  date: null }
```

## Development

```
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
npm run e2e
```
