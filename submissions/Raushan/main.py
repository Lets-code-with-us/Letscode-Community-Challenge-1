import streamlit as st
from utils.data_loader import load_data
from utils.filters import sidebar_filters
from utils.analytics import show_analytics
from utils.visualizations import show_visualizations
from utils.policy_insights import show_policy_insights
from utils.insights import show_key_insights


def main():
    # Configure page title and layout
    st.set_page_config(page_title="India Growth Metrics Dashboard", layout="wide")

    # Display main title
    st.title("📊 India Growth Metrics Dashboard")
    st.markdown("---")  # Horizontal separator

    # Load dataset 
    df = load_data("india_city_growth_metrics_mock_data.csv")

    # Apply sidebar filters and retrieve filtered dataframe and other filter info
    filtered_df, metrics, cities, year_range = sidebar_filters(df)

    # Show warning and stop execution if no data matches filters
    if filtered_df.empty:
        st.warning(
            "No data available for the selected filters. Please adjust your selections."
        )
        return  # Stop further rendering

    # Show filtered data table with auto width adjustment
    st.subheader("📈 Filtered Data")
    st.dataframe(filtered_df, use_container_width=True)

    st.markdown("---")

    # Show analytics section based on full dataset (consider passing filtered_df if needed)
    show_analytics(df)

    st.markdown("---")

    # Show policy insights section
    show_policy_insights(df)

    st.markdown("---")

    # Show visualizations section
    show_visualizations(df)

    st.markdown("---")

    # Show key insights section
    show_key_insights(df)


if __name__ == "__main__":
    main()
