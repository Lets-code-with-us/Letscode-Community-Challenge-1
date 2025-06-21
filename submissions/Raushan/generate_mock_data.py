import pandas as pd
import random

# Define cities and years
cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
]
years = list(range(2019, 2029))  # 5 years

# Define metrics and value ranges
metrics = {
    "GDP": (50, 300),
    "GNI": (45, 290),
    "GDP per Capita": (5000, 25000),
    "Unemployment Rate": (3, 15),
    "Inflation Rate": (2, 10),
    "FDI": (0.5, 15),
    "Export/Import Ratio": (0.5, 2.0),
    "Public Debt % of GDP": (30, 90),
    "HDI": (0.5, 0.9),
    "Life Expectancy": (65, 82),
    "Infant Mortality Rate": (2, 30),
    "Literacy Rate": (70, 99),
    "Education Index": (0.4, 0.95),
    "Gender Inequality Index": (0.2, 0.7),
    "Population Growth Rate": (0.5, 3.0),
    "Urban Population %": (50, 100),
    "Healthcare Expenditure per Capita": (200, 2000),
    "Physicians per 1000": (0.5, 4),
    "Hospital Beds per 1000": (1, 6),
    "Access to Clean Water %": (60, 100),
    "Vaccination Coverage %": (60, 100),
    "CO2 Emissions per Capita": (1, 8),
    "Renewable Energy %": (10, 60),
    "Forest Area %": (5, 40),
    "Air Quality Index": (50, 300),
    "Environmental Performance Index": (20, 80),
    "Corruption Perceptions Index": (20, 80),
    "Internet Penetration %": (40, 95),
    "Mobile Subscriptions per 100": (60, 130),
    "Infrastructure Quality Index": (2, 8),
    "Political Stability Index": (-2.5, 2.5),
    "Gini Coefficient": (25, 50),
    "Poverty Rate": (5, 40),
    "Social Protection Coverage %": (30, 100),
}

# Generate mock data
data = []
for city in cities:
    for year in years:
        entry = {"City": city, "Year": year}
        for metric, (low, high) in metrics.items():
            entry[metric] = round(random.uniform(low, high), 2)
        data.append(entry)

# Create DataFrame
df_mock_data = pd.DataFrame(data)

# Save to CSV
csv_path = "india_city_growth_metrics_mock_data.csv"
df_mock_data.to_csv(csv_path, index=False)
