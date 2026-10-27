# AquaSentinel — Explainable Water Potability Prediction
> Academic Data Science Case Study implemented in R using Google Colab

AquaSentinel is a presentation-ready analytics dashboard built with **React**, **TypeScript**, **Vite**, **Recharts**, and **Lucide React**. It presents the empirical findings and local explainability analysis of a water potability classification project.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Local Run
```bash
# In the project root (d:\IDS)
npm install

# Start the local development server (port 3000)
npm run dev

# Or build for production
npm run build
```

---

## 🧭 Dashboard Modules & Verified Data

| Navigation Section | Content & Verified Metrics |
| :--- | :--- |
| **1. Overview** | Executive summary, core research questions, headline KPI strip (3,276 records, 9 predictors, 67.21% test accuracy, 0.6910 ROC-AUC, 126 False Negatives alert), and regulatory advisory. |
| **2. Dataset Explorer** | Kaggle Water Potability Dataset breakdown. Stratified 70/15/15 partitions: Train (2,292), Validation (490), Test (494) with 0 missing values post median imputation. 10-feature Data Dictionary with WHO guidelines. |
| **3. Exploratory Data Analysis** | Potability balance (1,998 [61%] vs 1,278 [39%]), missing values bar chart (Sulfate: 781, ph: 491, Trihalomethanes: 162), pH distribution visual (WHO safe band 6.5–8.5), and linear correlation limitation notice. |
| **4. Model Comparison** | Validation set benchmark comparing Logistic Regression vs Random Forest. Explains why Random Forest was selected strictly via Validation ROC-AUC (0.6272 vs 0.4366) and highlights LR majority-class collapse (0.52% recall). |
| **5. Evaluation** | Unseen held-out test evaluation (N = 494). Accuracy: 67.21%, Precision: 65.05%, Recall: 34.72%, F1: 45.27%, ROC-AUC: 0.6910. Interactive Confusion Matrix (TN: 265, FP: 36, FN: 126, TP: 67) and horizontal Feature Importance bar chart (Hardness 140.48, Sulfate 139.18, ph 138.53, etc.). |
| **6. LIME Explainability** | Case 968 local explanation audit. Predicted: Class 0 (P₀ = 81.67%, P₁ = 18.33%). Local explanation surrogate fit `model_r2` = 0.134. Clarifies that exact feature weights are unavailable in this snapshot and cautions against uncritical reliance on low-R² surrogates. |
| **7. Methodology** | 10-stage end-to-end scientific pipeline flowchart from data ingestion to model interpretation, Google Colab R runtime context, and formal academic limitation notice. |

---

## 🛡️ Academic & Regulatory Notice
AquaSentinel is an educational demonstration developed for an academic *Introduction to Data Science* course. Potability 0 and 1 are nominal dataset labels and **do not constitute laboratory certification of drinking water safety**.
