import streamlit as st
import pandas as pd
from .constants import POLICY_SUGGESTIONS


def show_policy_insights(df: pd.DataFrame):
    st.header("📀 Policy Insights")

    # Select a metric to identify underperforming cities
    st.subheader("Policy Suggestions for Underperforming Cities")
    under_metric = st.selectbox(
        "Select Metric for Underperformance",
        [col for col in df.columns if col not in ["City", "Year"]],
        key="under_metric",
    )

    # Slider to choose bottom percentage threshold for defining underperformance
    threshold = st.slider("Bottom % Threshold", 1, 30, 10)

    # Calculate number of bottom cities based on selected threshold
    n_bottom = int(len(df["City"].unique()) * threshold / 100)
    latest_year = df["Year"].max()

    # Filter data for latest year and get bottom cities by selected metric
    bottom_cities = (
        df[df["Year"] == latest_year].sort_values(by=under_metric).head(n_bottom)
    )

    # Display the bottom cities with their metric values
    st.dataframe(bottom_cities[["City", under_metric]], use_container_width=True)
    st.markdown("#### Suggested Policies")

    # Show policy suggestions mapped to the selected metric or a default message
    for city in bottom_cities["City"]:
        suggestion = POLICY_SUGGESTIONS.get(
            under_metric, "General development assistance recommended"
        )
        st.markdown(f"- **{city}**: {suggestion}")
