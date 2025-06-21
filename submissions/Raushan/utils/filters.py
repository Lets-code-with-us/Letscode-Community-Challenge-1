import streamlit as st
import pandas as pd


# Sidebar filters for user inputs to filter the dataset
def sidebar_filters(df: pd.DataFrame):
    st.sidebar.header("🔍 Filter Options")  # Sidebar section header

    # Multi-select box for selecting cities from unique cities in the data
    cities = st.sidebar.multiselect(
        "Select Cities", options=sorted(df["City"].unique())
    )

    # Multi-select box for selecting one or more metrics (exclude 'City' and 'Year')
    metrics = st.sidebar.multiselect(
        "Select Metrics",
        options=[col for col in df.columns if col not in ["City", "Year"]],
    )

    # Slider to select a range of years within the dataset's min and max year
    year_range = st.sidebar.slider(
        "Select Year Range",
        int(df["Year"].min()),
        int(df["Year"].max()),
        (int(df["Year"].min()), int(df["Year"].max())),
    )

    # Apply the filtering based on user selections and return filtered data and selections
    df_filtered = filter_data(df, cities, metrics, year_range[0], year_range[1])
    return df_filtered, metrics, cities, year_range


# Function to filter data based on selected cities, metrics, and year range
def filter_data(df: pd.DataFrame, cities, metrics, year_start, year_end):
    df_filtered = df.copy()

    # Filter rows to keep only selected cities if any selected
    if cities:
        df_filtered = df_filtered[df_filtered["City"].isin(cities)]

    # Filter rows for years within selected range
    df_filtered = df_filtered[
        (df_filtered["Year"] >= year_start) & (df_filtered["Year"] <= year_end)
    ]

    # If metrics selected, keep only 'City', 'Year', and those metrics columns
    if metrics:
        df_filtered = df_filtered[["City", "Year"] + metrics]

    return df_filtered
