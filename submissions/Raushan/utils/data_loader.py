import pandas as pd
import streamlit as st


# Loading file
@st.cache_data
def load_data(path):
    return pd.read_csv(path)


with st.spinner("Loading data..."):
    df = load_data("india_city_growth_metrics_mock_data.csv")
