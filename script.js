document.addEventListener('DOMContentLoaded', function () {
    const gstInclusiveRadio = document.getElementById('GST_Inclusive');
    const gstExclusiveRadio = document.getElementById('GST_Exclusive');
    const profitSection = document.getElementById('profit_section');
    const profitDisplay = document.getElementById('profit_display');

    function handleGSTOptionChange() {
        if (gstInclusiveRadio.checked) {
            profitSection.style.display = 'none';
            profitDisplay.style.display = 'none';
        } else {
            profitSection.style.display = 'block';
            profitDisplay.style.display = 'block';
        }
    }

    gstInclusiveRadio.addEventListener('change', handleGSTOptionChange);
    gstExclusiveRadio.addEventListener('change', handleGSTOptionChange);
    handleGSTOptionChange();
});

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', validateAndCalculate);
    input.addEventListener('change', validateAndCalculate);
});

function validateAndCalculate() {
    let costInput = document.getElementById('cost');
    let profitInput = document.getElementById('profit_ratio');
    costInput.value = costInput.value.replace(/[^0-9.]/g, '');
    profitInput.value = profitInput.value.replace(/[^0-9.]/g, '');

    let cost = parseFloat(costInput.value);
    let profitRatio = parseFloat(profitInput.value) || 0;
    let gstOption = document.querySelector('input[name="gst_option"]:checked');
    let gstRate = document.querySelector('input[name="gst_rate"]:checked');

    if (!cost || !gstOption || !gstRate) return;
    gstRate = parseFloat(gstRate.value) / 100;

    let totalGST, totalCost, totalProfit;
    if (gstOption.value === "exclusive") {
        totalGST = cost * gstRate;
        totalCost = cost + totalGST;
        totalProfit = totalCost * (profitRatio / 100);
        totalCost += totalProfit;
        document.getElementById('total_profit').innerText = "Rs. " + totalProfit.toFixed(2);
    } else {
        totalGST = cost - (cost / (1 + gstRate));
        totalCost = cost - totalGST;
        totalProfit = 0;
        document.getElementById('total_profit').innerText = "Rs. 0";
    }
    document.getElementById('cost_of_selling').innerText = "Rs. " + Math.round(totalCost);
    document.getElementById('total_gst').innerText = "Rs. " + Math.round(totalGST);
}