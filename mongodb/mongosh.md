# Mongosh

## # Base Usage

### - Connection

```sh
mongosh "mongodb://localhost:27017" --username alice --authenticationDatabase admin
password> *****
```

### - db

```sh
show dbs
use someDB
```

### - collection

```sh
show collections
db.[collectionName].[queryMethod]()
```
