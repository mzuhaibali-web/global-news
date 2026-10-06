// ========================================
// GLOBAL NEWS - SUPABASE
// ========================================

// Supabase Project URL
const SUPABASE_URL =
    "https://dcliuifevgyynbdmtjhk.supabase.co";


// ========================================
// SUPABASE PUBLISHABLE KEY
// ========================================

// YAHAN apni Supabase Publishable Key paste karo
const SUPABASE_KEY =
    "sb_publishable_vqUJWs3PUS7Qj4vYuleyFg_0c9DgsI_";

// ========================================
// CREATE SUPABASE CONNECTION
// ========================================

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ========================================
// SIGNUP
// ========================================

const signupForm =
    document.getElementById("signupForm");


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // Get Name
            const name =
                document.getElementById("signupName").value.trim();


            // Get Email
            const email =
                document.getElementById("signupEmail").value.trim();


            // Get Password
            const password =
                document.getElementById("signupPassword").value;


            // Get Confirm Password
            const confirmPassword =
                document.getElementById("signupConfirm").value;


            // Check Password
            if (password !== confirmPassword) {

                alert("Passwords do not match!");

                return;
            }


            // Signup
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


            // Check Error
            if (error) {

                alert(
                    "Signup Error: " +
                    error.message
                );

                return;
            }


            // Success
            alert(
                "Account created successfully!"
            );


            // Go to Login
            window.location.href =
                "login.html";

        }
    );

}


// ========================================
// LOGIN
// ========================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // Get Email
            const email =
                document.getElementById("loginEmail").value.trim();


            // Get Password
            const password =
                document.getElementById("loginPassword").value;


            // Login
            const { data, error } =
                await supabaseClient.auth.signInWithPassword({

                    email: email,

                    password: password

                });


            // Check Error
            if (error) {

                alert(
                    "Login Error: " +
                    error.message
                );

                return;
            }


            // Success
            alert(
                "Login successful!"
            );


            // Go Home
            window.location.href =
                "index.html";

        }
    );

}
