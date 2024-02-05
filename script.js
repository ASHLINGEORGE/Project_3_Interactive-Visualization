// Define the URLs for each dataset
const baseUrl = 'https://raw.githubusercontent.com/ASHLINGEORGE/data/main/data_final/';
let lineChart;
let bubbleChart;
let selectedYear = "2015";
let currentProps;
let allValues = {};
let chart;
let selectedCountry;
let top5countries= ["United States", "China", "Japan",  "Germany",'United Kingdom','Brazil','Spain','Canada','Russia','Italy'];

const missingFlags = {
    "Cabo Verde": "CV",
    "Lao P.D.R.": "LA",
    "S\u00E3o Tom\u00E9 and Pr\u00EDncipe": "ST",
    "T\u00FCrkiye, Republic of": "TR",
    "Micronesia, Fed. States of": "FM",
    "West Bank and Gaza": "PS",
    "C\u00F4te d'Ivoire": "CI",
    "Kyrgyz Republic": "KG",
    "Micronesia (country)": "FM"
};
let tabProps = {
    "Map": {
        "data": {}
    },
    "Country": {
        "data": {}
    },
    "Flag": {
        "data": {}
    },
    "Usd": {
        "data": {}
    },
    "Poverty": {
        "data": {},
        "x": "gdp_percapita",
        "y": "poverty_rate",
        "r": "poverty_line",
        "radius": 10
    },
    "Literacy": {
        "data": {},
        "x": "gdp_percapita",
        "y": "litreacy",
        "r": "litreacy",
        "radius": 0.2
    },
    "Unemployment": {
        "data": {},
        "x": "gdp_percapita",
        "y": "unemployment_rate",
        "r": "unemployment_rate",
        "radius": 3
    },
    "HDI": {
        "data": {},
        "x": "gdp_percapita",
        "y": "Human Development Index",
        "r": "Human Development Index",
        "radius": 15
    }
};
class BubbleChart {
    name;
    bubbleData;
    chart;
    lineChartPopup;
    constructor(name) {
        this.name = name;
        this.bubbleData = [];
        this.lineChartPopup = document.getElementById(this.name.toLowerCase()).querySelector('#lineChartPopup');
    }
    create(label, data) {
        this.bubbleData = data;          
        this.chart = new Chart(document.getElementById(this.name.toLowerCase()).querySelector('#bubbleChart').getContext('2d'), {
            type: 'bubble',
            data: {
                datasets: [{
                    label: label,
                    data: this.bubbleData,
                    backgroundColor: 'rgb(252, 110, 0)',
                    borderColor: 'white', 
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        beginAtZero: true,
                        max: 140000,
                        title: {
                            display: true,
                            text: 'GDP Per Capita', // Title for the x-axis
                            color: 'white', // Change the text color to white
                            font: {
                                size: 14, // Change the font size of x-axis labels
                                weight: 'bold' // Make the title bold
                            }
                        },
                        ticks: {
                            stepSize: 1000,
                            beginAtZero: true,
                            color: 'white', // Change the color of x-axis labels
                            font: {
                                size: 14 // Change the font size of x-axis labels
                            }
                        },
                        grid: {
                            display: true, // Display grid lines for the x-axis
                            color: 'hsla(285, 40%, 43%, 0.2)' // Set the color of the grid lines
                        }
                    },
                    y: {
                        position: 'left',
                        title: {
                            display: true,
                            text: this.name + ' Rate', // Title for the y-axis
                            color: 'white', // Change the text color to white
                            font: {
                                size: 14, // Change the font size of y-axis labels
                                weight: 'bold' // Make the title bold
                            }
                        },
                        ticks: {
                            beginAtZero: true,
                            color: 'white',
                            font: {
                                size: 14
                            },
                            // Add conditional callback for ticks
                            callback: function(value, index, values) {
                                // Check if the chart name is 'HDI', then format to 2 decimal places
                                if (this.name === 'HDI') {
                                    return value.toFixed(2); // Format to 2 decimal places
                                }
                                // Otherwise, append '%' if name is not 'HDI'
                                return this.name !== 'HDI' ? value + '%' : value;
                            }.bind(this) // Bind 'this' to access the class property 'name'
                        },
                        grid: {
                            display: true, // Display grid lines for the y-axis
                            color: 'hsla(105, 40%, 43%, 0.2)' // Set the color of the grid lines
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                onHover: this.hover,
                onLeave: function (event, elements) {
                    bubbleChart.lineChartPopup.style.display = 'none';
                }
            },
            plugins: [{
                afterUpdate: function (chart, options) {
                    const meta = chart.getDatasetMeta(0);                    
                    meta.data.forEach((point, index) => {
                        const value = chart.data.datasets[0].data[index].r; // Get the bubble radius value                        

                        const icon = new Image();
                        icon.src = bubbleChart.bubbleData[index].flag;

                        // Set the width and height of the icon to create a circular shape
                        icon.width = value * 3;
                        icon.height = value * 3;

                        // Make the icon circular by setting border-radius
                        icon.style.borderRadius = '50%';

                        // Make the icon transparent
                        icon.style.opacity = 0.5;

                        point.options.pointStyle = icon;
                    });                    
                },
            }]
        });
    }
    hover(event, elements) {
        if (elements.length > 0) {
            const index = elements[0].index;
            const selectedCountryData = currentProps.data.filter(item => item.country === bubbleChart.bubbleData[index].country);
            const labels = selectedCountryData.map(item => item.year);
            const label = `${bubbleChart.name} rate of ${selectedCountryData[0]?.country || 'Selected Country'}`;
            const countryData = selectedCountryData.map(item => item[currentProps.y]);
            lineChart.update(labels, label, countryData);
            // Adjust the position of the popup. You might need to tweak the offsets
            bubbleChart.lineChartPopup.style.left = `${event.native.clientX - 100}px`;
            bubbleChart.lineChartPopup.style.top = `${event.native.clientY - bubbleChart.lineChartPopup.offsetHeight - 150}px`;

            bubbleChart.lineChartPopup.style.display = 'block';
        } else {
            bubbleChart.lineChartPopup.style.display = 'none';
        }
        event.chart._stop();
    }
    update(label, data) {
        this.bubbleData = data;
        this.chart.data.datasets[0].data = this.bubbleData;
        this.chart.data.datasets[0].label = label;
        this.chart.update();
    }
    destroy() {
        this.chart.destroy();
    }
}

class LineChart {
    name;
    lineData;
    chart;
    constructor(name) {
        this.name = name;
    }
    create(label, data) {
        this.lineData = data;
        this.chart = new Chart(document.getElementById(this.name.toLowerCase()).querySelector('#lineChart').getContext('2d'), {
            type: 'line',
            data: {
                datasets: [{
                    label: label,
                    data: data,
                    borderColor: 'rgb(242, 143, 62)',
                    backgroundColor: 'rgb(242, 143, 62)',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: 'white' // Set the label color to white
                        }
                    }
                },
                scales: {
                    x: {
                        position: 'bottom', // Show x-axis at the bottom
                        title: {
                            display: true,
                            text: 'Years',
                            color: 'white'
                        },
                        ticks: {
                            beginAtZero: true,
                            color: 'white'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: `${this.name} Rate`,
                            color: 'white'
                        },
                        ticks: {
                            beginAtZero: true,
                            color: 'white'
                        }
                    }
                }
            }
        });
    }
    update(labels, label, data) {
        this.chart.data.datasets[0].data = data;
        this.chart.data.datasets[0].label = label;
        this.chart.data.labels = labels;
        this.chart.update();
    }
    destroy() {
        this.chart.destroy();
    }
}


function load(year, tab) {
    currentProps = tabProps[tab];

    // Create an empty LineChart for the tab
    lineChart = new LineChart(tab);
    lineChart.create({}, {});

    // Declare filteredData variable
    let filteredData;
    currentProps.data.forEach(x => x.code = getCountryCode(x.country));
    // Check if the current tab is "Literacy"
    if (tab === "Literacy") {

        // Filter data for the selected year without any country restrictions
        const top10Data = currentProps.data.filter(item => item.year === parseInt(year) && item.code != null && item.code != undefined);

        // Sort the data array by literacy rate in descending order
        top10Data.sort((a, b) => b[currentProps.y] - a[currentProps.y]);

        // Slice the top 10 items
        filteredData = top10Data.slice(0, 10);
    } else {
        // Filter data for the selected year and restrict to top5countries
        filteredData = currentProps.data.filter(item => item.year === parseInt(year) && item.code != null && item.code != undefined && top5countries.includes(item.country));
    }
    // Generate bubble chart data for the current tab
    const bubbleData = filteredData.map(item => ({
        x: item[currentProps.x],
        y: item[currentProps.y],
        r: item[currentProps.r] * currentProps.radius,
        country: item.country,
        year: item.year,
        flag: getFlagUrl(item.country)
    }));

    // Check if the bubble chart exists and update it or create a new chart
    if (bubbleChart) {
        bubbleChart.update("Countries", bubbleData);
    }
    else {
        bubbleChart = new BubbleChart(tab);
        bubbleChart.create("Countries", bubbleData);
    }
}
function getCountryCode(countryName) {
    let countryCode;
    tabProps.Flag.data.forEach(function (x) {
        if (x.name.includes(countryName) || countryName.includes(x.name)) {
            countryCode = x.code;
        }
    });
    if (countryCode == undefined) {
        countryCode = missingFlags[countryName];
    }
    return countryCode;
}
function getFlagUrl(countryName) {
    return "https://flagsapi.com/" + getCountryCode(countryName) + "/flat/64.png"
}

function loadContent(year) {
    selectedYear = year;
    loadTabContent(year, undefined);
}

function loadTabContent(year, tab) {    
    if (tab == undefined) {
        tab = document.querySelector('input[type="radio"]:checked').parentElement;
    }
    const tabText = tab.childNodes[3].innerText;
    tab.querySelector('input').checked = true
    if (tabText == "GDP") {
        if (tabProps.Map.data) {
            loadPage(year);
        }
        return;
    }
    if (lineChart) {
        lineChart.destroy();
        lineChart = undefined;
    }
    if (bubbleChart) {
        bubbleChart.destroy();
        bubbleChart = undefined;
    }
    load(year, tabText);
}

function loadPage(year) {
    updateMap(year);
    document.getElementById('yearSlider').value = year;

    Object.keys(tabProps.Map.data).forEach(x => {
        if (tabProps.Country.data[x]) {
            Object.keys(tabProps.Map.data[x]).forEach(y => {
                if (parseInt(y) >= 1995 && parseInt(y) <= 2022) {
                    allValues[y] = (parseFloat(allValues[y]) || 0) + parseFloat(tabProps.Map.data[x][y]);
                }
            });
        }
    });

    if (!selectedCountry) {
        createLineChart(allValues, year);
    } else {
        Object.keys(tabProps.Country.data).forEach(x => {
            if (tabProps.Country.data[x].label === selectedCountry) {
                createLineChart(allValues, year, selectedCountry, processCountryData(tabProps.Map.data[x]));
                return;
            }
        });
    }
}

function updateMap(selectedYear) { 
    var customColorScale = [
        [0, 'rgb(255, 128, 128)'], // Light pastel red for values at 0 (bottom 25%)
        [0.25, 'rgb(255, 128, 128)'], // Light pastel red for values around 0.25 (bottom 25%)
        [0.5, 'rgb(230, 230, 250)'], // Pastel  for values at 0.5 (middle 50%)
        [0.75, 'rgb(173, 216, 230)'], // Pastel blue for values around 0.75 (middle 50%)
        [1, 'rgb(144, 238, 144)'] // Light pastel green for values at 1 (top 25%)
    ];

    var mapValue = Object.keys(tabProps.Map.data).map(
        function (x) {
            if (tabProps.Country.data[x]) {
                return {
                    key: tabProps.Country.data[x].label,
                    value: tabProps.Map.data[x][selectedYear]
                }
            }
        }).filter(function (x) {
            return !(x == undefined || isNaN(x.value));
        });

    var data = [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: mapValue.map(d => d.key),
        z: mapValue.map(d => d.value),
        text: mapValue.map(d => d.key),
        colorscale: customColorScale,
        colorbar: {
            y: 0.1, x: 1.2, yanchor: "bottom", len: .8, title: { text: "GDP Growth Scale", side: "right" },
            xanchor: "right"
        }
    }];

    var layout = {
        mapbox: { style: "dark", center: { lon: -110, lat: 50 }, zoom: 1.5 },
        width: 900, height: 400, margin: { t: 0, b: 0 }
    };
    //document.getElementById('header').innerHTML = 'Real GDP Growth in ' + selectedYear;
    // Update the map
    Plotly.newPlot('gdpgrowth', data, layout);

    // Add an event listener for plotly_click event
    document.getElementById('gdpgrowth').on('plotly_click', function (eventData) {
        if (eventData.points.length > 0) {
            // Extract the clicked country name
            selectedCountry = eventData.points[0].location;
            Object.keys(tabProps.Country.data).forEach(
                function (x) {
                    if (tabProps.Country.data[x].label == selectedCountry) {
                        createLineChart(allValues, selectedYear, selectedCountry, processCountryData(tabProps.Map.data[x]))
                        return;
                    }
                }
            )
        }
    });
    
    updateCountriesTable(tabProps.Usd.data.filter(x => x.Entity != "World" && x.Code != "" && (x.Year == selectedYear)).sort((a, b) => b['GDP (constant 2015 US$)'] - a['GDP (constant 2015 US$)']).slice(0, 5), "top");
    updateCountriesTable(tabProps.Usd.data.filter(x => x.Entity != "World" && x.Code != "" && (x.Year == selectedYear)).sort((a, b) => a['GDP (constant 2015 US$)'] - b['GDP (constant 2015 US$)']).slice(0, 5), "bottom");
}

function processCountryData(countryValues) {
    for (const key in countryValues) {
        if (parseInt(key) < 1995 && parseInt(key) >2022) {
            delete jsonData[key];
        }
    }
    return countryValues
}

function createLineChart(allValues, year, country, countryValues) {
    const ctx = document.getElementById('myChart').getContext('2d');
    if (chart) {
        chart.destroy();
        chart = undefined;
    }

    // Calculate background colors for each bar
    const dataValues = Object.values(allValues).slice(0, year - 1995 + 1);
    const backgroundColors = dataValues.map((value, index) => {
        if (index === 0) return '#AEC6CF'; // Default color for the first bar
        return value > dataValues[index - 1] ? '#AEC6CF' : '#ff6961'; // Pastel green if higher, red if lower
    });

    var values = {
        type: 'bar',
        data: {
            labels: Object.keys(allValues).slice(0, year - 1995 + 1),
            datasets: [{
                fill: false,
                type: 'bar', // Set the chart type for this dataset to line
                label: 'All',
                backgroundColor: backgroundColors, // Set dynamic background color for each bar
                data: dataValues,
                yAxisID: 'y-axis-1',
            }],
        },
        options: {
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'white' // Set the label color to white
                    }
                }
            },
            scales: {
                y: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'GDP Annual Growth',
                        color: 'white'
                    },
                    id: 'y-axis-1',
                    grid: {
                        drawOnChartArea: false,
                    },
                    ticks: {
                        beginAtZero: true,
                        color: 'white'
                    }
                }, {
                    type: 'linear', // Set the type of the right y-axis
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    ticks: {
                        beginAtZero: true,
                        color: 'white'
                    }
                }],
                x: {
                    title: {
                        display: true,
                        text: 'Years',
                        color: 'white'
                    },
                    ticks: {
                        stepSize: 1,
                        color: 'white'
                    }
                },
            },
            interaction: {
                mode: 'index',
                intersect: false,
            },
            onClick: function (event, elements) {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const value = Object.keys(allValues)[index];
                    loadPage(value);
                }
            },
        },
    };

    if (countryValues != null) {
        values.data.datasets.unshift({
            type: 'line',
            label: country,
            backgroundColor: 'red',
            borderColor: 'white',
            borderWidth: 2,
            borderRadius: 50,
            data: Object.values(countryValues),
            yAxisID: 'y-axis-2',
        });
    }
    
    chart = new Chart(ctx, values);
}

function updateCountriesTable(countryData, sort) {
    // Update HTML Table
    let tableBody = document.getElementById(sort + 'CountriesTableBody');
    tableBody.innerHTML = '';
    tabProps.Flag.data.forEach(function (x) {
        countryData.forEach(function (y) {
            if (y.Entity.includes(x.name) || x.name.includes(y.Entity)) {
                y["code"] = x.code;
            }
        });
    });
    countryData.forEach((country, index) => {
        let row = tableBody.insertRow();
        let nameCell = row.insertCell(0);
        let growthCell = row.insertCell(1);
        
        // Alternate row colors
        if (index % 2 === 0) {
            row.style.backgroundColor = "#7868d1"; // Set your preferred background color
        }
        
        var img = document.createElement("img");
        country.code = country.code ?? missingFlags[country.Entity];
        img.src = "https://flagsapi.com/" + country.code + "/flat/64.png";
        img.alt = country.Entity;
        img.style.width = "25px"; // Set the width as needed
        nameCell.appendChild(img);

        var spanElement = document.createElement("span");
        spanElement.textContent = country.Entity;
        nameCell.appendChild(spanElement);

        growthCell.innerHTML = country['GDP (constant 2015 US$)']; // Format the growth rate
    });
}
document.addEventListener("DOMContentLoaded", function () {
    // Fetch the Poverty data
    function fetchData(url) {
        return fetch(baseUrl + url + '.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            });
    }

    // Handle all API fetches using Promise.all
    Promise.all([fetchData('mapFetch'), fetchData('country_fetch'), fetchData('flagFetch'), fetchData('gdp_pov'), fetchData('gdp_lit'), fetchData('gdp_unemploy'), fetchData('gdp_hdi'), fetchData('gdp_usd')])
        .then(dataArray => handleApiData(dataArray))
        .catch(error => handleError(error));

 

    function handleApiData(dataArray) {
        const [mapData, countryData, flagData, povertyData, literacyData, unemploymentData, hdiData, usd] = dataArray;
        tabProps.Map.data = mapData.values.NGDP_RPCH;
        tabProps.Country.data = countryData.countries;
        tabProps.Usd.data = usd;
        tabProps.Flag.data = flagData;
        tabProps.Poverty.data = JSON.parse(povertyData);
        tabProps.Literacy.data = JSON.parse(literacyData);
        tabProps.Unemployment.data = JSON.parse(unemploymentData);
        tabProps.HDI.data = JSON.parse(hdiData);      
        loadTabContent(selectedYear, undefined);
        const tabs = document.querySelectorAll(".tabs .eg-tab");
        tabs.forEach((tab) => {
            tab.addEventListener("click", (e) => {
                e.preventDefault();
                loadTabContent(selectedYear, tab);
            });
        });  
    }
    function handleError(error) {
        console.error('Error fetching data:', error);
    }
});

