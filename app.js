/*
 * MakerSpace OS
 * Phase 1
 *
 * Frontend application logic.
 *
 * Google Apps Script backend
 */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbx8XpixqbZYjwBQjkuxG9gWSwGkiQ5d_DMY33WPIJwty4RrcQE4a6DzhuDw9QK1Xs2y/exec";


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

        const hero = document.querySelector(".hero");
        const actions = document.querySelector(".actions");

        if (hero) {
            hero.classList.remove("hidden");
        }

        if (actions) {
            actions.classList.remove("hidden");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        return;
    }


    const hero = document.querySelector(".hero");
    const actions = document.querySelector(".actions");

    if (hero) {
        hero.classList.add("hidden");
    }

    if (actions) {
        actions.classList.add("hidden");
    }


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

    console.log(
        "Sending to MakerSpace backend:",
        data
    );


    if (
        !GOOGLE_SCRIPT_URL ||
        GOOGLE_SCRIPT_URL === "PASTE_YOUR_WEB_APP_URL_HERE"
    ) {

        console.error(
            "Google Apps Script URL has not been configured."
        );

        showSuccess(
            "Demo Mode",
            "The backend has not been connected yet."
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


        showSuccess(
            "Saved!",
            getSuccessMessage(data.type)
        );


        return true;

    }

    catch (error) {

        console.error(
            "MakerSpace backend error:",
            error
        );


        showSuccess(
            "Something went wrong",
            "Your information could not be submitted. Please try again."
        );


        return false;
    }
}


// ============================================
// SUCCESS MESSAGES
// ============================================

function getSuccessMessage(type) {

    switch (type) {

        case "checkin":

            return "You're checked in. Your visit has been recorded.";


        case "usage":

            return "Your usage record has been saved.";


        case "project":

            return "Your project has been documented.";


        default:

            return "Your information has been recorded.";
    }
}


// ============================================
// SUCCESS SCREEN
// ============================================

function showSuccess(title, message) {

    const titleElement =
        document.getElementById("successTitle");

    const messageElement =
        document.getElementById("successMessage");


    if (titleElement) {

        titleElement.textContent = title;
    }


    if (messageElement) {

        messageElement.textContent = message;
    }


    showPage("success");
}


// ============================================
// CHECK-IN FORM
// ============================================

const checkinForm =
    document.getElementById("checkinForm");


if (checkinForm) {

    checkinForm.addEventListener(
        "submit",
        async function(event) {

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


            const success =
                await sendData(data);


            if (success) {

                this.reset();
            }

        }
    );
}


// ============================================
// USAGE FORM
// ============================================

const usageForm =
    document.getElementById("usageForm");


if (usageForm) {

    usageForm.addEventListener(
        "submit",
        async function(event) {

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


            const success =
                await sendData(data);


            if (success) {

                this.reset();
            }

        }
    );
}


// ============================================
// PROJECT FORM
// ============================================

const projectForm =
    document.getElementById("projectForm");


if (projectForm) {

    projectForm.addEventListener(
        "submit",
        async function(event) {

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


            const success =
                await sendData(data);


            if (success) {

                this.reset();
            }

        }
    );
}
