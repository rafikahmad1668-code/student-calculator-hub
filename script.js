// GPA Calculator
function initGPAInputs() {
    const numClasses = document.getElementById('numClasses').value;
    const container = document.getElementById('gpaInputs');
    container.innerHTML = '';
    
    for (let i = 1; i <= numClasses; i++) {
        const div = document.createElement('div');
        div.className = 'grade-input';
        div.innerHTML = `
            <input type="text" placeholder="Class ${i} Name" id="className${i}">
            <select id="grade${i}">
                <option value="4.0">A (4.0)</option>
                <option value="3.7">A- (3.7)</option>
                <option value="3.3">B+ (3.3)</option>
                <option value="3.0">B (3.0)</option>
                <option value="2.7">B- (2.7)</option>
                <option value="2.3">C+ (2.3)</option>
                <option value="2.0">C (2.0)</option>
                <option value="1.7">C- (1.7)</option>
                <option value="1.3">D+ (1.3)</option>
                <option value="1.0">D (1.0)</option>
                <option value="0.0">F (0.0)</option>
            </select>
            <input type="number" placeholder="Credits" id="credits${i}" value="3" min="1" max="6">
        `;
        container.appendChild(div);
    }
}

function calculateGPA() {
    const numClasses = document.getElementById('numClasses').value;
    let totalPoints = 0;
    let totalCredits = 0;
    
    for (let i = 1; i <= numClasses; i++) {
        const grade = parseFloat(document.getElementById(`grade${i}`).value);
        const credits = parseFloat(document.getElementById(`credits${i}`).value);
        totalPoints += grade * credits;
        totalCredits += credits;
    }
    
    const gpa = (totalPoints / totalCredits).toFixed(2);
    const resultDiv = document.getElementById('gpaResult');
    
    let message = '';
    if (gpa >= 3.7) message = 'Outstanding! 🌟';
    else if (gpa >= 3.0) message = 'Great work! 👏';
    else if (gpa >= 2.0) message = 'Keep improving! 💪';
    else message = 'You can do better! 📚';
    
    resultDiv.innerHTML = `
        <h3>Your GPA: ${gpa}</h3>
        <p>${message}</p>
        <p>Total Credits: ${totalCredits}</p>
    `;
    resultDiv.classList.add('show');
}

// Final Grade Calculator
function calculateFinalGrade() {
    const current = parseFloat(document.getElementById('currentGrade').value);
    const desired = parseFloat(document.getElementById('desiredGrade').value);
    const weight = parseFloat(document.getElementById('examWeight').value);
    
    if (!current || !desired || !weight) {
        alert('Please fill in all fields!');
        return;
    }
    
    const needed = ((desired - current * (1 - weight/100)) / (weight/100)).toFixed(2);
    const resultDiv = document.getElementById('gradeResult');
    
    let message = '';
    if (needed > 100) {
        message = '⚠️ Unfortunately, it\'s mathematically impossible to reach your desired grade.';
    } else if (needed < 0) {
        message = '🎉 Great news! You\'ve already achieved your desired grade!';
    } else if (needed >= 90) {
        message = '💪 You need to ace this exam! Study hard!';
    } else if (needed >= 70) {
        message = '📚 Achievable with good preparation!';
    } else {
        message = '✅ Very achievable! You got this!';
    }
    
    resultDiv.innerHTML = `
        <h3>Required Final Exam Score: ${needed > 0 && needed <= 100 ? needed + '%' : 'See below'}</h3>
        <p>${message}</p>
    `;
    resultDiv.classList.add('show');
}

// Study Time Planner
function calculateStudyPlan() {
    const days = parseInt(document.getElementById('daysUntil').value);
    const totalHours = parseInt(document.getElementById('totalHours').value);
    const hoursPerDay = parseInt(document.getElementById('hoursPerDay').value);
    
    if (!days || !totalHours || !hoursPerDay) {
        alert('Please fill in all fields!');
        return;
    }
    
    const hoursNeeded = (totalHours / days).toFixed(1);
    const totalAvailable = days * hoursPerDay;
    const resultDiv = document.getElementById('studyResult');
    
    let message = '';
    if (totalAvailable < totalHours) {
        message = `⚠️ Warning: You need ${hoursNeeded} hours/day, but only have ${hoursPerDay} hours available. Consider increasing daily study time or reducing total hours needed.`;
    } else {
        const buffer = totalAvailable - totalHours;
        message = `✅ Perfect! Study ${hoursNeeded} hours per day. You'll have ${buffer} extra hours as buffer time.`;
    }
    
    resultDiv.innerHTML = `
        <h3>Study Plan</h3>
        <p><strong>Study ${hoursNeeded} hours per day</strong></p>
        <p>${message}</p>
        <p>📅 Total study time: ${totalHours} hours over ${days} days</p>
    `;
    resultDiv.classList.add('show');
}

// Initialize GPA inputs on page load
document.addEventListener('DOMContentLoaded', function() {
    initGPAInputs();
    document.getElementById('numClasses').addEventListener('change', initGPAInputs);
});