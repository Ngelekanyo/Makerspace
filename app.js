const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbx8XpixqbZYjwBQjkuxG9gWSwGkiQ5d_DMY33WPIJwty4RrcQE4a6DzhuDw9QK1Xs2y/exec";

/* =========================================================
PAGE NAVIGATION
========================================================= */

const pages = [
"home",
"checkin",
"usage",
"project",
"about",
"projects",
"success"
];

function hideAllPages() {

pages.forEach(function (pageID) {

    const page = document.getElementById(pageID);

    if (page) {
        page.classList.remove("active");
    }

});

}

function showSection(sectionID) {

hideAllPages();

const section = document.getElementById(sectionID);

if (section) {
    section.classList.add("active");
}

closeMenu();

window.scrollTo({
    top: 0,
    behavior: "smooth"
});

}

function showHome() {
showSection("home");
}

/* =========================================================
MOBILE MENU
========================================================= */

function toggleMenu() {

const nav = document.getElementById("mainNav");

if (nav) {
    nav.classList.toggle("open");
}

}

function closeMenu() {

const nav = document.getElementById("mainNav");

if (nav) {
    nav.classList.remove("open");
}

}

/* =========================================================
SUCCESS
========================================================= */

function showSuccess(message) {

const messageElement =
    document.getElementById("successMessage");

if (messageElement) {
    messageElement.textContent = message;
}

showSection("success");

}

/* =========================================================
SUBMIT BUTTON FEEDBACK
========================================================= */

function setButtonLoading(button, text) {

if (!button) return;

button.disabled = true;
button.dataset.originalText = button.innerHTML;

button.innerHTML = text;

button.classList.add("is-loading");

}

function restoreButton(button) {

if (!button) return;

button.disabled = false;

if (button.dataset.originalText) {
    button.innerHTML = button.dataset.originalText;
}

button.classList.remove("is-loading");

}

/* =========================================================
SEND DATA TO GOOGLE APPS SCRIPT
========================================================= */

async function sendData(data) {

console.log(
    "Sending to MakerSpace backend:",
    data
);


if (
    !GOOGLE_SCRIPT_URL ||
    GOOGLE_SCRIPT_URL ===
    "PASTE_YOUR_WEB_APP_URL_HERE"
) {

    console.error(
        "Google Apps Script URL has not been configured."
    );

    return false;

}


try {

    await fetch(
        GOOGLE_SCRIPT_URL,
        {
            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type":
                    "text/plain;charset=utf-8"
            },

            body: JSON.stringify(data)
        }
    );


    console.log(
        "Data sent to MakerSpace backend."
    );


    return true;

}


catch (error) {

    console.error(
        "MakerSpace backend error:",
        error
    );

    return false;

}

}

/* =========================================================
CHECK-IN
========================================================= */

const checkinForm =
document.getElementById("checkinForm");

if (checkinForm) {

checkinForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const button =
            this.querySelector(".submit-button");


        const data = {

            type: "checkin",

            name:
                document
                    .getElementById("checkinName")
                    .value
                    .trim(),

            studentNumber:
                document
                    .getElementById("checkinStudentNumber")
                    .value
                    .trim(),

            activity:
                document
                    .getElementById("checkinActivity")
                    .value,

            note:
                document
                    .getElementById("checkinNote")
                    .value
                    .trim(),

            timestamp:
                new Date().toISOString()

        };


        setButtonLoading(
            button,
            "CHECKING IN..."
        );


        const success =
            await sendData(data);


        if (success) {

            this.reset();

            showSuccess(
                "You're checked in. Your visit has been recorded."
            );

        }

        else {

            restoreButton(button);

            alert(
                "Something went wrong while checking you in. Please try again."
            );

        }

    }
);

}

/* =========================================================
USAGE
========================================================= */

const usageForm =
document.getElementById("usageForm");

if (usageForm) {

usageForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const button =
            this.querySelector(".submit-button");


        const data = {

            type: "usage",

            name:
                document
                    .getElementById("usageName")
                    .value
                    .trim(),

            studentNumber:
                document
                    .getElementById("usageStudentNumber")
                    .value
                    .trim(),

            equipment:
                document
                    .getElementById("usageEquipment")
                    .value,

            description:
                document
                    .getElementById("usageDescription")
                    .value
                    .trim(),

            duration:
                document
                    .getElementById("usageDuration")
                    .value
                    .trim(),

            timestamp:
                new Date().toISOString()

        };


        setButtonLoading(
            button,
            "LOGGING USAGE..."
        );


        const success =
            await sendData(data);


        if (success) {

            this.reset();

            showSuccess(
                "Usage recorded. Thanks for helping us understand the MakerSpace."
            );

        }

        else {

            restoreButton(button);

            alert(
                "Something went wrong while logging usage. Please try again."
            );

        }

    }
);

}

/* =========================================================
PROJECT DOCUMENTATION
========================================================= */

const projectForm =
document.getElementById("projectForm");

if (projectForm) {

projectForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const button =
            this.querySelector(".submit-button");


        const data = {

            type: "project",

            projectName:
                document
                    .getElementById("projectName")
                    .value
                    .trim(),

            student:
                document
                    .getElementById("projectStudent")
                    .value
                    .trim(),

            category:
                document
                    .getElementById("projectCategory")
                    .value,

            objective:
                document
                    .getElementById("projectObjective")
                    .value
                    .trim(),

            work:
                document
                    .getElementById("projectWork")
                    .value
                    .trim(),

            problems:
                document
                    .getElementById("projectProblems")
                    .value
                    .trim(),

            lessons:
                document
                    .getElementById("projectLessons")
                    .value
                    .trim(),

            nextSteps:
                document
                    .getElementById("projectNextSteps")
                    .value
                    .trim(),

            timestamp:
                new Date().toISOString()

        };


        setButtonLoading(
            button,
            "SAVING PROJECT..."
        );


        const success =
            await sendData(data);


        if (success) {

            this.reset();

            showSuccess(
                "Project saved. Keep building."
            );

        }

        else {

            restoreButton(button);

            alert(
                "Something went wrong while saving your project. Please try again."
            );

        }

    }
);

}

/* =========================================================
INITIALISE
========================================================= */

document.addEventListener(
"DOMContentLoaded",
function () {

    showHome();

}

);
