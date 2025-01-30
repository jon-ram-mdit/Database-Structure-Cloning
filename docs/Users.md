# Actors

Type of Actors:

1. Client

2. Vendor

## Client

```json
{
    "phone":"string",
    "email":"string",
    "fullname":"string",
    "password":"string"
}
```

## Vendor

```json
{
    "firstname":"string",
    "lastname":"string",
    "phone":"string",
    "company_name":"string/unique",
    "location": {
        "country":"string",
        "province":"string",
        "district":"string",
        "municipality":"string",
        "wordNo": "number"
    }
}
```

**Vendor can create:**

- Users

- Roles

- Showrooms

#### 

#### Users

```json
{
    "firstname":"string",
    "lastname":"string",
    "phone":"string",
    "password":"string",
}
```

#### Roles

```json
{
    "name":"string",
    "rolesMapper": [
        {
        "accessLevels":["admin", "individual"],
        "service":"string",
        "operations":["create","read","update","delete"]
        }
    ]
}
```

Showrooms

```json
{
    "name":"string",
    "description":"string",
    "pan/vat":"string",
    "location": {
        "country":"string",
        "province":"string",
        "district":"string",
        "municipality":"string",
        "wordNo": "number"
    }
}
```

Showrooms can have

- Social Links

- Inventory

- Assign Employes



#### Social Links

```json
{
    "facebook":"string",
    "youtube":"string",
    "instagram":"string",
    "tiktok":"string",
    "linkedin":"string",
    "website":"string",
}
```


