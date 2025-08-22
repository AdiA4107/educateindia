// EMI Calculator for Education Loans
class EMICalculator {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.initializeChart();
        this.calculateEMI();
    }

    initializeElements() {
        // Input elements
        this.loanAmountInput = document.getElementById('loanAmount');
        this.loanYearsInput = document.getElementById('loanYears');
        this.interestRateInput = document.getElementById('interestRate');
        
        // Slider elements
        this.amountSlider = document.getElementById('amountSlider');
        this.yearsSlider = document.getElementById('yearsSlider');
        this.interestSlider = document.getElementById('interestSlider');
        
        // Result elements
        this.monthlyPayable = document.querySelector('.monthly-payable .result-value');
        this.principalResult = document.querySelector('.result-item:nth-child(2) .result-value');
        this.interestResult = document.querySelector('.result-item:nth-child(3) .result-value');
        this.totalPayable = document.querySelector('.result-item:nth-child(4) .result-value');
        
        // Formatted value displays
        this.amountFormatted = document.querySelector('#loanAmount + .formatted-value');
        this.yearsFormatted = document.querySelector('#loanYears + .formatted-value');
        this.interestFormatted = document.querySelector('#interestRate + .formatted-value');
    }

    setupEventListeners() {
        // Input field changes
        this.loanAmountInput.addEventListener('input', () => {
            this.updateSlider(this.amountSlider, this.loanAmountInput.value);
            this.updateFormattedValue(this.amountFormatted, this.formatCurrency(this.loanAmountInput.value));
            this.calculateEMI();
        });

        this.loanYearsInput.addEventListener('input', () => {
            this.updateSlider(this.yearsSlider, this.loanYearsInput.value);
            this.updateFormattedValue(this.yearsFormatted, this.loanYearsInput.value + ' years');
            this.calculateEMI();
        });

        this.interestRateInput.addEventListener('input', () => {
            this.updateSlider(this.interestSlider, this.interestRateInput.value);
            this.updateFormattedValue(this.interestFormatted, this.interestRateInput.value + '%');
            this.calculateEMI();
        });

        // Slider changes
        this.amountSlider.addEventListener('input', () => {
            this.loanAmountInput.value = this.amountSlider.value;
            this.updateFormattedValue(this.amountFormatted, this.formatCurrency(this.amountSlider.value));
            this.calculateEMI();
        });

        this.yearsSlider.addEventListener('input', () => {
            this.loanYearsInput.value = this.yearsSlider.value;
            this.updateFormattedValue(this.yearsFormatted, this.yearsSlider.value + ' years');
            this.calculateEMI();
        });

        this.interestSlider.addEventListener('input', () => {
            this.interestRateInput.value = this.interestSlider.value;
            this.updateFormattedValue(this.interestFormatted, this.interestSlider.value + '%');
            this.calculateEMI();
        });
    }

    updateSlider(slider, value) {
        slider.value = value;
    }

    updateFormattedValue(element, value) {
        element.textContent = value;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN').format(amount);
    }

    calculateEMI() {
        const principal = parseFloat(this.loanAmountInput.value);
        const years = parseFloat(this.loanYearsInput.value);
        const annualRate = parseFloat(this.interestRateInput.value);
        
        if (principal <= 0 || years <= 0 || annualRate <= 0) {
            return;
        }

        const monthlyRate = annualRate / 100 / 12;
        const totalMonths = years * 12;
        
        // Calculate EMI using the formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
        const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / 
                   (Math.pow(1 + monthlyRate, totalMonths) - 1);
        
        const totalAmount = emi * totalMonths;
        const totalInterest = totalAmount - principal;

        // Update results
        this.monthlyPayable.textContent = `₹ ${this.formatCurrency(Math.round(emi))} /mo`;
        this.principalResult.textContent = `₹ ${this.formatCurrency(principal)}`;
        this.interestResult.textContent = `₹ ${this.formatCurrency(Math.round(totalInterest))}`;
        this.totalPayable.textContent = `₹ ${this.formatCurrency(Math.round(totalAmount))}`;

        // Update chart
        this.updateChart(principal, Math.round(totalInterest));
    }

    initializeChart() {
        const ctx = document.getElementById('paymentChart').getContext('2d');
        
        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Principal', 'Interest'],
                datasets: [{
                    data: [5245000, 6691315],
                    backgroundColor: [
                        '#3B82F6', // Blue for Principal
                        '#EF4444'  // Red for Interest
                    ],
                    borderWidth: 0,
                    cutout: '60%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                return label + ': ' + new Intl.NumberFormat('en-IN').format(value);
                            }
                        }
                    }
                },
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                }
            }
        });
    }

    updateChart(principal, interest) {
        this.chart.data.datasets[0].data = [principal, interest];
        this.chart.update();
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EMICalculator();
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add number formatting for better UX
function formatNumberInput(input) {
    input.addEventListener('blur', function() {
        if (this.value) {
            const num = parseFloat(this.value);
            if (!isNaN(num)) {
                this.value = num.toFixed(2);
            }
        }
    });
}

// Apply number formatting to interest rate input
document.addEventListener('DOMContentLoaded', () => {
    const interestInput = document.getElementById('interestRate');
    if (interestInput) {
        formatNumberInput(interestInput);
    }
}); 