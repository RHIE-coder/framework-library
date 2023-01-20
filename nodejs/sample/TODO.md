# Structure

```bash
src
├── auth
├── config
├── connector
│   ├── drivers
│   ├── requests
│   └── sdk
├── loader
├── middleware
├── model
├── public
├── routes
├── rules
├── service
├── utils
└── views
```

# TODO: Access Control

 `POST /storage/directory/:collection`

rules, condition, operations, action, environment, session

allowance: false

## [ User, Subject ]

| key | value |
|:---:|:---:|
|**username**| `rhiecoder` |
|**authority**| array$ |
|||

### - $authority

```js
[
    
]
```

## [ Roles ]

| key | value |
|:---:|:---:|
|**identity**| `ADMIN` |
|****||

## [ Resource, Object ]

| key | value |
|:---:|:---:|
|**identity**| `/storage/directory/:collection` |
|||
