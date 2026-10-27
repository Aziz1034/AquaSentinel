# AquaSentinel — Water Potability Prediction

AquaSentinel is a machine learning project that analyzes water quality parameters to predict whether a water sample is potentially potable (suitable for drinking) or non-potable.

## Project Overview

Water quality assessment is important for identifying potential risks associated with drinking water. AquaSentinel uses machine learning classification algorithms to analyze water quality measurements and predict potability.

## Dataset

The project uses the Water Potability dataset from Kaggle.

**Dataset source:** [Water Potability Dataset](https://www.kaggle.com/datasets/adityakadiwal/water-potability)

The dataset contains 3,276 water samples with nine water quality features and a target variable, `Potability`.

### Features

- pH
- Hardness
- Solids
- Chloramines
- Sulfate
- Conductivity
- Organic Carbon
- Trihalomethanes
- Turbidity

**Target:** `Potability`

- `0` — Non-potable
- `1` — Potable

## Machine Learning Approach

The project compares two classification algorithms:

1. **Logistic Regression** — Used as a baseline classification model.
2. **Random Forest Classifier** — Evaluated as an alternative model.

Missing values in the predictor columns are handled using median imputation fitted on the training data. Model evaluation uses classification metrics and ROC-AUC to compare performance.

## Project Results

The notebook reports the following test-set results for the selected Random Forest model:

| Metric | Score |
|---|---:|
| Accuracy | 67.21% |
| Precision | 65.05% |
| Recall | 34.72% |
| F1-score | 45.27% |
| ROC-AUC | 0.6910 |

These are the results recorded in the notebook and should be verified by running it. The relatively low recall indicates that the model misses a substantial proportion of potable samples, so its predictions should not be treated as proof that water is safe to drink.

## Repository Structure

```text
AquaSentinel/
├── AquaSentinel_Review2_047.ipynb
├── AquaSentinel_Review1_Presentation_Clean.pptx
├── water_potability.csv
├── README.md
└── requirements.txt
```

## How to Run

1. Clone or download this repository.
2. Install Python and Jupyter Notebook.
3. Install the required Python libraries using `requirements.txt`.
4. Open `AquaSentinel_Review2_047.ipynb` in Jupyter Notebook or Google Colab.
5. Ensure `water_potability.csv` is available at the path expected by the notebook.
6. Run the notebook cells in order.

## Disclaimer

AquaSentinel is an educational machine learning project. Its predictions are not a substitute for laboratory water-quality testing or official drinking-water safety assessments.
