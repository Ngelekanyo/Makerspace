/*
 * MakerSpace OS
 * Phase 1
 *
 * Frontend application logic.
 *
 * IMPORTANT:
 * Replace GOOGLE_SCRIPT_URL with your deployed
 * Google Apps Script Web App URL.
 */


const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";


// ============================================
// PAGE NAVIGATION
// ============================================

function showPage(page) {

    const pages = [
        "checkin",
        "usage",
        "project",
        "success"
    ];

    pages.forEach(id => {
        const element = document.getElementById(id);

        if (element) {
            element.classList.add("hidden");
        }
    });


    if (page === "home") {

        document.querySelector(".hero").classList.remove("hidden");

        document.querySelector(".actions").classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        return;
    }


    document.querySelector(".hero").classList.add("hidden");

    document.querySelector(".actions").classList.add("hidden");


    const selectedPage = document.getElementById(page);

    if (selectedPage) {
        selectedPage.classList.remove("hidden");
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ============================================
// SEND DATA TO GOOGLE APPS SCRIPT
// ============================================

async function sendData(data) {

    /*
     * During development, you can use the
     * console to check exactly what is being sent.
     */

    console.log("Sending data:", data);


    if (GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {

        console.warn(
            "Google Apps Script URL has not been configured."
        );

        showSuccess(
            "Demo Saved",
            "The form works, but the Google backend has not been connected yet."
        );

        return;
    }


    try {

        await fetch(GOOGLE_SCRIPT_URL, {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },

            body: JSON.stringify(data)

        });


        showSuccess(
            "Saved!",
            "Your information has been recorded successfully."
        );

    }

    catch (error) {

        console.error("Error:", error);

        alert(
            "Something went wrong while saving your information. Please try again."
        );
    }
}


// ============================================
// SUCCESS MESSAGE
// ============================================

function showSuccess(title, message) {

    document.getElementById("successTitle").textContent = title;

    document.getElementById("successMessage").textContent = message;

    showPage("success");
}


// ============================================
// CHECK-IN FORM
// ============================================

document
    .getElementById("checkinForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const data = {

            type: "checkin",

            name:
                document.getElementById("checkinName").value.trim(),

            studentNumber:
                document
                    .getElementById("checkinStudentNumber")
                    .value.trim(),

            activity:
                document.getElementById("checkinActivity").value,

            note:
                document
                    .getElementById("checkinNote")
                    .value.trim(),

            timestamp:
                new Date().toISOString()

        };


        sendData(data);

        this.reset();

    });


// ============================================
// USAGE FORM
// ============================================

document
    .getElementById("usageForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const data = {

            type: "usage",

            name:
                document.getElementById("usageName").value.trim(),

            studentNumber:
                document
                    .getElementById("usageStudentNumber")
                    .value.trim(),

            equipment:
                document.getElementById("usageEquipment").value,

            description:
                document
                    .getElementById("usageDescription")
                    .value.trim(),

            duration:
                document.getElementById("usageDuration").value,

            timestamp:
                new Date().toISOString()

        };


        sendData(data);

        this.reset();

    });


// ============================================
// PROJECT FORM
// ============================================

document
    .getElementById("projectForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const data = {

            type: "project",

            projectName:
                document
                    .getElementById("projectName")
                    .value.trim(),

            student:
                document
                    .getElementById("projectStudent")
                    .value.trim(),

            category:
                document.getElementById("projectCategory").value,

            objective:
                document
                    .getElementById("projectObjective")
                    .value.trim(),

            work:
                document
                    .getElementById("projectWork")
                    .value.trim(),

            problems:
                document
                    .getElementById("projectProblems")
                    .value.trim(),

            lessons:
                document
                    .getElementById("projectLessons")
                    .value.trim(),

            nextSteps:
                document
                    .getElementById("projectNextSteps")
                    .value.trim(),

            timestamp:
                new Date().toISOString()

        };


        sendData(data);

        this.reset();

    });
