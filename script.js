// ========================================
// GLOBAL NEWS - SUPABASE
// ========================================

const SUPABASE_URL =
    "https://dcliuifevgyynbdmtjhk.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_vqUJWs3PUS7Qj4vYuleyFg_0c9DgsI_";


// ========================================
// CREATE SUPABASE CONNECTION
// ========================================

let supabaseClient = null;

if (typeof supabase !== "undefined") {
    supabaseClient = supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );
}


// ========================================
// SIGNUP
// ========================================

const signupForm =
    document.getElementById("signupForm");

if (signupForm && supabaseClient) {

    signupForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const name =
                document
                    .getElementById("signupName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("signupEmail")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("signupPassword")
                    .value;

            const confirmPassword =
                document
                    .getElementById("signupConfirm")
                    .value;


            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }


            const { data, error } =
                await supabaseClient.auth.signUp({

                    email: email,

                    password: password,

                    options: {
                        data: {
                            full_name: name
                        }
                    }

                });


            if (error) {
                alert("Signup Error: " + error.message);
                return;
            }


            alert("Account created successfully!");

            window.location.href = "login.html";
        }
    );
}


// ========================================
// LOGIN
// ========================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm && supabaseClient) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            const { data, error } =
                await supabaseClient.auth.signInWithPassword({

                    email: email,

                    password: password

                });


            if (error) {
                alert("Login Error: " + error.message);
                return;
            }


            alert("Login successful!");

            window.location.href = "index.html";
        }
    );
}

const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const forgotPasswordMessage = document.getElementById("forgotPasswordMessage");

if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", async function (event) {
        event.preventDefault();

        const emailInput = document.getElementById("loginEmail");
        const email = emailInput ? emailInput.value.trim() : "";

        if (!email) {
            forgotPasswordMessage.textContent = "Please enter your email first.";
            emailInput.focus();
            return;
        }

        if (typeof supabaseClient === "undefined" || !supabaseClient) {
            forgotPasswordMessage.textContent = "Supabase is not initialized. Please refresh the page.";
            return;
        }

        forgotPasswordLink.style.pointerEvents = "none";
        forgotPasswordMessage.textContent = "Sending recovery email...";

        try {
            const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
                redirectTo: "https://mzuhaibali-web.github.io/global-news/reset-password.html"
            });

            if (error) throw error;

            forgotPasswordMessage.textContent =
                "If the account exists, a recovery email has been requested. Check your inbox and spam folder.";
        } catch (error) {
            forgotPasswordMessage.textContent = "Error: " + error.message;
        } finally {
            forgotPasswordLink.style.pointerEvents = "";
        }
    });
}
