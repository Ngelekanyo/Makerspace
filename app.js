/* =========================================================
   MAKERSPACE*
   Frontend controller
   Phase 1
   ========================================================= */


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


/* =========================================================
   SHOW SECTION
   ========================================================= */

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


/* =========================================================
   HOME
   ========================================================= */

function showHome() {

    showSection("home");

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function toggleMenu() {

    const nav = document.getElementById("mainNav");

    nav.classList.toggle("open");

}


function closeMenu() {

    const nav = document.getElementById("mainNav");

    nav.classList.remove("open");

}


/* =========================================================
   SUCCESS
   ========================================================= */

function showSuccess(message) {

    document.getElementById(
        "successMessage"
    ).textContent = message;

    showSection("success");

}


/* =========================================================
   CHECK-IN
   ========================================================= */

document
    .getElementById("checkinForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


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


        /*
         * For now we only print the data.
         *
         * Google Apps Script will be connected
         * here in the next phase.
         */

        console.log(
            "CHECK-IN:",
            data
        );


        showSuccess(
            "You're checked in. Your visit has been recorded."
        );


        this.reset();

    });


/* =========================================================
   USAGE
   ========================================================= */

document
    .getElementById("usageForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


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
                    .value,

            timestamp:
                new Date().toISOString()

        };


        console.log(
            "USAGE:",
            data
        );


        showSuccess(
            "Usage recorded. Thanks for helping us understand the MakerSpace."
        );


        this.reset();

    });


/* =========================================================
   PROJECT DOCUMENTATION
   ========================================================= */

document
    .getElementById("projectForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


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


        console.log(
            "PROJECT:",
            data
        );


        showSuccess(
            "Project saved. Keep building."
        );


        this.reset();

    });


/* =========================================================
   INITIALISE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        showHome();

    }
);
