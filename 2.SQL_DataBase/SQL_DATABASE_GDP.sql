DROP TABLE IF EXISTS mapfetch, poverty, literacy, unemployment, humandevelopmentindex, country_fetch, flag_fetch, flagf, gdp_usd;

-- Create a PostgreSQL database
CREATE DATABASE global_economics;

-- Create the 'mapfetch' table
CREATE TABLE IF NOT EXISTS mapfetch (
    country VARCHAR(255),
    "1980" VARCHAR(10),
    "1981" VARCHAR(10),
    "1982" VARCHAR(10),
    "1983" VARCHAR(10),
    "1984" VARCHAR(10),
    "1985" VARCHAR(10),
    "1986" VARCHAR(10),
    "1987" VARCHAR(10),
    "1988" VARCHAR(10),
    "1989" VARCHAR(10),
    "1990" VARCHAR(10),
    "1991" VARCHAR(10),
    "1992" VARCHAR(10),
    "1993" VARCHAR(10),
    "1994" VARCHAR(10),
    "1995" VARCHAR(10),
    "1996" VARCHAR(10),
    "1997" VARCHAR(10),
    "1998" VARCHAR(10),
    "1999" VARCHAR(10),
    "2000" VARCHAR(10),
    "2001" VARCHAR(10),
    "2002" VARCHAR(10),
    "2003" VARCHAR(10),
    "2004" VARCHAR(10),
    "2005" VARCHAR(10),
    "2006" VARCHAR(10),
    "2007" VARCHAR(10),
    "2008" VARCHAR(10),
    "2009" VARCHAR(10),
    "2010" VARCHAR(10),
    "2011" VARCHAR(10),
    "2012" VARCHAR(10),
    "2013" VARCHAR(10),
    "2014" VARCHAR(10),
    "2015" VARCHAR(10),
    "2016" VARCHAR(10),
    "2017" VARCHAR(10),
    "2018" VARCHAR(10),
    "2019" VARCHAR(10),
    "2020" VARCHAR(10),
    "2021" VARCHAR(10),
    "2022" VARCHAR(10),
    "2023" VARCHAR(10),
    "2024" VARCHAR(10),
    "2025" VARCHAR(10),
    "2026" VARCHAR(10),
    "2027" VARCHAR(10),
    "2028" VARCHAR(10),
    PRIMARY KEY (Country)
);

-- Create the 'poverty' table
CREATE TABLE IF NOT EXISTS poverty (
    country VARCHAR(50),
    code CHAR(2) ,
    Year INT NOT NULL,
    poverty_line DECIMAL(5, 2),
    poverty_rate DECIMAL(10, 8),
    gdp_perCapita DECIMAL(10, 4),
    PRIMARY KEY (Country, Year)
);

-- Create the 'literacy' table
CREATE TABLE IF NOT EXISTS literacy (
    country VARCHAR(50) NOT NULL,
    code CHAR(4),
    year INT NOT NULL,
    literacy DECIMAL(10, 5),
    gdp_percapita VARCHAR (15),
    PRIMARY KEY (Country, Year)
);

-- Create the 'unemployment' table
CREATE TABLE IF NOT EXISTS unemployment(
    country VARCHAR(50) NOT NULL,
    code CHAR(4),
    year INT NOT NULL,
    unemployment_rate DECIMAL(10, 3),
    gdp_percapita VARCHAR(10),
    PRIMARY KEY (Country, Year)
);

-- Create the 'humandevelopmentindex' table
CREATE TABLE IF NOT EXISTS humandevelopmentindex(
    country VARCHAR(50) NOT NULL,
    code CHAR(4),
    year INT NOT NULL,
    human_development_index DECIMAL(10, 3),
    gdp_perCapita VARCHAR(10),
    PRIMARY KEY (Country, Year)
);

-- Create the 'country_fetch' table
CREATE TABLE country_fetch (
    country_code VARCHAR(3) PRIMARY KEY,
    country_name VARCHAR(50)
);

-- Create the 'flag_fetch' table
CREATE TABLE flag_fetch (
    name VARCHAR(50) PRIMARY KEY,
    flag VARCHAR(255),
    code VARCHAR(2),
    dial_code VARCHAR(10)
);

-- Create the 'gdp_usd' table
CREATE TABLE gdp_usd (
    Entity VARCHAR(50) ,
    Code VARCHAR(15),
    Year INT,
    GDP DECIMAL(18, 2),
    PRIMARY KEY (Entity, Year)
);

--Select queries
SELECT * FROM country_fetch;
SELECT * FROM flag_fetch;
SELECT * FROM gdp_usd;
SELECT * FROM humandevelopmentindex;
SELECT * FROM literacy;
SELECT * FROM mapfetch;
SELECT * FROM poverty;
SELECT * FROM unemployment;