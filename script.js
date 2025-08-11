document.addEventListener('DOMContentLoaded', function() {
// Tab functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
button.addEventListener('click', () => {
// Remove active class from all buttons and contents
tabButtons.forEach(btn => btn.classList.remove('active'));
tabContents.forEach(content => content.classList.remove('active'));

// Add active class to clicked button and corresponding content
button.classList.add('active');
const tabId = button.getAttribute('data-tab');
document.getElementById(tabId).classList.add('active');
});
});

// GPA Calculator functionality
const gpaCourseInputs = document.querySelector('#gpa .course-inputs');
const gpaAddBtn = document.querySelector('#gpa .add-btn');

// Add course row
function addCourseRow() {
const courseRow = document.createElement('div');
courseRow.className = 'course-row';
courseRow.innerHTML = `
<input type="text" class="course-code" placeholder="Course Code">
<select class="grade">
<option value="">Select Grade</option>
<option value="5">A (5)</option>
<option value="4">B (4)</option>
<option value="3">C (3)</option>
<option value="2">D (2)</option>
<option value="1">E (1)</option>
<option value="0">F (0)</option>
</select>
<input type="number" class="credit" placeholder="Credit Unit" min="1" max="10">
<button class="remove-btn"><i class="fas fa-times"></i></button>
`;
gpaCourseInputs.appendChild(courseRow);

// Add event listener to remove button
const removeBtn = courseRow.querySelector('.remove-btn');
removeBtn.addEventListener('click', () => {
courseRow.remove();
});
}

gpaAddBtn.addEventListener('click', addCourseRow);

// Calculate GPA
const gpaCalculateBtn = document.querySelector('#gpa .calculate-btn');

gpaCalculateBtn.addEventListener('click', () => {
const courseRows = document.querySelectorAll('#gpa .course-row');
let totalGradePoints = 0;
let totalCredits = 0;
let hasError = false;

courseRows.forEach(row => {
const gradeSelect = row.querySelector('.grade');
const creditInput = row.querySelector('.credit');

if (!gradeSelect.value || !creditInput.value) {
hasError = true;
if (!gradeSelect.value) {
gradeSelect.style.borderColor = 'var(--error-color)';
} else {
gradeSelect.style.borderColor = 'var(--border-color)';
}

if (!creditInput.value) {
creditInput.style.borderColor = 'var(--error-color)';
} else {
creditInput.style.borderColor = 'var(--border-color)';
}
} else {
gradeSelect.style.borderColor = 'var(--border-color)';
creditInput.style.borderColor = 'var(--border-color)';

const gradePoint = parseFloat(gradeSelect.value);
const credit = parseFloat(creditInput.value);

totalGradePoints += gradePoint * credit;
totalCredits += credit;
}
});

if (hasError) {
alert('Please fill in all grade and credit fields');
return;
}

if (totalCredits === 0) {
alert('Please add at least one course');
return;
}

const gpa = totalGradePoints / totalCredits;
document.getElementById('gpa-result').textContent = gpa.toFixed(2);
document.getElementById('total-credits').textContent = totalCredits;
});

// CGPA Calculator functionality
const cgpaSemesterInputs = document.querySelector('#cgpa .semester-inputs');
const cgpaAddBtn = document.querySelector('#cgpa .add-btn');

// Add semester row
function addSemesterRow() {
const semesterRow = document.createElement('div');
semesterRow.className = 'semester-row';
semesterRow.innerHTML = `
<input type="text" class="semester-name" placeholder="Semester Name">
<input type="number" class="semester-gpa" placeholder="GPA" step="0.01" min="0" max="5">
<input type="number" class="semester-credits" placeholder="Total Credits" min="1">
<button class="remove-btn"><i class="fas fa-times"></i></button>
`;
cgpaSemesterInputs.appendChild(semesterRow);

// Add event listener to remove button
const removeBtn = semesterRow.querySelector('.remove-btn');
removeBtn.addEventListener('click', () => {
semesterRow.remove();
});
}

cgpaAddBtn.addEventListener('click', addSemesterRow);

// Calculate CGPA
const cgpaCalculateBtn = document.querySelector('#cgpa .calculate-btn');

cgpaCalculateBtn.addEventListener('click', () => {
const semesterRows = document.querySelectorAll('#cgpa .semester-row');
let totalQualityPoints = 0;
let totalCumulativeCredits = 0;
let hasError = false;

semesterRows.forEach(row => {
const semesterName = row.querySelector('.semester-name');
const semesterGpa = row.querySelector('.semester-gpa');
const semesterCredits = row.querySelector('.semester-credits');

if (!semesterName.value || !semesterGpa.value || !semesterCredits.value) {
hasError = true;
if (!semesterName.value) {
semesterName.style.borderColor = 'var(--error-color)';
} else {
semesterName.style.borderColor = 'var(--border-color)';
}

if (!semesterGpa.value) {
semesterGpa.style.borderColor = 'var(--error-color)';
} else {
semesterGpa.style.borderColor = 'var(--border-color)';
}

if (!semesterCredits.value) {
semesterCredits.style.borderColor = 'var(--error-color)';
} else {
semesterCredits.style.borderColor = 'var(--border-color)';
}
} else {
semesterName.style.borderColor = 'var(--border-color)';
semesterGpa.style.borderColor = 'var(--border-color)';
semesterCredits.style.borderColor = 'var(--border-color)';

const gpa = parseFloat(semesterGpa.value);
const credits = parseFloat(semesterCredits.value);

if (gpa < 0 || gpa > 5) {
hasError = true;
semesterGpa.style.borderColor = 'var(--error-color)';
return;
}

totalQualityPoints += gpa * credits;
totalCumulativeCredits += credits;
}
});

if (hasError) {
alert('Please fill in all semester fields with valid values (GPA must be between 0 and 5)');
return;
}

if (totalCumulativeCredits === 0) {
alert('Please add at least one semester');
return;
}

const cgpa = totalQualityPoints / totalCumulativeCredits;
document.getElementById('cgpa-result').textContent = cgpa.toFixed(2);
document.getElementById('cumulative-credits').textContent = totalCumulativeCredits;
});

// Add initial rows
addCourseRow();
addSemesterRow();
});
