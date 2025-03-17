document.addEventListener('DOMContentLoaded', function() {
    // Form navigation elements
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const formSteps = document.querySelectorAll('.form-step');
    const claimForm = document.getElementById('claimForm');
    const claimSuccessMessage = document.getElementById('claimSuccessMessage');
    
    // Callback form elements
    const callbackForm = document.getElementById('callbackForm');
    const callbackSuccessMessage = document.getElementById('callbackSuccessMessage');
    
    let currentStep = 0;
    const totalSteps = formSteps.length;
    
    // Initialize the form
    function initForm() {
        // Show the first step
        showStep(currentStep);
        
        // Add event listeners to buttons
        prevBtn.addEventListener('click', goToPrevStep);
        nextBtn.addEventListener('click', goToNextStep);
        
        // Form submissions
        if (claimForm) {
            claimForm.addEventListener('submit', submitClaimForm);
        }
        
        if (callbackForm) {
            callbackForm.addEventListener('submit', submitCallbackForm);
        }
        
        // File upload handling
        setupFileUploads();
        
        // Listen for input changes to update review page
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('change', updateReviewPage);
        });
        
        // Initial update of review page
        updateReviewPage();
    }
    
    // Show a specific step
    function showStep(stepIndex) {
        // Hide all steps
        formSteps.forEach(step => step.classList.remove('active'));
        
        // Show the current step
        formSteps[stepIndex].classList.add('active');
        
        // Update buttons
        updateButtons(stepIndex);
        
        // If we're on the review step, update the review content
        if (stepIndex === totalSteps - 1) {
            updateReviewPage();
        }
    }
    
    // Update button states
    function updateButtons(stepIndex) {
        // Disable prev button on first step
        prevBtn.disabled = stepIndex === 0;
        
        // On last step, hide next button and show submit button
        if (stepIndex === totalSteps - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }
    
    // Go to previous step
    function goToPrevStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
            // Scroll to top of form
            document.querySelector('.contact-form--claim').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Go to next step
    function goToNextStep() {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps - 1) {
                currentStep++;
                showStep(currentStep);
                // Scroll to top of form
                document.querySelector('.contact-form--claim').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
    
    // Update review page with current form data
    function updateReviewPage() {
        // Skip if review elements don't exist
        if (!document.getElementById('reviewName')) return;
        
        // Personal details
        document.getElementById('reviewName').textContent = document.getElementById('fullName').value || 'John Smith';
        document.getElementById('reviewContact').textContent = 
            `${document.getElementById('email').value || 'john.smith@example.com'} · ${document.getElementById('phone').value || '07700 900123'}`;
        document.getElementById('reviewOccupation').textContent = document.getElementById('occupation').value || 'Marketing Manager';
        
        // Vehicle details
        document.getElementById('reviewReg').textContent = document.getElementById('vehicleReg').value || 'AB12 XYZ';
        
        const vehicleMake = document.getElementById('vehicleMake').value || 'BMW 3 Series';
        const vehicleYear = document.getElementById('vehicleYear').value || '2018';
        document.getElementById('reviewVehicle').textContent = `${vehicleMake} (${vehicleYear})`;
        
        const insurerName = document.getElementById('insurerName').value || 'Admiral Insurance';
        const policyType = document.getElementById('policyType');
        const policyTypeText = policyType.options[policyType.selectedIndex]?.text || 'Comprehensive';
        document.getElementById('reviewInsurance').textContent = `${insurerName} · ${policyTypeText}`;
        
        // Accident details
        const accidentDate = document.getElementById('accidentDate').value 
            ? new Date(document.getElementById('accidentDate').value).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'})
            : '10 March 2025';
        const accidentTime = document.getElementById('accidentTime').value || '14:30';
        document.getElementById('reviewDateTime').textContent = `${accidentDate}, ${accidentTime}`;
        
        document.getElementById('reviewLocation').textContent = 
            document.getElementById('accidentLocation').value || 'Junction of Oxford Street and Regent Street, London';
        
        // Third party details
        document.getElementById('reviewTPName').textContent = 
            document.getElementById('thirdPartyName').value || 'Jane Doe';
        
        const tpVehicle = document.getElementById('thirdPartyVehicle').value || 'Ford Focus';
        const tpReg = document.getElementById('thirdPartyReg').value || 'CD34 WXY';
        document.getElementById('reviewTPVehicle').textContent = `${tpVehicle} (${tpReg})`;
    }
    
    // Validate the current step
    function validateStep(stepIndex) {
        const currentStepEl = formSteps[stepIndex];
        const requiredFields = currentStepEl.querySelectorAll('[required]');
        
        let isValid = true;
        
        // Check all required fields in the current step
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                // Add error message if it doesn't exist
                const errorMessage = field.nextElementSibling;
                if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                    const message = document.createElement('div');
                    message.className = 'error-message';
                    message.textContent = 'This field is required';
                    field.parentNode.insertBefore(message, field.nextSibling);
                }
            } else {
                field.classList.remove('error');
                
                // Remove error message if it exists
                const errorMessage = field.nextElementSibling;
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.remove();
                }
            }
        });
        
        return isValid;
    }
    
    // Handle file uploads
    function setupFileUploads() {
        const fileInputs = document.querySelectorAll('.file-upload-input');
        
        fileInputs.forEach(input => {
            input.addEventListener('change', function() {
                const fileName = this.files.length > 0 ? 
                    (this.files.length > 1 ? `${this.files.length} files selected` : this.files[0].name) : 
                    'No file chosen';
                
                const fileNameElement = this.closest('.file-upload').querySelector('.file-name');
                if (fileNameElement) {
                    fileNameElement.textContent = fileName;
                }
            });
        });
    }
    
    // Claim form submission
    function submitClaimForm(e) {
        e.preventDefault();
        
        if (validateStep(currentStep)) {
            // Here you would typically send the form data to the server via AJAX
            // For now, we'll just show the success message
            
            // Hide the form and show success message
            claimForm.style.display = 'none';
            claimSuccessMessage.style.display = 'block';
            
            // Scroll to success message
            claimSuccessMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Callback form submission
    function submitCallbackForm(e) {
        e.preventDefault();
        
        // Basic validation
        let isValid = true;
        const requiredFields = callbackForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Here you would typically send the form data to the server via AJAX
            // For now, we'll just show the success message
            
            // Hide the form and show success message
            callbackForm.style.display = 'none';
            callbackSuccessMessage.style.display = 'block';
            
            // Scroll to success message
            callbackSuccessMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Initialize the form
    initForm();
});
