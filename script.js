function calculateROI() {
    const monthlyVolume = parseFloat(document.getElementById("monthlyVolume").value) || 0;
    const hourlyWage = parseFloat(document.getElementById("hourlyWage").value) || 0;
    const avgHoursPerInvoice = parseFloat(document.getElementById("avgHoursPerInvoice").value) || 0;
    const manualErrorRate = parseFloat(document.getElementById("manualErrorRate").value) || 0;
    const errorCost = parseFloat(document.getElementById("errorCost").value) || 0;
    const timeHorizon = parseFloat(document.getElementById("timeHorizon").value) || 0;
    const implementationCost = parseFloat(document.getElementById("implementationCost").value) || 0;

    const HOURS_SAVED_PER_INVOICE_FACTOR = 0.85;
    const ERROR_REDUCTION_FACTOR = 0.98;
    const AUTOMATION_SERVICE_FEE_PER_INVOICE = 0.50;

    const errorRateDecimal = manualErrorRate / 100;

    const manualTimeCost = monthlyVolume * avgHoursPerInvoice * hourlyWage;
    const manualErrorCost = monthlyVolume * errorRateDecimal * errorCost;
    const currentManualMonthlyCost = manualTimeCost + manualErrorCost;

    const automatedTimeCost = manualTimeCost * (1 - HOURS_SAVED_PER_INVOICE_FACTOR);
    const automatedErrorCost = manualErrorCost * (1 - ERROR_REDUCTION_FACTOR);
    const automationServiceFee = monthlyVolume * AUTOMATION_SERVICE_FEE_PER_INVOICE;
    const automatedMonthlyCost = automatedTimeCost + automatedErrorCost + automationServiceFee;

    const monthlySavings = currentManualMonthlyCost - automatedMonthlyCost;
    const paybackPeriodMonths = monthlySavings > 0 ? implementationCost / monthlySavings : Infinity;
    const totalSavings = monthlySavings * timeHorizon;
    const netSavings = totalSavings - implementationCost;
    const roiPercentage = implementationCost > 0 ? (netSavings / implementationCost) * 100 : 0;

    document.getElementById("monthlySavings").innerText = "$" + monthlySavings.toFixed(2);
    document.getElementById("paybackPeriod").innerText = isFinite(paybackPeriodMonths) ? paybackPeriodMonths.toFixed(2) + " Months" : "∞";
    document.getElementById("netSavings").innerText = "$" + netSavings.toFixed(2);
    document.getElementById("roiPercentage").innerText = roiPercentage.toFixed(2) + "%";
}
