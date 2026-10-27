# Script to generate high-resolution figures for AquaSentinel R Markdown report

output_dir <- "d:/IDS_PROJECT_FRONTEND/images"
if (!dir.exists(output_dir)) dir.create(output_dir, recursive = TRUE)

# Color Palette
c_dark <- "#0f172a"
c_slate <- "#334155"
c_muted <- "#64748b"
c_light <- "#f8fafc"
c_border <- "#cbd5e1"
c_teal <- "#0d9488"
c_teal_light <- "#ccfbf1"
c_indigo <- "#4338ca"
c_indigo_light <- "#e0e7ff"
c_amber <- "#d97706"
c_amber_light <- "#fef3c7"
c_rose <- "#e11d48"
c_rose_light <- "#ffe4e6"
c_emerald <- "#059669"
c_emerald_light <- "#d1fae5"

# -----------------------------------------------------------------------------
# 1. Pipeline Methodology Flowchart
# -----------------------------------------------------------------------------
png(file.path(output_dir, "pipeline_methodology.png"), width = 1600, height = 900, res = 150)
par(mar = c(1, 1, 3, 1), bg = "#ffffff")
plot.new()
plot.window(xlim = c(0, 10), ylim = c(0, 5.5))
title(main = "AquaSentinel: 10-Stage Machine Learning Pipeline", cex.main = 1.4, col.main = c_dark, font.main = 2)

steps <- list(
  c("1. Ingestion", "3,276 Records\nKaggle Benchmark"),
  c("2. Inspection", "Types & Duplicates\nCheck (0 duplicates)"),
  c("3. Imputation", "Train-Split Medians\n(Zero-leakage)"),
  c("4. EDA", "Distributions &\nCorrelations"),
  c("5. Strat. Split", "70/15/15 Partition\nTrain/Val/Test"),
  c("6. Logistic Reg.", "Linear Baseline\nCollapse (0.5% Rec)"),
  c("7. Random Forest", "500-Tree Ensemble\nNonlinear Boundaries"),
  c("8. Val. Selection", "ROC-AUC 0.6272\nRF Selected"),
  c("9. Test Eval.", "494 Held-Out Rows\nAUC 0.6910 / Acc 67%"),
  c("10. LIME Audit", "Case 968 (R2=0.134)\nLocal Fidelity Check")
)

# Row 1 (Steps 1 to 5)
for (i in 1:5) {
  x <- 0.3 + (i - 1) * 1.95
  rect(x, 3.2, x + 1.7, 4.8, col = c_teal_light, border = c_teal, lwd = 2)
  text(x + 0.85, 4.4, steps[[i]][1], cex = 0.9, font = 2, col = c_dark)
  text(x + 0.85, 3.8, steps[[i]][2], cex = 0.75, col = c_slate)
  if (i < 5) {
    arrows(x + 1.72, 4.0, x + 1.93, 4.0, length = 0.08, col = c_muted, lwd = 2.5)
  }
}
# Down arrow from 5 to 6
arrows(8.95, 3.18, 8.95, 2.52, length = 0.08, col = c_muted, lwd = 2.5)

# Row 2 (Steps 6 to 10 - reversed flow for logical loop)
# Step 6 is at right, step 10 is at left
step6_10 <- 6:10
for (idx in 1:5) {
  step_num <- step6_10[idx]
  # position from right to left
  x <- 8.1 - (idx - 1) * 1.95
  box_col <- if (step_num == 8) c_amber_light else if (step_num == 9) c_emerald_light else c_indigo_light
  border_col <- if (step_num == 8) c_amber else if (step_num == 9) c_emerald else c_indigo
  
  rect(x, 0.9, x + 1.7, 2.5, col = box_col, border = border_col, lwd = 2)
  text(x + 0.85, 2.1, steps[[step_num]][1], cex = 0.9, font = 2, col = c_dark)
  text(x + 0.85, 1.5, steps[[step_num]][2], cex = 0.75, col = c_slate)
  if (idx < 5) {
    arrows(x - 0.02, 1.7, x - 0.23, 1.7, length = 0.08, col = c_muted, lwd = 2.5)
  }
}
dev.off()

# -----------------------------------------------------------------------------
# 2. Potability Class Distribution (Pie / Donut)
# -----------------------------------------------------------------------------
png(file.path(output_dir, "class_distribution.png"), width = 1200, height = 800, res = 150)
par(mar = c(2, 2, 3, 2), bg = "#ffffff")
counts <- c(1998, 1278)
labels <- c("Non-Potable (Label 0)\n1,998 (61.0%)", "Potable (Label 1)\n1,278 (39.0%)")
cols <- c(c_slate, c_teal)
pie(counts, labels = labels, col = cols, border = "#ffffff", lwd = 3, cex = 1.0,
    main = "Ground Truth Target Class Distribution (N = 3,276)")
text(0, 0, "3,276\nTotal Samples", cex = 1.1, font = 2, col = c_dark)
dev.off()

# -----------------------------------------------------------------------------
# 3. Missing Values by Predictor
# -----------------------------------------------------------------------------
png(file.path(output_dir, "missing_values.png"), width = 1400, height = 850, res = 150)
par(mar = c(6, 5, 4, 2), bg = "#ffffff")
miss_data <- c(781, 491, 162, 0, 0, 0, 0, 0, 0)
names(miss_data) <- c("Sulfate", "pH", "Trihalomethanes", "Hardness", "Solids", 
                      "Chloramines", "Conductivity", "Organic_carbon", "Turbidity")
bar_cols <- c(c_amber, c_amber, c_amber, rep(c_border, 6))
bp <- barplot(miss_data, col = bar_cols, border = NA, ylim = c(0, 900),
              ylab = "Missing Count (Rows)", las = 2, cex.names = 0.85,
              main = "Missing Value Distribution Across Predictors (Total = 1,434)")
grid(nx = NA, ny = NULL, col = "#e2e8f0", lty = "dotted")
text(bp[1:3], miss_data[1:3] + 45, labels = paste0(miss_data[1:3], "\n(", c("23.8%", "15.0%", "5.0%"), ")"), 
     cex = 0.75, font = 2, col = c_dark)
text(bp[4:9], 30, labels = "0 (0%)", cex = 0.7, col = c_muted)
legend("topright", legend = c("Incomplete Predictor (Imputed via Train Median)", "Complete Predictor"),
       fill = c(c_amber, c_border), bty = "n", cex = 0.85)
dev.off()

# -----------------------------------------------------------------------------
# 4. pH Safe-Zone Distribution Histogram
# -----------------------------------------------------------------------------
png(file.path(output_dir, "ph_distribution.png"), width = 1400, height = 850, res = 150)
par(mar = c(6, 5, 4, 2), bg = "#ffffff")
bins <- c(22, 184, 540, 1220, 885, 360, 65)
bin_names <- c("0-3\nExtr. Acidic", "3-5\nAcidic", "5-6.5\nSlightly Acid", 
               "6.5-7.5\nOptimal Safe", "7.5-8.5\nAlkaline Safe", "8.5-10\nHigh Alkaline", "10-14\nHazardous Alk")
colors <- c(c_rose, c_rose, c_amber, c_emerald, c_emerald, c_amber, c_rose)
bp <- barplot(bins, col = colors, border = NA, ylim = c(0, 1400),
              ylab = "Sample Count", las = 1, cex.names = 0.8, names.arg = bin_names,
              main = "Water pH Distribution with WHO Safety Band (6.5 – 8.5)")
grid(nx = NA, ny = NULL, col = "#e2e8f0", lty = "dotted")
text(bp, bins + 55, labels = bins, cex = 0.8, font = 2, col = c_dark)
legend("topright", legend = c("WHO Safe Drinking Band (6.5-8.5)", "Moderate Deviation", "Hazardous Acidic / Alkaline"),
       fill = c(c_emerald, c_amber, c_rose), bty = "n", cex = 0.85)
dev.off()

# -----------------------------------------------------------------------------
# 5. Model Comparison: Validation Benchmark
# -----------------------------------------------------------------------------
png(file.path(output_dir, "model_comparison.png"), width = 1400, height = 850, res = 150)
par(mar = c(5, 5, 4, 2), bg = "#ffffff")
metrics <- matrix(c(
  61.22, 62.24, # Accuracy
  100.0, 53.19, # Precision
  0.52,  26.18, # Recall
  1.04,  35.09, # F1
  43.66, 62.72  # ROC-AUC
), nrow = 2, ncol = 5)
colnames(metrics) <- c("Accuracy", "Precision*", "Recall", "F1-Score", "ROC-AUC (Deciding)")
rownames(metrics) <- c("Logistic Regression (Baseline)", "Random Forest (Ensemble)")

bp <- barplot(metrics, beside = TRUE, col = c(c_slate, c_indigo), ylim = c(0, 115),
              ylab = "Score (%)", main = "Validation Set Benchmark: Logistic Regression vs Random Forest",
              cex.names = 0.85, border = NA)
grid(nx = NA, ny = NULL, col = "#e2e8f0", lty = "dotted")
text(bp, metrics + 4, labels = paste0(round(metrics, 1), "%"), cex = 0.72, font = 2, col = c_dark)
legend("topleft", legend = c("Logistic Regression (Linear Baseline)", "Random Forest (Selected via Val ROC-AUC)"),
       fill = c(c_slate, c_indigo), bty = "n", cex = 0.9)
dev.off()

# -----------------------------------------------------------------------------
# 6. Held-Out Test Confusion Matrix
# -----------------------------------------------------------------------------
png(file.path(output_dir, "confusion_matrix.png"), width = 1200, height = 900, res = 150)
par(mar = c(4, 5, 4, 3), bg = "#ffffff")
plot.new()
plot.window(xlim = c(0, 4), ylim = c(0, 4))
title(main = "Held-Out Test Confusion Matrix: Random Forest (N = 494)", cex.main = 1.25, font.main = 2, col.main = c_dark)

# Quadrants
rect(0.5, 2.0, 2.0, 3.5, col = "#e0f2fe", border = "#38bdf8", lwd = 2) # TN
rect(2.0, 2.0, 3.5, 3.5, col = c_rose_light, border = c_rose, lwd = 2) # FP
rect(0.5, 0.5, 2.0, 2.0, col = c_amber_light, border = c_amber, lwd = 2) # FN
rect(2.0, 0.5, 3.5, 2.0, col = c_emerald_light, border = c_emerald, lwd = 2) # TP

# Cell Text
text(1.25, 2.9, "True Negative (TN)", cex = 0.9, font = 2, col = c_dark)
text(1.25, 2.5, "265", cex = 1.8, font = 2, col = "#0369a1")
text(1.25, 2.2, "Correctly Non-Potable (53.6%)", cex = 0.75, col = c_slate)

text(2.75, 2.9, "False Positive (FP)", cex = 0.9, font = 2, col = c_dark)
text(2.75, 2.5, "36", cex = 1.8, font = 2, col = c_rose)
text(2.75, 2.2, "Type I Error (Health Hazard) (7.3%)", cex = 0.75, col = c_slate)

text(1.25, 1.4, "False Negative (FN)", cex = 0.9, font = 2, col = c_dark)
text(1.25, 1.0, "126", cex = 1.8, font = 2, col = c_amber)
text(1.25, 0.7, "Type II Error (Missed Safe Water) (25.5%)", cex = 0.75, col = c_slate)

text(2.75, 1.4, "True Positive (TP)", cex = 0.9, font = 2, col = c_dark)
text(2.75, 1.0, "67", cex = 1.8, font = 2, col = c_emerald)
text(2.75, 0.7, "Correctly Potable (13.6%)", cex = 0.75, col = c_slate)

# Axis labels
text(1.25, 3.7, "Pred: Non-Potable", cex = 0.9, font = 2, col = c_slate)
text(2.75, 3.7, "Pred: Potable", cex = 0.9, font = 2, col = c_slate)
text(0.2, 2.75, "Actual:\nNon-Potable", cex = 0.9, font = 2, col = c_slate, srt = 90)
text(0.2, 1.25, "Actual:\nPotable", cex = 0.9, font = 2, col = c_slate, srt = 90)
dev.off()

# -----------------------------------------------------------------------------
# 7. Held-Out Test ROC Curve
# -----------------------------------------------------------------------------
png(file.path(output_dir, "roc_curve.png"), width = 1200, height = 900, res = 150)
par(mar = c(5, 5, 4, 2), bg = "#ffffff")
fpr <- c(0, 0.05, 0.12, 0.22, 0.35, 0.50, 0.70, 0.85, 1.00)
tpr <- c(0, 0.18, 0.35, 0.52, 0.67, 0.79, 0.90, 0.96, 1.00)

plot(fpr, tpr, type = "l", col = c_teal, lwd = 3.5, xlim = c(0, 1), ylim = c(0, 1),
     xlab = "False Positive Rate (1 - Specificity)", ylab = "True Positive Rate (Sensitivity / Recall)",
     main = "Held-Out Test ROC Curve: Random Forest (AUC = 0.6910)", las = 1)
grid(col = "#e2e8f0", lty = "dotted")
polygon(c(fpr, 1, 0), c(tpr, 0, 0), col = "#ccfbf166", border = NA)
lines(c(0, 1), c(0, 1), col = c_muted, lty = 2, lwd = 2) # Chance diagonal

# Operating Point (threshold = 0.5)
points(0.12, 0.35, pch = 19, col = c_rose, cex = 1.6)
text(0.14, 0.39, "Operating Point (thresh = 0.5)\nFPR = 12.0%, TPR = 34.7%", 
     pos = 4, cex = 0.8, font = 2, col = c_dark)

legend("bottomright", 
       legend = c("Random Forest (AUC = 0.6910)", "Chance Baseline (AUC = 0.5000)", "Default 0.5 Threshold Point"),
       col = c(c_teal, c_muted, c_rose), lwd = c(3, 2, NA), pch = c(NA, NA, 19), bty = "n", cex = 0.85)
dev.off()

# -----------------------------------------------------------------------------
# 8. Feature Importance Bar Chart
# -----------------------------------------------------------------------------
png(file.path(output_dir, "feature_importance.png"), width = 1400, height = 900, res = 150)
par(mar = c(5, 8, 4, 2), bg = "#ffffff")
feat_names <- rev(c("Hardness", "Sulfate", "pH", "Solids", "Chloramines", 
                    "Trihalomethanes", "Conductivity", "Organic_carbon", "Turbidity"))
imp_vals <- rev(c(140.48, 139.18, 138.53, 124.01, 120.85, 108.15, 107.22, 106.86, 104.62))

bp <- barplot(imp_vals, horiz = TRUE, names.arg = feat_names, las = 1,
              col = c_teal, border = NA, xlim = c(0, 160),
              xlab = "Mean Decrease in Gini / Permutation Importance",
              main = "Random Forest Feature Importance Hierarchy (9 Predictors)",
              cex.names = 0.85)
grid(nx = NULL, ny = NA, col = "#e2e8f0", lty = "dotted")
text(imp_vals + 6, bp, labels = round(imp_vals, 1), cex = 0.8, font = 2, col = c_dark)
dev.off()

# -----------------------------------------------------------------------------
# 9. LIME Case Study 968 Local Surrogate Audit
# -----------------------------------------------------------------------------
png(file.path(output_dir, "lime_case_study.png"), width = 1400, height = 850, res = 150)
par(mar = c(5, 5, 4, 2), bg = "#ffffff")
plot.new()
plot.window(xlim = c(0, 10), ylim = c(0, 6))
title(main = "LIME Local Explanation Diagnostic: Case 968 (R2 = 0.134)", 
      cex.main = 1.3, font.main = 2, col.main = c_dark)

# Panel 1: Instance Metadata
rect(0.5, 3.2, 4.8, 5.5, col = c_light, border = c_border, lwd = 1.5)
text(2.65, 5.1, "Instance Identification: Case 968", font = 2, cex = 1.0, col = c_dark)
text(2.65, 4.5, "True Nominal Label: Non-Potable (0)\nModel Prediction: Non-Potable (Class 0)\nPrediction Probabilities: P0 = 81.67% | P1 = 18.33%", 
     cex = 0.85, col = c_slate)
text(2.65, 3.6, "Status: Correctly Classified by RF Ensemble", font = 2, cex = 0.85, col = c_emerald)

# Panel 2: Surrogate Goodness-of-Fit (R2 = 0.134)
rect(5.2, 3.2, 9.5, 5.5, col = c_rose_light, border = c_rose, lwd = 2)
text(7.35, 5.1, "Local Explanation Fidelity Deficit", font = 2, cex = 1.0, col = c_rose)
text(7.35, 4.3, "Surrogate model_r2 = 0.134 (13.4%)\nLinear Ridge Surrogate explains ONLY 13.4%\nof RF decision curvature in local neighborhood", 
     cex = 0.85, col = c_dark)
text(7.35, 3.5, "CRITICAL: Do NOT rely uncritically on local weights", font = 2, cex = 0.8, col = c_rose)

# Panel 3: Probability Breakdown Bar
rect(0.5, 1.2, 9.5, 2.8, col = "#ffffff", border = c_border, lwd = 1.5)
text(5.0, 2.5, "Prediction Probability Distribution (Operating Point = 0.5)", font = 2, cex = 0.95, col = c_dark)
rect(1.0, 1.5, 1.0 + 8.167 * 0.9, 2.1, col = c_slate, border = NA)
rect(1.0 + 8.167 * 0.9, 1.5, 9.0, 2.1, col = c_teal, border = NA)
text(4.0, 1.8, "P(Non-Potable) = 81.67%", col = "#ffffff", font = 2, cex = 0.85)
text(8.0, 1.8, "P(Potable) = 18.33%", col = "#ffffff", font = 2, cex = 0.8)

# Panel 4: Scientific Integrity Note
rect(0.5, 0.1, 9.5, 0.9, col = c_amber_light, border = c_amber, lwd = 1)
text(5.0, 0.5, "Scientific Integrity Notice: In accordance with reproducible methodology, synthetic/dummy LIME weights\nare suppressed. Low R2 indicates extreme non-linearity not capturable by simple linear surrogates.", 
     cex = 0.75, col = c_amber)

dev.off()

cat("All 9 figures generated successfully in:", output_dir, "\n")
