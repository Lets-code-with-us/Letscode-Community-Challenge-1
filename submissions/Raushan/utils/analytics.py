# utils/analytics.py

import streamlit as st
import plotly.express as px
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from scipy.stats import zscore


# Main function to display all AI-powered analytics sections
def show_analytics(df: pd.DataFrame):
    st.header("🤖 AI-Powered Analytics")
    show_trend_prediction(df)  # Display trend prediction section
    st.markdown("---")  # Separator line
    show_anomaly_detection(df)  # Display anomaly detection section
    st.markdown("---")  # Separator line
    show_correlation_analysis(df)  # Display correlation analysis section


# Function to perform and display trend prediction for a selected city and metric
def show_trend_prediction(df):
    st.subheader("🔮 Trend Prediction")

    # User selects city for trend prediction
    trend_city = st.selectbox("Select City for Trend Prediction", df["City"].unique())

    # User selects metric for trend prediction (excluding 'City' and 'Year' columns)
    trend_metric = st.selectbox(
        "Select Metric",
        [col for col in df.columns if col not in ["City", "Year"]],
        key="trend",
    )

    # Filter data for the selected city and metric, dropping missing values
    df_trend = df[df["City"] == trend_city][["Year", trend_metric]].dropna()

    # Only proceed if at least 2 data points available to build a regression model
    if len(df_trend) >= 2:
        X = df_trend["Year"].values.reshape(
            -1, 1
        )  # Predictor: Years reshaped for sklearn
        y = df_trend[trend_metric].values  # Target: metric values

        # Fit a linear regression model to historical data
        model = LinearRegression().fit(X, y)

        # Prepare future years for prediction (next 5 years after max year in dataset)
        future_years = np.arange(df["Year"].max() + 1, df["Year"].max() + 6).reshape(
            -1, 1
        )

        # Predict metric values for future years using the fitted model
        predictions = model.predict(future_years)

        # Create DataFrame for future predictions
        df_future = pd.DataFrame(
            {"Year": future_years.flatten(), trend_metric: predictions}
        )

        # Combine historical and future data for plotting
        df_combined = pd.concat([df_trend, df_future])

        # Plot line chart with actual and predicted data
        fig = px.line(
            df_combined,
            x="Year",
            y=trend_metric,
            title=f"Trend Prediction for {trend_metric} in {trend_city}",
        )
        st.plotly_chart(fig, use_container_width=True)
    else:
        # Show warning if not enough data points to build a prediction model
        st.warning("Not enough data for prediction.")


# Function to detect and display anomalies in selected metric using Z-score method
def show_anomaly_detection(df):
    st.subheader("🚨 Anomaly Detection")

    # User selects metric to analyze for anomalies (excluding 'City' and 'Year')
    anomaly_metric = st.selectbox(
        "Select Metric for Anomaly Detection",
        [col for col in df.columns if col not in ["City", "Year"]],
        key="anomaly",
    )

    # Make a copy of the DataFrame to add z-score column
    anomaly_df = df.copy()

    # Calculate Z-score for the selected metric grouped by city
    anomaly_df["z_score"] = anomaly_df.groupby("City")[anomaly_metric].transform(zscore)

    # Identify anomalies where absolute z-score > 2 (statistically significant)
    anomalies = anomaly_df[anomaly_df["z_score"].abs() > 2]

    if not anomalies.empty:
        # Display table of detected anomalies with relevant columns
        st.dataframe(
            anomalies[["City", "Year", anomaly_metric, "z_score"]],
            use_container_width=True,
        )
    else:
        # Inform user if no significant anomalies were found
        st.info("No significant anomalies found.")


# Function to display correlation analysis for selected numeric metric against others
def show_correlation_analysis(df):
    st.subheader("📊 Correlation Analysis")

    # Get list of numeric columns, excluding 'Year'
    numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    if "Year" in numeric_cols:
        numeric_cols.remove("Year")

    # User selects metric to correlate against other numeric metrics
    selected_corr_metric = st.selectbox(
        "Select Metric to Correlate",
        numeric_cols,
        key="corr_analysis",
    )

    # Select numeric columns only for correlation matrix calculation
    corr_df = df.select_dtypes(include=[np.number])

    # Calculate correlation values of all numeric metrics with the selected metric
    corr_values = corr_df.corr()[selected_corr_metric].sort_values(ascending=False)

    # Display the correlation results as a dataframe with proper column names
    st.dataframe(
        corr_values.reset_index().rename(
            columns={"index": "Metric", selected_corr_metric: "Correlation"}
        )
    )
