import os
import pandas as pd
import streamlit as st

@st.cache_data
def load_data(filename: str):
    base_path = os.path.dirname(__file__)
    full_path = os.path.join(base_path, "..", filename)
    return pd.read_csv(full_path)
