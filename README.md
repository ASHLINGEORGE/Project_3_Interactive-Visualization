
#  The Dynamics of Social Equity and GDP Growth A Global Outlook

## Project Overview:
This project is a web application for visualizing various economic indicators such as GDP, Poverty, Unemployment, HDI (Human Development Index), and Literacy. It leverages libraries like Plotly.js and Chart.js to render interactive charts and tables. Users can select different years through a slider and switch between metrics via tabs.

## Tools Used
* Chart.js: A versatile charting library used for rendering various types of charts.
* Plotly.js: Another powerful charting library used for more complex or interactive visualizations.
* JavaScript: The primary programming language used for scripting in the application.
* CSS: For styling the web pages.
* HTML: Structuring the web application's content.

## Usage Instructions
* To improve visibility, open it in Google Chrome.
* To enhance visual performance, adjust the zoom level(zoom in or out) based on the screen size.
* Navigate through tabs to select economic indicators.
* Use the year slider to view data from different years.
* Click on a country to show its annual GDP growth on a line chart over bar chart.
* Hover over bubbles in the bubble chart to see detailed country-specific trends.
* Explore responsive tables for top and bottom country data.

## Task Breakdown
The purpose of your project is to create an interactive data visualization platform using JavaScript along with libraries like Chart.js and Plotly.js, your application transforms complex datasets into engaging, understandable visual representations, enhancing the accessibility and comprehension of economic data.
### Data Collection & Management:
* This script involves acquiring and organizing data for different economic indicators. This involves retrieving data from multiple APIs and databases. To ensure continuous data access and integration, the collected data is stored in GitHub repositories. Access to this data is facilitated through URLs linking to the GitHub-stored datasets, enabling the web application to present the data reliably and consistently for interactive visualizations. This method streamlines data management and bolsters the reliability of the data used in the visualizations.

### Data Visualization: 
* In this project, Chart.js and Plotly.js are utilized to create interactive charts and graphs, essential for data visualization. Chart.js, known for its simplicity and flexibility, is used to render various chart types like line, bar, and bubble charts. It allows customization of chart aspects such as colors, borders, and animations, enhancing user engagement. Plotly.js, recognized for its advanced capabilities, enables more complex and interactive visualizations. It offers features like hover effects, and dynamic updates, which are crucial for a more in-depth data exploration experience. Both libraries are configured to display data accurately, ensuring that users can interact with and understand complex datasets in a more intuitive and visually appealing way.

### User Interface Development: 
* In this project, the user interface is thoughtfully designed to enhance user engagement and ease of navigation. The interface features tabs for various economic indicators like GDP, Poverty, Unemployment, HDI, and Literacy, allowing seamless switching between different data views. A central element is the year slider, which lets users select and view data across different years. The interface also includes responsive tables showcasing the top and bottom countries in each economic category, ensuring dynamic data presentation. Additionally, a bar chart displays the overall annual growth of countries, while an interactive map highlights each country's growth. Clicking on a country on the map updates the bar chart to show that country's specific annual growth trend, creating a cohesive and informative user experience.
* In the project's bubble chart, each bubble represents a country(REPRESENTED BY ITS FLAG), with specific tabs dedicated to displaying economic indicators for top-performing countries. The poverty tab details the poverty levels of economically advanced countries, while the unemployment and HDI tabs respectively showcase unemployment rates and Human Development Index scores for these countries. Similarly, the literacy tab highlights the literacy rates of the most literate countries. When a user hovers over a bubble (representing a country), a popup line chart appears, showing the trend of the particular property (e.g., poverty, unemployment, HDI, literacy) associated with that country.

## Deployment

Link for the webpage: 

## Authors

- [Ashlin Shinu George](https://github.com/ASHLINGEORGE)

## Documentation 

Contact Information: ashlinshinu10@gmail.com


Acknowledgements: 
I extend my gratitude to the following data sources and APIs for their invaluable contributions to my project:

Datasets:

* GDP: https://www.imf.org/external/datamapper/api/v1/NGDP_RPCH
* Poverty: https://ourworldindata.org/poverty
* Literacy: https://ourworldindata.org/literacy
* Unemployment rate: https://www.imf.org/external/datamapper/LUR@WEO/OEMDC/ADVEC/WEOWORLD
* Human Development Index:https://ourworldindata.org/human-development-index
* Google slides:https://slidesgo.com/

I would like to express my sincere gratitude to Kristina for their invaluable guidance, support, and expertise throughout this project. Special thanks to Antonio and Arda for their contributions and insights.

##  Ethical Considerations:

The project is committed to ethical data practices. This includes ensuring the accuracy of the data presented, and being transparent about data sources and processing methodologies. These measures are in place to maintain the integrity of the information and the trust of the users.

## Data Sources

* Plotly library:https://cdn.plot.ly/plotly-latest.min.js
* Chart.js library:https://cdn.jsdelivr.net/npm/chart.js
* GDP anual growth(mapfetch):https://github.com/ASHLINGEORGE/data/blob/main/data_final/mapFetch.json
* Country flags(flag fetch):https://github.com/ASHLINGEORGE/data/blob/main/data_final/flagFetch.json
* Country code:https://github.com/ASHLINGEORGE/data/blob/main/data_final/country_fetch.json
* Poverty:https://github.com/ASHLINGEORGE/data/blob/main/data_final/gdp_pov.json
* Liyeracy:https://github.com/ASHLINGEORGE/data/blob/main/data_final/gdp_lit.json
* Unemployment:https://github.com/ASHLINGEORGE/data/blob/main/data_final/gdp_unemploy.json
* Human Development Index:https://github.com/ASHLINGEORGE/data/blob/main/data_final/gdp_hdi.json
* Gdp_percapita:https://github.com/ASHLINGEORGE/data/blob/main/data_final/gdp_usd.json


