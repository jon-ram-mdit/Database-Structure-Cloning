# Problem Statement

We already had made an all in one vehicle market place website which deals with multiple vehicle types. The project uses postgres database and for representing the vast vehicle information we are about to provide in the platform, we have an existing relational database schema which is made such that which supports inserting vehicle data of multiple vehicle types. What we require is to extract data from various vehicle website of various vehicle types and fit / insert data to our database with fixed schema. Also we want the data to be optimized, clean, normalized and fit actually in our database schema we have.

# Steps to replicate Database in your System:

Our backend system is made on Node.js runtime using the TypeScript programming language where
the database schema is written on TypeORM. To clone this schema follow the following steps:

YouTube Video on How to Setup in your local system: https://youtu.be/TzT2JF8L0Fk

1. First install node.js in your system ( required )
2. Then install the required packages using the command: npm install
3. Please ensure you have an existing database in your system before running the
   script to replicate database.
4. The DBMS used for the project is PostgresSQL. ( if you have installed docker in your
   system then you can create datbase from the provided docker compose file).
   You can run the docker compose up through the command: docker compose up -d
   (keep on mind to change the docker compose database name which is currently
   from upwork_sample_db to upwork_sample_db_{freelancer_name}).
   \*\* {freelancer_name} is a variable name given to your name.
5. Create a postgres database with the following naming upwork_sample_db_{freelancer_name} before running the script to replicate database in your system.
6. Change the database name your have created which is upwork_sample_db_{freelancer_name} in the src/index.ts part change the database key value pair from database: "upwork_sample_db", to
   database: "upwork_sample_db_{freelancer_name}". This part is most important to create tables in database.
7. Then after creating database in your system to replicate the schema by running the
   command npm run dev
8. After running the command if you see this in your output "Data Source has been initialized!" then schema has been replicated in your system. In case any error you will see: Error during Data Source initialization.

# Data Scope / Source

## Scope / Area

The vehicle data we require is for vehicles available in Nepal. As most of the vehicles in Nepal are imported from india. We are targeting to extract vehicle data from indian vehicle websites through which we are trying to extensively collect the majority of vehicles of various vehicle types available in India.

## Target Vehicle Types:

Curently the first main three target vehicle types are: Car, Bike and Scooters. And also we are focusing on extracting data for Bus, Truck, Three Wheelers / Auto later on.

## Websites For Data:

### Car Data:

For car related information [cardekho.com](https://www.cardekho.com/newcars) have details data of cars with categorical images, outer specifications, key specifications / feautres but don't have data of year wise release year of variants. 

Body Type is an important property for car vehicle type. In the provided data source, Body Type is present on the Model Specificaitons Page
[model specificaiton page example](https://www.cardekho.com/tata/tata-tiago-specifications.htm). In this page you will find that body type is found on the Model Specificaiton Page, but when viewing the variant detail page and exploring a particular variant of the model body type will not be found on there. So we must find body type on the Model Specificaitons Page and when inserting variants categorical properties data we might insert the body type property manually on each of the variants of the model. (Considering all the variants of the model have the same 
body type).

Also the car dekho site has the same images of the parent model for all of the variants so extracting categorical images for the model will be enough in respective to car data. But when we explore categorical images is same for the variants but colors are different so we just need to extract the colors of the variant for car data.

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

The data sources mentioned above doesn't have year wise information but only composed of information upto variant.
All of the above site mentioned on the data source has data composed in the hierarchical strucute as: Brand -> Model -> Variant.

Those site don't have data on the year level / yearly information. But all of the major 
information about vehicle  like: ( categorical images, colors, categorical properties ) in our platform is stored on the year level. To match the provided data source information to the structure we have we have developed some algorithm which after executed will inserted yearly information likewise. 

But upto variant level you have to extract detail information provided on those site which includes: Categorical Images along with captions, Color / Multi Color Data along with color name / Categorical Properties along with Clean Values.

# Data Exraction Goal / Path
The ultimate goal is to extract the data from the website into a specific format such that it can be used into the algothm we have developed.

The main goal is to extract the Data as the hierarchical data as following:

Brand -> Brand Name / Image URL

Model -> Model Name, ( What vehicle type does it belongs to? Each model must belong to a particular vehicle type), Model Description ( Description must be in form of MD format, but the description present in the data source must be cleaned ). For car vehicle type we might store the image in the model iteself in the model images entity ( src / modules/ products / entities / end-product / modelImages.ts )

Variant -> Extract the variant name, desc ( similary to that of model in MD format but must be cleaned ). As on the data source dont' have year wise information but in our data we have data in
year wise format we have to extract all of the data present in the variant detail page from the source ( categorical images with captions / colors data / categorical properties )

The goal is to insert the data starting from Brand -> Model -> Variant 
after we have inserted variant then we insert into bulk upload table ( retriving data from this table we run our developed algorithm )

After inserting variant we insert data into these table:

Theese Tables store JSON data for a variant the type of JSON data can be found on the entity iteself. ( See the entity in the path given below ) or you can see what type of JSON we need to store in the location: ( src / Bulk Upload Store ) where the defination of what type of data needed for cardekho and bikedeko is stored.

Simarly example of what type of JSON data that needs to be store can be seen in bikeDekhoBulkUploadExample.json and carDekhoBulkUploadExample.json which is present int the root folder

BikeDekhoPreBulkUploadStore

Purpose: To Store the bulk JSON extracted infromation of variants through which we can run out algorithm. In this table vehicle type wise information is seperated like for which vehicle type is data stored ( as bike dekho is composed of both scooter and bike data)

Location: ( src / modules/ products / entities / end-product /BikeDekhoPreBulkUploadStore.ts )

CarPreYearBulkUploadStore 

Purpose: To Store the bulk JSON extracted infromation of variants for car vehicle type
Location: ( src / modules/ products / entities / end-product / CarPreYearBulkUploadStore.ts )

# Expectation / Requirements

1. Clean / Normalized data as possbile [Read this Blog for getting insight on data cleaning](https://www.vehicledatainfo.com/datacleaning).
2. Make text spec only when required ( we have to stored all possbile values of text spec so we have to make minimum no of text spec when reqired only )
   Eg: Max Torque can have value like: 32.32Nm but if we make this as text spec then we need to store
   all possible values of max torque which can be infinite values like 32.33Nm, 30.32Nm also try to clean
   data for each this type of 32.32Nm it can be cleaned as 32.32 Nm this can be treated as decimal specification with unit as Nm.
3. Get image buffer along with image url itself ( we need image url along with image buffer / image buffer is required to upload the image to our cloud services)
