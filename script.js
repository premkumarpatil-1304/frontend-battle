// Chart data matching the image
const chartData = [
    { label: '24', refurbishment: 549, newBuild: null },
    { label: '278', refurbishment: 278, newBuild: null },
    { label: '165', refurbishment: 975, newBuild: null },
    { label: '647', refurbishment: 647, newBuild: null },
    { label: '549', refurbishment: 549, newBuild: null },
    { label: '35', refurbishment: 35, newBuild: null },
    { label: '186', refurbishment: 186, newBuild: null },
    { label: '161', refurbishment: 161, newBuild: null },
    { label: '152', refurbishment: 152, newBuild: null },
    { label: '550', refurbishment: 550, newBuild: null },
    { label: '681', refurbishment: 681, newBuild: null },
    { label: '639', refurbishment: 639, newBuild: null },
    { label: '289', refurbishment: 289, newBuild: null },
    { label: '28', refurbishment: 28, newBuild: null },
    { label: '62', refurbishment: 62, newBuild: null },
    { label: '44', refurbishment: 44, newBuild: null },
    { label: '105', refurbishment: 105, newBuild: null },
    { label: '145', refurbishment: 145, newBuild: null },
    { label: '617', refurbishment: 617, newBuild: null },
    { label: '528', refurbishment: 528, newBuild: null }
];

// State management
let currentFilters = {
    type: 'all',
    status: 'complete'
};

// Initialize the chart
function initChart() {
    renderChart();
    setupEventListeners();
}

// Render the chart bars
function renderChart() {
    const chartContainer = document.getElementById('chart');
    chartContainer.innerHTML = '';
    
    const filteredData = filterData();
    const maxValue = 1200; // Maximum value for scaling
    
    filteredData.forEach(item => {
        const barGroup = createBarGroup(item, maxValue);
        chartContainer.appendChild(barGroup);
    });
}

// Filter data based on current filters
function filterData() {
    return chartData.filter(item => {
        // For now, showing all data as the image shows complete data
        // You can extend this logic based on your filtering requirements
        return true;
    });
}

// Create a bar group element
function createBarGroup(data, maxValue) {
    const barGroup = document.createElement('div');
    barGroup.className = 'bar-group';
    
    // Calculate heights as percentages of maxValue
    const refurbishmentHeight = data.refurbishment ? (data.refurbishment / maxValue) * 400 : 0;
    const newBuildHeight = data.newBuild ? (data.newBuild / maxValue) * 400 : 0;
    
    // Create bars container
    const barsContainer = document.createElement('div');
    barsContainer.className = 'bars-container';
    
    // Create refurbishment bar if data exists
    if (data.refurbishment) {
        const refurbishmentBar = document.createElement('div');
        refurbishmentBar.className = 'bar bar-refurbishment';
        refurbishmentBar.style.height = `${refurbishmentHeight}px`;
        
        // Add value label
        const valueLabel = document.createElement('div');
        valueLabel.className = 'bar-value';
        valueLabel.textContent = data.refurbishment;
        refurbishmentBar.appendChild(valueLabel);
        
        barsContainer.appendChild(refurbishmentBar);
    }
    
    // Create new build bar if data exists
    if (data.newBuild) {
        const newBuildBar = document.createElement('div');
        newBuildBar.className = 'bar bar-new-build';
        newBuildBar.style.height = `${newBuildHeight}px`;
        
        // Add value label
        const valueLabel = document.createElement('div');
        valueLabel.className = 'bar-value';
        valueLabel.textContent = data.newBuild;
        newBuildBar.appendChild(valueLabel);
        
        barsContainer.appendChild(newBuildBar);
    }
    
    // Create label
    const label = document.createElement('div');
    label.className = 'bar-label';
    label.textContent = data.label;
    
    barGroup.appendChild(barsContainer);
    barGroup.appendChild(label);
    
    return barGroup;
}

// Setup event listeners for filters
function setupEventListeners() {
    // Type filter buttons
    const typeButtons = document.querySelectorAll('[data-type]');
    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all type buttons
            typeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            currentFilters.type = button.dataset.type;
            renderChart();
        });
    });
    
    // Status filter buttons
    const statusButtons = document.querySelectorAll('[data-status]');
    statusButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all status buttons
            statusButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            currentFilters.status = button.dataset.status;
            renderChart();
        });
    });
    
    // Download button
    const downloadBtn = document.querySelector('.download-btn');
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        downloadData();
    });
}

// Download functionality
function downloadData() {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'embodied_carbon_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Generate CSV content
function generateCSV() {
    let csv = 'Label,Refurbishment (kgCO2e/m2),New Build (kgCO2e/m2)\n';
    
    chartData.forEach(item => {
        csv += `${item.label},${item.refurbishment || ''},${item.newBuild || ''}\n`;
    });
    
    return csv;
}

// Handle responsive behavior
function handleResize() {
    // Adjust chart dimensions on resize
    renderChart();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initChart();
    window.addEventListener('resize', handleResize);
});

// Add smooth transitions and animations
function addAnimations() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        bar.style.animationDelay = `${index * 50}ms`;
        bar.classList.add('animate-in');
    });
}

// Add CSS animation class
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideUp 0.6s ease-out forwards;
        transform: translateY(100%);
    }
    
    @keyframes slideUp {
        to {
            transform: translateY(0);
        }
    }
    
    .bar {
        transition: all 0.3s ease;
    }
    
    .bar:hover {
        opacity: 0.8;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);