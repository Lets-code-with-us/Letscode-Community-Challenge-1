# India Growth Metrics Dashboard

_Submitted by: Raushan Bhanu_

## 🌟 Live Demo

🔗 **[View Live Demo](https://your-demo-link-here.com)**

## 📸 Screenshots

- **Dashboard Overview**

![Dashboard Overview](./demo-images/dashboard-overview.png)

- **Cities Comparison**

![Cities Comparison](./demo-images/cities-comparison.png)

- **Mobile View**

![Mobile View](./demo-images/mobile-view.png)

## 🛠️ Tech Stack

- Frontend: Streamlit (Python)
- Database: CSV (Pandas DataFrames)
- Visualization: Plotly, Seaborn, Matplotlib, Pydeck
- Deployment: Streamlit Cloud

## ✨ Unique Features

- **AI-Powered Analytics**: Includes trend prediction, anomaly detection, and correlation analysis across urban metrics.
- **Interactive City Mapping**: Visualizes key metrics geospatially using scalable markers on a Pydeck-powered map.
- **Dynamic Data Exploration**: Enables users to explore city growth metrics through customizable visualizations, ranking, and time series charts.

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- [`uv` package manager](https://github.com/astral-sh/uv)

### Installation

```bash
# Step 1: Clone the repository
git clone https://github.com/RaushanBhanu/Letscode-Community-Challenge-1.git
cd Letscode-Community-Challenge-1/submissions/Raushan

# Step 2: Create a virtual environment
uv venv

# Step 3: Activate the virtual environment
source .venv/bin/activate.fish       # On Linux/macOS
.venv\Scripts\activate.bat           # On Windows

# Step 4: Install all dependencies
uv sync

#Step 5 : Generate mock data
uv run generate_mock_data.py

#Step 6: Run main.py
streamlit run main.py
```