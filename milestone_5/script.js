var _a;
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a, _b;
    event.preventDefault();
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var educationElement = document.getElementById('education');
    var experienceElement = document.getElementById('experience');
    var skillsElement = document.getElementById('skills');
    var profilePictureElement = document.getElementById('profilePicture');
    if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var skills = skillsElement.value;
        var profilePictureURL = '';
        if (profilePictureElement && profilePictureElement.files && profilePictureElement.files[0]) {
            var file = profilePictureElement.files[0];
            profilePictureURL = URL.createObjectURL(file);
        }
        var resumeOutput = "\n        <h2>RESUME</h2>\n        <img src=\"".concat(profilePictureURL, "\" id=\"edit-profilePicture\" class=\"editable\" alt=\"Profile Picture\" style=\"width:100px;height:100px;\"><br>\n        <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">").concat(name_1, "</span></p>\n        <p><strong>Email:</strong><span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n        <p><strong>Phone number:</strong><span id=\"edit-phone\" class=\"editable\">").concat(phone, "</span></p>\n\n        <h3>Education</h3>\n        <p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n        \n        <h3>Experience</h3>\n        <p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n\n        <h3>Skills</h3>\n        <p id=\"edit-skills\" class=\"editable\">").concat(skills, "</p>\n        \n        <button id=\"downloadBtn\"style=\"margin-right: 10px; margin-top: 10px;\">Download as PDF</button>\n        <button id=\"shareBtn\"style=\"margin-top: 10px;\">Copy Shareable Link</button>\n        ");
        var resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            markeEditable();
        }
        // Add functionality to download resume as PDF
        (_a = document.getElementById('downloadBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            var element = document.getElementById('resumeOutput');
            if (element) {
                html2pdf().from(element).save('2024_Resume.pdf');
            }
        });
        // Add functionality to copy the shareable link
        (_b = document.getElementById('shareBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
            var _a;
            var shareableText = (_a = document.getElementById('resumeOutput')) === null || _a === void 0 ? void 0 : _a.innerText;
            if (shareableText) {
                navigator.clipboard.writeText(shareableText).then(function () {
                    alert('Shareable link copied to clipboard!');
                });
            }
        });
    }
    else {
        console.log('One or more elements are missing');
    }
});
function markeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a, _b;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                var input_1 = document.createElement('input');
                input_1.type = 'text';
                input_1.value = currentValue;
                input_1.classList.add('editing-input');
                currentElement.style.display = 'none';
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
                input_1.addEventListener('blur', function () {
                    currentElement.textContent = input_1.value;
                    input_1.remove();
                    currentElement.style.display = 'block';
                });
            }
            else if (currentElement.tagName === "IMG") {
                var inputFile_1 = document.createElement('input');
                inputFile_1.type = 'file';
                inputFile_1.accept = 'image/*';
                inputFile_1.classList.add('editing-input');
                currentElement.style.display = 'none';
                (_b = currentElement.parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(inputFile_1, currentElement);
                inputFile_1.addEventListener('change', function () {
                    var file = inputFile_1.files ? inputFile_1.files[0] : null;
                    if (file) {
                        var newProfilePictureURL = URL.createObjectURL(file);
                        currentElement.src = newProfilePictureURL;
                        inputFile_1.remove();
                        currentElement.style.display = 'block';
                    }
                });
                inputFile_1.focus();
            }
        });
    });
}
