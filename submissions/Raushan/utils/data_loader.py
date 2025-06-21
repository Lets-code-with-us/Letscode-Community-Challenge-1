# utils/data_loader.py
import pandas as pd
import streamlit as st

@st.cache_data
def load_data(path: str) -> pd.DataFrame:
    return pd.read_csv(path)
