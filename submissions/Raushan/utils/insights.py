import streamlit as st
import pandas as pd
from .constants import POLICY_SUGGESTIONS


# Show top N cities for a selected metric in a given year
def show_top_cities_by_metric(df: pd.DataFrame, metric: str, year: int, top_n=10):
    st.markdown(f"### 🏆 Top {top_n} Cities by {metric} in {year}")
    top_cities = (
        df[df["Year"] == year]
        .sort_values(by=metric, ascending=False)
        .loc[:, ["City", metric]]
        .head(top_n)
        .reset_index(drop=True)
    )
    st.dataframe(top_cities, use_container_width=True)


# Show bottom percentile cities and their policy suggestions based on a metric
def show_bottom_cities_with_policy(
    df: pd.DataFrame, metric: str, year: int, bottom_pct=10
):
    st.markdown(
        f"### 📉 Policy Suggestions for Bottom {bottom_pct}% Cities by {metric} in {year}"
    )
    n_cities = len(df["City"].unique())
    n_bottom = max(
        1, int(n_cities * bottom_pct / 100)
    )  # Calculate how many cities fall in bottom_pct
    bottom_cities = (
        df[df["Year"] == year]
        .sort_values(by=metric)
        .loc[:, ["City", metric]]
        .head(n_bottom)
        .reset_index(drop=True)
    )
    st.dataframe(bottom_cities, use_container_width=True)

    st.markdown("#### Suggested Policies:")
    # For each bottom city, show relevant policy suggestion from constants
    for city in bottom_cities["City"]:
        suggestion = POLICY_SUGGESTIONS.get(
            metric, "General development assistance recommended."
        )
        st.markdown(f"- **{city}**: {suggestion}")


# Highlight cities with best healthcare systems, based on combined healthcare indicators
def show_healthcare_leaders(df: pd.DataFrame, year: int, top_n=10):
    st.markdown(f"### 🏥 Cities with Best Healthcare Systems in {year}")
    df_year = df[df["Year"] == year].copy()

    # Calculate a health score using multiple healthcare metrics (weights are arbitrary)
    df_year["Health Score"] = (
        df_year.get("Healthcare Expenditure per Capita", 0)
        + df_year.get("Physicians per 1000", 0) * 1000
        + df_year.get("Hospital Beds per 1000", 0) * 100
    )

    top_health = (
        df_year.sort_values(by="Health Score", ascending=False)
        .loc[:, ["City", "Health Score"]]
        .head(top_n)
        .reset_index(drop=True)
    )
    st.dataframe(top_health, use_container_width=True)


# Show environmental leaders and laggards based on combined environmental metrics
def show_environmental_leaders_and_laggards(df: pd.DataFrame, year: int, top_n=5):
    st.markdown(f"### 🌱 Environmental Leaders and Laggards in {year}")
    df_year = df[df["Year"] == year].copy()

    # Green Score is a composite metric rewarding positive and penalizing negative environmental factors
    df_year["Green Score"] = (
        df_year.get("Renewable Energy %", 0)
        + df_year.get("Forest Area %", 0)
        - df_year.get("CO2 Emissions per Capita", 0)
        - df_year.get("Air Quality Index", 0)
    )

    best = (
        df_year.sort_values(by="Green Score", ascending=False)
        .loc[:, ["City", "Green Score"]]
        .head(top_n)
        .reset_index(drop=True)
    )
    worst = (
        df_year.sort_values(by="Green Score", ascending=True)
        .loc[:, ["City", "Green Score"]]
        .head(top_n)
        .reset_index(drop=True)
    )

    col1, col2 = st.columns(2)
    with col1:
        st.markdown("**Top Environmental Performers**")
        st.dataframe(best, use_container_width=True)
    with col2:
        st.markdown("**Worst Environmental Performers**")
        st.dataframe(worst, use_container_width=True)


# Display a custom insight summary based on selected filters (cities, metrics, year range)
def show_custom_insight(
    filtered_df: pd.DataFrame, cities: list, metrics: list, year_range: tuple
):
    st.markdown("### 🔎 Custom Insight Summary")

    # Check for empty selections and inform user accordingly
    if not cities:
        st.info(
            "⚠️ No city selected. Please select one or more cities from the sidebar to see insights."
        )
        return
    if not metrics:
        st.info(
            "⚠️ No metric selected. Please select one or more metrics from the sidebar to see insights."
        )
        return
    if filtered_df.empty:
        st.info(
            "No data available for the selected filters. Please adjust your selections."
        )
        return

    # Summary of filtered data selection
    st.write(
        f"You have selected data for {len(filtered_df['City'].unique())} cities between {year_range[0]} and {year_range[1]}."
    )
    avg_metrics = filtered_df[metrics].mean().round(2)
    st.write("Average values for selected metrics:")
    st.dataframe(
        avg_metrics.reset_index().rename(
            columns={"index": "Metric", 0: "Average Value"}
        ),
        use_container_width=True,
    )


# Main function to show key insights, with optional filters passed
def show_key_insights(df, year=None, cities=None, metrics=None, year_range=None):
    # Select year for insights; defaults to latest year
    year = st.selectbox(
        "Select Year for Insights",
        options=sorted(df["Year"].unique()),
        index=len(df["Year"].unique()) - 1,  # default latest year selected
    )

    # Show various key insights for the selected year
    show_top_cities_by_metric(df, "HDI", year)
    show_bottom_cities_with_policy(df, "Gini Coefficient", year)
    show_healthcare_leaders(df, year)
    show_environmental_leaders_and_laggards(df, year)

    # If filters for cities, metrics, and year_range are passed, show custom insight summary
    if cities is not None and metrics is not None and year_range is not None:
        filtered_df = df[
            (df["City"].isin(cities))
            & (df["Year"] >= year_range[0])
            & (df["Year"] <= year_range[1])
        ]
        show_custom_insight(filtered_df, cities, metrics, year_range)
