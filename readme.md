# Problem Statement

We already had an already made a all in one vehicle market place website which deals with multiple vehicle types. The project uses postgres database and for representing the vast vehicle information we are about to provide in the platform we have an existing relational database schema which is made such that which supports inserting vehicle data of multiple vehicle types. What we require is to extract data from various vehicle website of various vehicle types and fit / insert data to our database with fixed schema. Also we want the data to be optimized, clean, normalized and fit actually in our database schema we have.

# Steps to replicate Database in your System:

Our backend system is made on Node.js runtime using the TypeScript programming language where
the database schema is written on TypeORM. To clone this schema follow the following steps:

YouTube Video on How to Setup in your local system: https://youtu.be/TzT2JF8L0Fk

1. First install node.js in your system ( required )
2. Then install the required packages using the command: npm install
3. Please ensure you have an existing database in your system before running the
   script to replicate database.
4. The DBMS used for the project is PostgresSQL. ( if you have installed docker installed in your
   system then you can create datbase from the provided docker compose file).
   You can run the docker compose up through the command: docker compose up -d
   (keep on mind to change the docker compose database name which is currently
   from upwork*sample_db to upwork_sample_db*{freelancer_name}).
   \*\* {freelancer_name} is a variable name given to your name.
5. Create your database name with the following naming upwork*sample_db*{freelancer_name} before running the script to replicate database in your system.
6. Change the database name your have created which is upwork*sample_db*{freelancer*name} in the src/index.ts part change the database key value pair from database: "upwork_sample_db", to
   database: "upwork_sample_db*{freelancer_name}". This part is most important to create tables in database.
7. Then after creating database in your system to replicate the schema by running the
   command npm run dev
8. After running the command if you see this in your output "Data Source has been initialized!" then schema has been replicated in your system. In case any error you will see: Error during Data Source initialization.

# Data Scope / Source

## Scope / Area

The vehicle data we require is for vehicles available in Nepal. As
most of the vehicles in Nepal are imported from india. We are targeting to extract vehicle data from indian vehicle websites through which we are trying to extensively collect the majority of vehicles of various vehicle types available in India.

## Target Vehicle Types:

Curently the first main three target vehicle types are:
Car, Bike and Scooters and also focusing on extracting data
for Bus, Truck, Three Wheelers / Auto.

## Websites For Data:

### Car Data:

For car related information [cardekho.com](https://www.cardekho.com/newcars) have details data of cars with categorical images, outer specifications, key specifications / feautres but don't have data of year wise release year of variants.

## Bike and Scooters

Similary [bikedekho](https://www.bikedekho.com/new-bikes) consists of detail information of bike and scooters but don't hold information of released year of variants.

It is composed of both bike and scooter data so extract it properly like either filter data first of scooter then of bike.
Or first scrape first scooter data then of bike.

## Trucks

Trucks data can be found on [truckdekho](https://trucks.cardekho.com/). Note: This site consists of 3 Wheeler data and also of auto / tampo data so we need to filter our our data properly according to the body type / vehicle type provided on the platform.

## Bus

Bus data can be found on [busdekho](https://buses.cardekho.com/). This site consist of bus, van and auto/tampoo data so we need to filter our data properly according to the body type / vehicle type provided on the platform.

# Understanding the Database

The database schema of the project is written in TypeORM ( ORM for Node.js)
The overall schema is hierarchical schema starting from Vehicle Brand.
The starting entitiy of brand is located in : src/modules/products/end-product/brand.ts
Start from the Brand and move down from Brand -> Model -> Variant -> Year
As Model is attached to Vehicle Type (src/modules/products/productType/productTypes.ts)
you may have to created vehicle type explictly before scraping all the Data
View each mandatory field like Brand Name, Brand Image URL for brand.
Check Mandatory Fields on each of the entity.

!!! Important Thing !!!
Each Year has two types of values: Year Properties Values and Year Outer Spec Values
all year outer spec values belongs to the year properties values ( year int spec values, year text spec values, year feature values, year decimal spec values) and each year is attached to a sub type
and each sub type can have outer specifications so we have to explicitly store year all properties values and year outer spec values

Each Year has a default image url store it, also each year can have various year colors so if possible store all possible colors of a particular released year of variant.

Also each year has categorical images so try to store as much as categorical images of a particular relased year.

Each Sub Type with first have categories, then categories wil have int / dec / text specs and features
and among them some few highlighting propeties will be markes as key specs/ features and outer specifications. The must important part is to make propert sub type along with covering all key properties along with making the sub type there has to be as minimum no of sub types for a vehicle type as possible.

The data sources mentioned above doesn't have year wise information but only composed of information upto variant.
All of the above site has data composed in the hierarchical strucute as: Brand -> Model -> Variant

The data sources mentioned above doesn't hold information of when was the variant released ( which year was the variant was released and released date of the variant).
But in our data our top level hierarchical structure ends at year: and all the vehicle properties / images / colors is stored in the year level of hierarchy.
So when we reach the variant level while scrapping above data source try to search parallel on google like when was this variant released on india.
Eg like try searching when was Tata Nexon SE releaesd ? Try to find the released year and released date on the internet. If not found the released date and year of that variant
consider the variant as released on year 2024 with random date between first of 2024 and last of 2024.


# Expectation / Requirements

1. !!! Minimum No of Sub Types for a Vehicle Type !!! As each year should be attached to a vehicle sub type and if there will be many vehicle sub types
   it will be difficult to manage large no of subtypes so first think of making how to make at least no of sub type possbile. Cracking the algorithm to make minimum no of
   sub types as possible is a must and should be thought early.
2. Clean / Normalized data as possbile.
3. Make text spec only when required ( we have to stored all possbile values of text spec so we have to make minimum no of text spec when reqired only )
   Eg: Max Torque can have value like: 32.32Nm but if we make this as text spec then we need to store
   all possible values of max torque which can be infinite values like 32.33Nm, 30.32Nm also try to clean
   data for each this type of 32.32Nm it can be cleaned as 32.32 Nm this can be treated as decimal specification with unit as Nm.
4. Get image buffer along with image url itself ( we need image url along with image buffer / image buffer is required to upload the image to our cloud services)
