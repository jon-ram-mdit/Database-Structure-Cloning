# Steps to replicate Database in your System:
1. First install node.js in your system ( required )
2. Then install the required packages using the command: npm install
3. Please ensure you have an existing database in your system before running the
script to replicate database.
4. The DBMS used for the project is PostgresSQL. ( if you have installed docker installed in your
system then you can create datbase from the provided docker compose file).
You can run the docker compose up through the command: docker compose up -d
(keep on mind to change the docker compose database name which is currently 
from upwork_sample_db to upwork_sample_db_{freelancer_name}).
5. Create your database name with the following naming upwork_sample_db_{freelancer_name} before running the script to replicate database in your system.
6. Then after creating database in your system to replicate the schema by running the 
command npm run dev
7. After running the command if you see this in your output "Data Source has been initialized!" then schema has been replicated in your system. In case any error you will see: Error during Data Source initialization.

# Data Sources for getting data
cardekho.com have details data of cars with categorical images, outer specifications, key specifications / feautres but don't have data of year wise release year of variants.
Similary bikedekho.com consists of detail information of bike and scooters but don't hold information
of released year of variants. 
carsales.com.au and bikesale.com.au holds data for year wise release data for the released variants 
but don't hold data points like key specs/ key feautres/ logo(outer) specifications.
The catch is to use multiple data sources to get multiple information using cardeko and bikedeko to get details and along side using carsale and bikesales for year wise information. There might not be much data intersection between the data sources but implement a startegy to cover mutliple data points
from multiple data sources.

# Understanding the Database 
The database schema of the project is written in TypeORM ( ORM for Node.js) 
The overall schema is hierarchical schema starting from Vehicle Brand.
The starting entitiy of brand is located in : src/modules/products/end-product/brand.ts
Start from the Brand and move down from Brand -> Model -> Variant -> Year
As Model is attached to Vehicle Type (src/modules/products/productType/productTypes.ts)
you may have to created vehicle type explictly before scraping all the Data
View each mandatory field like Brand Name, Brand Image URL  for brand.
Check Mandatory Fields on each of the entity.

!!! Important Thing !!!
Each Year has two types of values: Year Properties Values and Year Outer Spec Values
all year outer spec values belongs to the year properties values ( year int spec values, year text spec values, year feature values, year decimal spec values) and each year is attached to a sub type
and each sub type can have outer specifications so we have to explicitly store year all properties values and year outer spec values

Each Year has a default image url store it, also each year can have various year colors so if possible store all possible colors of a particular released year of variant.

Also each year has categorical images so try to store as much as categorical images of a particular relased year.

Each Sub Type with first have categories, then categories wil have int / dec / text specs and features
and among them some few highlighting propeties will be markes as key specs/ features and outer specifications. The must important part is to make propert sub type along with covering all key properties along with making the sub type there has to be as minimum no of sub types for a vehicle type as possible.


# Expectation / Requirements
1. As each year should be attached to a vehicle sub type and if there will be many vehicle sub types
it will be difficult to manage large no of subtypes so first think of making how to make at least no of sub type possbile.
2. Clean / Normalized data as possbile.
3. Make text spec only when required ( we have to stored all possbile values of text spec so we have to make minimum no of text spec when reqired only )
Eg: Max Torque can have value like: 32.32Nm but if we make this as text spec then we need to store 
all possible values of max torque which can be infinite values like 32.33Nm, 30.32Nm also try to clean
data for each this type of 32.32Nm it can be cleaned as 32.32 Nm this can be treated as decimal specification with unit as Nm.
4. Also one of the top requirements is try to find as much released year of variants try to cover as much relased year of variants ( try to use multiple data sources as possible).
5. Try to get the image buffer along with image url itself ( we need image url along with image buffer / image buffer is required to upload the image to our cloud services)


