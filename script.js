(function(){
  const form = document.querySelector("form");
  if (!form) return;

  // helper: parse amount string like "£300,000" or "300,000" -> 300000
  function parseAmountRaw(str) {
    if (!str && str !== 0) return NaN;
    // remove any character that's not digit, dot, minus
    const cleaned = String(str).replace(/[^\d.-]+/g, "");
    return parseFloat(cleaned);
  }

  // nice formatter with commas and 2 decimals
  function fmtMoney(num) {
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // reset / clear helper (optional)
  const clearBtn = document.querySelector(".clear");
  if (clearBtn) {
    clearBtn.addEventListener("click", function (e) {
      // if it's an anchor, let it navigate; if not, reset the form and states
      const isAnchor = e.target.tagName.toLowerCase() === "a" || e.currentTarget.closest("a");
      if (!isAnchor) {
        e.preventDefault();
        form.reset();
        document.querySelector(".empty-state") && (document.querySelector(".empty-state").style.display = "block");
        document.querySelector(".results-state") && (document.querySelector(".results-state").style.display = "none");
      }
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // read raw inputs
    const rawAmount = document.getElementById("amount") ? document.getElementById("amount").value.trim() : "";
    // Prefer unique #term and #rate; if #rate missing, fallback to .term NodeList (first = term, second = rate)
    const termEl = document.getElementById("term");
    const rateEl = document.getElementById("rate");
    let termVal, annualRateVal;

    if (termEl && rateEl) {
      termVal = parseFloat(termEl.value);
      annualRateVal = parseFloat(rateEl.value);
    } else {
      // fallback for old markup using two .term inputs
      const termNodes = document.querySelectorAll(".term");
      termVal = termNodes[0] ? parseFloat(termNodes[0].value) : NaN;
      annualRateVal = termNodes[1] ? parseFloat(termNodes[1].value) : NaN;
    }

    const principal = parseAmountRaw(rawAmount);

    // basic validation
    if (isNaN(principal) || isNaN(termVal) || isNaN(annualRateVal) || principal <= 0 || termVal <= 0) {
      alert("Please enter valid numeric values for amount, term (years) and interest rate.");
      return;
    }

    const mortgageTypeInput = document.querySelector("input[name='mortgageType']:checked");
    const mortgageType = mortgageTypeInput ? mortgageTypeInput.value : "repayment";

    const years = Number(termVal);
    const annualRate = Number(annualRateVal) / 100;
    const totalMonths = years * 12;

    let monthlyPayment = 0;
    let totalPayment = 0;

    if (mortgageType === "repayment") {
      const monthlyRate = annualRate / 12;
      if (monthlyRate === 0) {
        monthlyPayment = principal / totalMonths;
      } else {
        const r = monthlyRate;
        const n = totalMonths;
        monthlyPayment = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }
      totalPayment = monthlyPayment * totalMonths;
    } else {
      // Interest-only:
      // monthly interest payment:
      monthlyPayment = principal * (annualRate / 12);
      // total over term: interest paid + principal still owed at end
      // Most people expect to see interest paid over term + principal, so include principal:
      totalPayment = (monthlyPayment * totalMonths) + principal;
      // If you only want interest paid shown, use: totalPayment = monthlyPayment * totalMonths;
    }

    // Update UI (toggle states)
    const emptyState = document.querySelector(".empty-state");
    const resultsState = document.querySelector(".results-state");
    if (emptyState) emptyState.style.display = "none";
    if (resultsState) resultsState.style.display = "block";

    // Write formatted values
    const monthlyEl = document.querySelector(".mr");
    const totalEl = document.querySelector(".tr");
    if (monthlyEl) monthlyEl.textContent = `£${fmtMoney(monthlyPayment)}`;
    if (totalEl) totalEl.textContent = `£${fmtMoney(totalPayment)}`;
  });
})();