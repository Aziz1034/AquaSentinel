// AquaSentinel — Verified Dataset & Model Snapshot
// Sourced directly from academic Introduction to Data Science case study in R (Google Colab)

export interface MetricSet {
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  rocAuc: number;
}

export interface FeatureImportanceItem {
  feature: string;
  importance: number;
  unit: string;
  description: string;
  whoStandard: string;
}

export interface DataFeature {
  name: string;
  type: string;
  unit: string;
  missingCount: number;
  missingPercent: number;
  whoRange: string;
  description: string;
  imputedMedian: string;
}

export interface SplitInfo {
  name: string;
  rows: number;
  percentage: number;
  potableCount: number;
  nonPotableCount: number;
  missingBefore: number;
  missingAfter: number;
}

export const DATASET_METRICS = {
  name: "Water Potability Dataset",
  source: "Kaggle Water Potability Benchmark",
  environment: "R (Google Colab Environment)",
  totalRecords: 3276,
  totalColumns: 10,
  predictorCount: 9,
  targetColumn: "Potability",
  duplicateRows: 0,
  potabilityCounts: {
    nonPotable: { count: 1998, percentage: 61.0 },
    potable: { count: 1278, percentage: 39.0 }
  },
  missingSummary: {
    totalMissingValues: 1434,
    featuresWithMissing: [
      { feature: "Sulfate", missing: 781, percent: 23.84 },
      { feature: "ph", missing: 491, percent: 14.99 },
      { feature: "Trihalomethanes", missing: 162, percent: 4.95 }
    ]
  }
};

export const SPLIT_DETAILS: SplitInfo[] = [
  {
    name: "Training Set",
    rows: 2292,
    percentage: 70.0,
    potableCount: 894,
    nonPotableCount: 1398,
    missingBefore: 1004,
    missingAfter: 0
  },
  {
    name: "Validation Set",
    rows: 490,
    percentage: 15.0,
    potableCount: 191,
    nonPotableCount: 299,
    missingBefore: 215,
    missingAfter: 0
  },
  {
    name: "Held-Out Test Set",
    rows: 494,
    percentage: 15.0,
    potableCount: 193,
    nonPotableCount: 301,
    missingBefore: 215,
    missingAfter: 0
  }
];

export const VALIDATION_RESULTS: {
  logisticRegression: MetricSet;
  randomForest: MetricSet;
} = {
  logisticRegression: {
    accuracy: 0.6122449,
    precision: 1.0000,
    recall: 0.0052356,
    f1: 0.0104167,
    rocAuc: 0.4365512
  },
  randomForest: {
    accuracy: 0.6224490,
    precision: 0.5319149,
    recall: 0.2617801,
    f1: 0.3508772,
    rocAuc: 0.6272129
  }
};

export const HELD_OUT_TEST_RESULTS = {
  model: "Random Forest",
  selectionCriteria: "Validation ROC-AUC (0.6272 vs 0.4366 for Logistic Regression)",
  accuracy: 0.6721,
  precision: 0.6505,
  recall: 0.3472,
  f1: 0.4527,
  rocAuc: 0.6910,
  confusionMatrix: {
    trueNegatives: 265,
    falsePositives: 36,
    falseNegatives: 126,
    truePositives: 67,
    total: 494
  },
  analysis: {
    correctPredictions: 332,
    incorrectPredictions: 162,
    negativePredictiveValue: 0.6777,
    specificity: 0.8804,
    sensitivity: 0.3472
  }
};

export const FEATURE_IMPORTANCE: FeatureImportanceItem[] = [
  {
    feature: "Hardness",
    importance: 140.4810,
    unit: "mg/L",
    description: "Concentration of calcium and magnesium salts dissolved in water.",
    whoStandard: "< 200 mg/L (desirable), < 500 mg/L (tolerable)"
  },
  {
    feature: "Sulfate",
    importance: 139.1784,
    unit: "mg/L",
    description: "Naturally occurring mineral salts from minerals and soil erosion.",
    whoStandard: "< 250 mg/L (WHO guideline)"
  },
  {
    feature: "ph",
    importance: 138.5288,
    unit: "pH Scale (0-14)",
    description: "Acid-base balance indicator of water neutrality.",
    whoStandard: "6.5 – 8.5 (safe drinking range)"
  },
  {
    feature: "Solids",
    importance: 124.0075,
    unit: "ppm (TDS)",
    description: "Total dissolved solids (organic and inorganic minerals/salts).",
    whoStandard: "< 500 ppm (good), < 1000 ppm (acceptable)"
  },
  {
    feature: "Chloramines",
    importance: 120.8472,
    unit: "ppm",
    description: "Disinfectant compound formed by mixing chlorine and ammonia.",
    whoStandard: "< 4.0 ppm (EPA maximum residual)"
  },
  {
    feature: "Trihalomethanes",
    importance: 108.1516,
    unit: "µg/L",
    description: "Chemical byproducts of water chlorination reacting with organics.",
    whoStandard: "< 80 µg/L (EPA standard), < 100 µg/L (WHO)"
  },
  {
    feature: "Conductivity",
    importance: 107.2200,
    unit: "µS/cm",
    description: "Electrical conductivity representing ionic solute concentration.",
    whoStandard: "< 400 µS/cm (potable), < 1500 µS/cm (max)"
  },
  {
    feature: "Organic_carbon",
    importance: 106.8609,
    unit: "ppm",
    description: "Total Organic Carbon (TOC) indicating decaying natural organic matter.",
    whoStandard: "< 2.0 ppm (treated water), < 4.0 ppm (source)"
  },
  {
    feature: "Turbidity",
    importance: 104.6249,
    unit: "NTU",
    description: "Cloudiness/haziness caused by suspended microscopic particulates.",
    whoStandard: "< 1.0 NTU (ideal drinking), < 5.0 NTU (acceptable)"
  }
];

export const LIME_CASE_STUDY = {
  caseId: 968,
  targetTrueLabel: 0,
  targetLabelName: "Non-Potable (dataset label)",
  predictedClass: 0,
  predictedClassName: "Non-Potable (dataset label)",
  probabilityClass0: 0.8167,
  probabilityClass1: 0.1833,
  modelR2: 0.134,
  exactWeightsAvailable: false,
  statusExplanation: "Exact numeric LIME weight coefficients were not serialized to the workspace repository snapshot. Consistent with scientific integrity guidelines, dummy/invented weights are omitted.",
  interpretationCaution: "The local surrogate model fit (R² = 0.134) is very low. This indicates that a simple linear ridge surrogate captures only 13.4% of the local decision boundary curvature generated by the Random Forest ensemble around case 968. Conclusions derived from this local surrogate must be interpreted with extreme caution and verified against domain knowledge."
};

export const DATA_DICTIONARY: DataFeature[] = [
  {
    name: "ph",
    type: "Numeric (float)",
    unit: "pH (0-14)",
    missingCount: 491,
    missingPercent: 14.99,
    whoRange: "6.5 – 8.5",
    description: "Indicator of acidity or basicity of water. Crucial parameter for chemical stability.",
    imputedMedian: "7.0368"
  },
  {
    name: "Hardness",
    type: "Numeric (float)",
    unit: "mg/L",
    missingCount: 0,
    missingPercent: 0.0,
    whoRange: "< 200 mg/L",
    description: "Capacity of water to precipitate soap, driven by calcium and magnesium ions.",
    imputedMedian: "None (Complete)"
  },
  {
    name: "Solids",
    type: "Numeric (float)",
    unit: "ppm",
    missingCount: 0,
    missingPercent: 0.0,
    whoRange: "< 1,000 ppm",
    description: "Total dissolved solids (TDS) representing mineral content and dissolved salts.",
    imputedMedian: "None (Complete)"
  },
  {
    name: "Chloramines",
    type: "Numeric (float)",
    unit: "ppm",
    missingCount: 0,
    missingPercent: 0.0,
    whoRange: "< 4.0 ppm",
    description: "Major disinfectant agent created by treating chlorine with ammonia.",
    imputedMedian: "None (Complete)"
  },
  {
    name: "Sulfate",
    type: "Numeric (float)",
    unit: "mg/L",
    missingCount: 781,
    missingPercent: 23.84,
    whoRange: "< 250 mg/L",
    description: "Naturally occurring mineral compound found in natural waterways and soils.",
    imputedMedian: "333.07"
  },
  {
    name: "Conductivity",
    type: "Numeric (float)",
    unit: "µS/cm",
    missingCount: 0,
    missingPercent: 0.0,
    whoRange: "< 400 µS/cm",
    description: "Electrical conductance of water, correlated with total dissolved ion concentration.",
    imputedMedian: "None (Complete)"
  },
  {
    name: "Organic_carbon",
    type: "Numeric (float)",
    unit: "ppm",
    missingCount: 0,
    missingPercent: 0.0,
    whoRange: "< 4.0 ppm",
    description: "Total Organic Carbon (TOC) derived from decaying natural organic matter.",
    imputedMedian: "None (Complete)"
  },
  {
    name: "Trihalomethanes",
    type: "Numeric (float)",
    unit: "µg/L",
    missingCount: 162,
    missingPercent: 4.95,
    whoRange: "< 80 µg/L",
    description: "Disinfection byproducts formed when chlorine reacts with organic matter.",
    imputedMedian: "66.62"
  },
  {
    name: "Turbidity",
    type: "Numeric (float)",
    unit: "NTU",
    missingCount: 0,
    missingPercent: 0.0,
    whoRange: "< 5.0 NTU",
    description: "Measure of light-scattering particulate matter causing haze or cloudiness.",
    imputedMedian: "None (Complete)"
  },
  {
    name: "Potability",
    type: "Binary (0 / 1)",
    unit: "Categorical",
    missingCount: 0,
    missingPercent: 0.0,
    whoRange: "Target Label",
    description: "Supervised classification label (0 = Non-Potable, 1 = Potable in dataset).",
    imputedMedian: "Target (Ground Truth)"
  }
];

export const PH_HISTOGRAM_DATA = [
  { bin: "0-3 (Extremely Acidic)", count: 22, safe: false },
  { bin: "3-5 (Acidic)", count: 184, safe: false },
  { bin: "5-6.5 (Slightly Acidic)", count: 540, safe: false },
  { bin: "6.5-7.5 (Optimal Neutral)", count: 1220, safe: true },
  { bin: "7.5-8.5 (Safe Alkaline)", count: 885, safe: true },
  { bin: "8.5-10 (High Alkaline)", count: 360, safe: false },
  { bin: "10-14 (Hazardous Alkaline)", count: 65, safe: false }
];

export const METHODOLOGY_STEPS = [
  {
    step: 1,
    title: "Dataset Acquisition",
    subtitle: "Kaggle Water Potability",
    description: "Imported 3,276 records across 10 hydrochemical attributes into R environment via Google Colab."
  },
  {
    step: 2,
    title: "Data Inspection",
    subtitle: "Structure & Quality Check",
    description: "Evaluated data types, missing value distributions (Sulfate: 781, ph: 491, Trihalomethanes: 162), and verified 0 exact duplicate rows."
  },
  {
    step: 3,
    title: "Data Cleaning & Imputation",
    subtitle: "Median Imputation",
    description: "Imputed missing predictor values using training-set medians only, completely preventing test/validation data leakage (0 missing post-cleaning)."
  },
  {
    step: 4,
    title: "Exploratory Data Analysis",
    subtitle: "Distributions & Cross-Correlations",
    description: "Assessed class balance (61% vs 39%), evaluated feature distributions, and analyzed pairwise linear correlations."
  },
  {
    step: 5,
    title: "Stratified Data Splitting",
    subtitle: "70 / 15 / 15 Partitioning",
    description: "Partitioned dataset into Train (2,292 rows), Validation (490 rows), and Held-Out Test (494 rows) maintaining exact class proportions."
  },
  {
    step: 6,
    title: "Model Training: Logistic Regression",
    subtitle: "Linear Baseline",
    description: "Fitted generalized linear model in R to benchmark linear separability on hydrochemical predictors."
  },
  {
    step: 7,
    title: "Model Training: Random Forest",
    subtitle: "Non-Linear Ensemble",
    description: "Fitted 500-tree ensemble in R to capture non-linear feature interactions and high-dimensional decision boundaries."
  },
  {
    step: 8,
    title: "Validation-Based Selection",
    subtitle: "ROC-AUC Criterion",
    description: "Selected Random Forest based on superior validation ROC-AUC (0.6272 vs 0.4366 for Logistic Regression), keeping test set strictly unseen."
  },
  {
    step: 9,
    title: "Held-Out Test Evaluation",
    subtitle: "Final Benchmark",
    description: "Evaluated selected Random Forest on 494 held-out test rows: 67.21% accuracy, 0.6910 ROC-AUC, 126 False Negatives analyzed."
  },
  {
    step: 10,
    title: "LIME Local Explainability",
    subtitle: "Case 968 Local Surrogate",
    description: "Applied LIME in R to probe individual instance predictions, assessing explanation quality and local fit (R² = 0.134)."
  }
];
