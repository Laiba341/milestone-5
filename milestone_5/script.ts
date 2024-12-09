document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;
    const profilePictureElement = document.getElementById('profilePicture') as HTMLInputElement;

    if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;

        let profilePictureURL = '';
        if (profilePictureElement && profilePictureElement.files && profilePictureElement.files[0]) {
            const file = profilePictureElement.files[0];
            profilePictureURL = URL.createObjectURL(file);
        }

        const resumeOutput = `
        <h2>RESUME</h2>
        <img src="${profilePictureURL}" id="edit-profilePicture" class="editable" alt="Profile Picture" style="width:100px;height:100px;"><br>
        <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
        <p><strong>Email:</strong><span id="edit-email" class="editable">${email}</span></p>
        <p><strong>Phone number:</strong><span id="edit-phone" class="editable">${phone}</span></p>

        <h3>Education</h3>
        <p id="edit-education" class="editable">${education}</p>
        
        <h3>Experience</h3>
        <p id="edit-experience" class="editable">${experience}</p>

        <h3>Skills</h3>
        <p id="edit-skills" class="editable">${skills}</p>
        
        <button id="downloadBtn"style="margin-right: 10px; margin-top: 10px;">Download as PDF</button>
        <button id="shareBtn"style="margin-top: 10px;">Copy Shareable Link</button>
        `;

        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            markeEditable();
        }

        // Add functionality to download resume as PDF
        document.getElementById('downloadBtn')?.addEventListener('click', function() {
            const element = document.getElementById('resumeOutput');
            if (element) {
                html2pdf().from(element).save('2024_Resume.pdf');
            }
        });

        // Add functionality to copy the shareable link
        document.getElementById('shareBtn')?.addEventListener('click', function() {
            const shareableText = document.getElementById('resumeOutput')?.innerText;
            if (shareableText) {
                navigator.clipboard.writeText(shareableText).then(() => {
                    alert('Shareable link copied to clipboard!');
                });
            }
        });
    } else {
        console.log('One or more elements are missing');
    }
});

function markeditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach((element) => {
        element.addEventListener('click', function() {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('editing-input');

                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();

                input.addEventListener('blur', function() {
                    currentElement.textContent = input.value;
                    input.remove();
                    currentElement.style.display = 'block';
                });
            } else if (currentElement.tagName === "IMG") {
                const inputFile = document.createElement('input');
                inputFile.type = 'file';
                inputFile.accept = 'image/*';
                inputFile.classList.add('editing-input');

                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(inputFile, currentElement);

                inputFile.addEventListener('change', function() {
                    const file = inputFile.files ? inputFile.files[0] : null;
                    if (file) {
                        const newProfilePictureURL = URL.createObjectURL(file);
                        (currentElement as HTMLImageElement).src = newProfilePictureURL;
                        inputFile.remove();
                        currentElement.style.display = 'block';
                    }
                });
                inputFile.focus();
            }
        });
    });
}
