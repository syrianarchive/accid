# ACCID

ACCID - a set of libraries and database tools to easily orchestrate clustering and annotation of units from separately maintained databases

Accid let's databases of unit data manage themselves, and simply stores a key and annotation to that data.  It is not meant for high speed transatcions or use, but for offering flexibility and modularisation for a team to export and import data.

ACCID api and frontend are still in development.

an accid unit looks like this:

```
{
  accidid: "{sha256}", // internal reference
  db: "webscraped" // the database this is referring to
  id: "56" // the item in the above database
  cluster: [accidids...] // the related accid units, from disparate databases
  annotations: {} // an object of custom annotation fields
}
```

Accid allows you to simply import data, like

```
actions['import_sheet'](args)
      .then(accid.set)
```

## Annotations

You can set multiplte types of annotations in `annotations`, depending on the database.

Currently, `observation` and `incident` are available.

Annotations allow each annotation key to take in data and transform it into clusters or other data.

Each annotation file should expose a `getter` and a `setter` fot annotation fields.  these functions are passed the unit, and the key and value to be manipulated. if a getter and a setter for a field are not set, the default is used to return the field unmanipulated.  these are supplied like this:

```
const fields = {
  verified: booleanField,
  filename: {
    get: (u, k, v) => u,
    set: (u, k, v) => loSet('annotations.filename', 'regex or function', u)
  },
  location: locationClusterField,
}
```

## Databases

Accid connects to many different types of databases, which have standardized behaviour.  At the moment, it can connect to mongodb, json files, and sugarcube databases.

databases should expose the following standard functions
```
database.get(id)
database.list(page)
database.listAll()
database.find(filterFunc)
database.findBy(key, term)
database.search(term)
```

## Running

Accid needs a database configuration file - `config/databases.json`

Each database needs a connection string, an annotation type, and any other config options the database type needs.

An example file:

```
[
  {
    "name": "webscraped",
    "description": "Web scraped observation data",
    "type": "sugarcube",
    "connection": "mongodb://127.0.0.1:27017/observations",
    "annotations": "observation"
  },
  {
    "name": "locations",
    "description": "syrian archive locations database",
    "type": "json",
    "connection": "../../../data/locations.json",
    "id_key": "id",
    "annotations": "locations"
  {
    "name": "incidents",
    "description": "Incidents for clustering",
    "type": "mongodb",
    "connection": "mongodb://127.0.0.1:27017/incidents",
    "id_key": "incident_code",
    "annotations": "incident"
  }
]
```

Accid also needs an `config/accid.json` file 

```
{
  "name": "accid",
  "description": "archival context fields and clustering data",
  "type": "accid",
  "connection": "mongodb://127.0.0.1:27017/accid"
}
```

## Development

start the frontend app server:

`npm run startapp`

start the api server:

`npm run startapi`

start the webpack dev server:

`npm run dev:wds`


















