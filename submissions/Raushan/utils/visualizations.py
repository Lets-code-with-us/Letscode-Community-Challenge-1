import streamlit as st
import plotly.express as px
import seaborn as sns
import matplotlib.pyplot as plt
import pydeck as pdk
import pandas as pd
import numpy as np
from .constants import CITY_COORDS  # Predefined city coordinates for map visualization


def plot_bar_chart(df_vis, metrics, year):
    """Plot bar charts for given metrics and year."""
    for metric in metrics:
        fig = px.bar(
            df_vis, x="City", y=metric, title=f"Bar Chart of {metric} in {year}"
        )
        st.plotly_chart(fig, use_container_width=True)


def plot_line_chart(df_line, metrics):
    """Plot line charts for given metrics across years, grouped by city."""
    for metric in metrics:
        fig = px.line(
            df_line,
            x="Year",
            y=metric,
            color="City",
            title=f"Line Graph of {metric} over Years",
            markers=True,
        )
        st.plotly_chart(fig, use_container_width=True)


def plot_scatter_plot(df_vis, metrics, year):
    """
    Plot scatter plot between two selected metrics for a given year.
    Requires exactly two metrics to compare.
    """
    if len(metrics) < 2:
        st.warning("Please select at least two metrics for scatter plot.")
    elif len(metrics) > 2:
        st.error("You can only select up to 2 values.")
    else:
        x_metric, y_metric = metrics
        fig = px.scatter(
            df_vis,
            x=x_metric,
            y=y_metric,
            color="City",
            hover_name="City",
            title=f"Scatter: {y_metric} vs {x_metric} in {year}",
        )
        st.plotly_chart(fig, use_container_width=True)


def plot_pie_chart(df):
    """
    Display a pie chart for a selected metric and year, showing proportion by city.
    Allows dynamic selection of metric and year.
    """
    st.subheader("🥧 Pie Chart")
    pie_metric = st.selectbox(
        "Select Metric for Pie Chart",
        [col for col in df.columns if col not in ["City", "Year"]],
        key="pie",
    )
    pie_year = st.selectbox(
        "Select Year for Pie Chart",
        [year for year in range(int(df["Year"].min()), int(df["Year"].max()) + 1)],
    )
    df_pie = df[df["Year"] == pie_year]
    fig_pie = px.pie(
        df_pie,
        values=pie_metric,
        names="City",
        title=f"Pie Chart of {pie_metric} by City in {pie_year}",
    )
    st.plotly_chart(fig_pie, use_container_width=True)


def plot_heatmap(df):
    """
    Plot a correlation heatmap for numeric metrics (excluding City and Year).
    Helps identify relationships between metrics.
    """
    st.subheader("🌡️ Correlation Heatmap")
    df_corr = df[[col for col in df.columns if col not in ["City", "Year"]]].corr()
    fig, ax = plt.subplots(figsize=(12, 8))
    sns.heatmap(df_corr, annot=False, cmap="coolwarm", ax=ax)
    st.pyplot(fig)


def plot_interactive_map(df):
    """
    Display an interactive map of cities with circle sizes proportional
    to the selected metric’s value for a chosen year.
    """
    st.subheader("🗺️ Interactive City Map")
    map_metric = st.selectbox(
        "Select Metric to Visualize on Map",
        [col for col in df.columns if col not in ["City", "Year"]],
        key="map_metric",
    )
    map_year = st.selectbox("Select Year for Map", sorted(df["Year"].unique()))

    # Filter data for the selected year and metric
    df_map_metric = df[df["Year"] == map_year][["City", map_metric]]

    # Prepare dataframe for map with city coordinates
    map_data = pd.DataFrame(
        [
            {"City": city, "lat": lat, "lon": lon}
            for city, (lat, lon) in CITY_COORDS.items()
        ]
    )

    # Merge metric data with coordinates
    map_data = pd.merge(map_data, df_map_metric, on="City", how="left")

    # Normalize radius for circle sizes on map
    min_val = map_data[map_metric].min()
    max_val = map_data[map_metric].max()
    map_data["radius"] = 20000 + 80000 * (map_data[map_metric] - min_val) / (
        max_val - min_val
    )

    # Define map layer for city scatter points
    layer = pdk.Layer(
        "ScatterplotLayer",
        data=map_data,
        get_position="[lon, lat]",
        get_color="[100, 150, 255, 160]",
        get_radius="radius",
        pickable=True,
        auto_highlight=True,
    )

    # Set initial view state for the map centered on cities
    view_state = pdk.ViewState(
        latitude=map_data["lat"].mean(),
        longitude=map_data["lon"].mean(),
        zoom=4.5,
        pitch=0,
    )

    # Tooltip on hover showing city and metric value
    tooltip = {
        "html": f"<b>City:</b> {{City}}<br/>{map_metric}: {{{map_metric}}}",
        "style": {"backgroundColor": "black", "color": "white"},
    }

    # Render the interactive map chart in Streamlit
    st.pydeck_chart(
        pdk.Deck(
            map_style=None,
            initial_view_state=view_state,
            layers=[layer],
            tooltip=tooltip,
        )
    )


def show_visualizations(df: pd.DataFrame):
    """
    Main visualization controller function to show different types of charts
    based on user input selections from Streamlit widgets.
    """
    st.subheader("📊 Visualization")

    # User selects graph type
    graph_type = st.selectbox(
        "Select Graph Type", options=["Bar Chart", "Line Graph", "Scatter Plot"]
    )

    # For scatter plot, allow multiple metric selection; for others single metric
    if graph_type == "Scatter Plot":
        vis_metrics = st.multiselect(
            "Select Metric(s)",
            [col for col in df.columns if col not in ["City", "Year"]],
            default=[df.columns[2]],
        )
    else:
        vis_metrics = [
            st.selectbox(
                "Select a Metric",
                [col for col in df.columns if col not in ["City", "Year"]],
            )
        ]

    # Select cities and year for visualization filtering
    vis_cities = st.multiselect(
        "Select City/Cities",
        sorted(df["City"].unique()),
        default=[df["City"].unique()[0]],
    )
    vis_year = st.selectbox("Select Year", sorted(df["Year"].unique()))

    # Filter dataframe accordingly
    df_vis = df[(df["Year"] == vis_year) & (df["City"].isin(vis_cities))]

    # Call the corresponding plotting function based on user selection
    if graph_type == "Bar Chart":
        plot_bar_chart(df_vis, vis_metrics, vis_year)
    elif graph_type == "Line Graph":
        df_line = df[df["City"].isin(vis_cities)]
        plot_line_chart(df_line, vis_metrics)
    elif graph_type == "Scatter Plot":
        plot_scatter_plot(df_vis, vis_metrics, vis_year)

    # Optional pie chart toggle in sidebar
    if st.sidebar.checkbox("Show Pie Chart"):
        st.markdown("---")
        plot_pie_chart(df)

    # Always show heatmap and interactive map below
    st.markdown("---")
    plot_heatmap(df)

    st.markdown("---")
    plot_interactive_map(df)
