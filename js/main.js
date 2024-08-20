// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6b700gEgWT6sFRqJQpj_mO6R_JX35Lks",
    authDomain: "manajemen-laporan-ms.firebaseapp.com",
    projectId: "manajemen-laporan-ms",
    storageBucket: "manajemen-laporan-ms.appspot.com",
    messagingSenderId: "740598565130",
    appId: "1:740598565130:web:ec892cecf51577d7f792f3",
    measurementId: "G-VV9GQW9F7F"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Toggle Forms
function toggleForms() {
    document.getElementById('login-form').classList.toggle('d-none');
    document.getElementById('signup-form').classList.toggle('d-none');
}

function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = passwordInput.nextElementSibling.querySelector('i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Sign-Up
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            document.getElementById('popup-text').textContent = 'Sign-up successful! Please verify your email.';
            document.getElementById('popup-message').classList.remove('d-none');
            // Send Email Verification
            userCredential.user.sendEmailVerification();
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            if (!userCredential.user.emailVerified) {
                document.getElementById('popup-text').textContent = 'Please verify your email before logging in.';
                document.getElementById('popup-message').classList.remove('d-none');
            } else {
                alert('Login Successful!');
                // Redirect to dashboard or home page
            }
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Google Sign-In
function googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            alert('Google Sign-In Successful!');
            // Redirect to dashboard or home page
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Close Popup Function
function closePopup() {
    document.getElementById('popup-message').classList.add('d-none');
    document.getElementById('popup').classList.add('d-none');
}

// Fungsi untuk menampilkan pop-up
function showPopup(message) {
    const popup = document.getElementById('popup-message');
    const popupText = document.getElementById('popup-text');
    
    popupText.innerText = message;
    popup.classList.remove('d-none');
}

// Fungsi untuk menutup pop-up
function closePopup() {
    const popup = document.getElementById('popup-message');
    popup.classList.add('d-none');
}

// Menangani kesalahan Firebase dengan pesan yang ramah pengguna
function getFriendlyErrorMessage(errorCode) {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'Alamat email tidak valid.';
        case 'auth/user-disabled':
            return 'Akun ini dinonaktifkan.';
        case 'auth/user-not-found':
            return 'Pengguna tidak ditemukan.';
        case 'auth/wrong-password':
            return 'Kata sandi salah.';
        case 'auth/email-already-in-use':
            return 'Alamat email sudah digunakan.';
        case 'auth/weak-password':
            return 'Kata sandi terlalu lemah.';
        case 'auth/operation-not-allowed':
            return 'Operasi ini tidak diizinkan.';
        case 'auth/too-many-requests':
            return 'Terlalu banyak permintaan, coba lagi nanti.';
        case 'auth/requires-recent-login':
            return 'Silakan login kembali untuk melanjutkan.';
        default:
            return 'Terjadi kesalahan. Silakan coba lagi.';
    }
}

// Sign Up dengan Email dan Password
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            userCredential.user.sendEmailVerification().then(() => {
                showPopup('Pendaftaran berhasil! Silakan verifikasi email Anda sebelum melanjutkan.');
            });
        })
        .catch((error) => {
            const friendlyMessage = getFriendlyErrorMessage(error.code);
            showPopup(friendlyMessage);
        });
});

// Login dengan Email dan Password
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            if (userCredential.user.emailVerified) {
                window.location.href = 'app/form.html'; // Redirect ke halaman form
            } else {
                showPopup('Silakan verifikasi email Anda sebelum masuk.');
            }
        })
        .catch((error) => {
            const friendlyMessage = getFriendlyErrorMessage(error.code);
            showPopup(friendlyMessage);
        });
});

// Google Sign-In
function googleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            showPopup('Google login successful!');
            window.location.href = 'app/form.html'; // Redirect ke halaman form
        })
        .catch((error) => {
            const friendlyMessage = getFriendlyErrorMessage(error.code);
            showPopup(friendlyMessage);
        });
}

function forgotPassword() {
    var email = document.getElementById('loginEmail').value;
    if (email) {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                showPopup('Email untuk mereset password telah dikirim! Silahkan cek inbox!');
            })
            .catch((error) => {
                showPopup('Error: ' + error.message);
            });
    } else {
        showPopup('Masukkan email terlebih dahulu.');
    }
}

function showPopup(message) {
    document.getElementById('popup-text').textContent = message;
    document.getElementById('popup-message').classList.remove('d-none');
}

function closePopup() {
    document.getElementById('popup-message').classList.add('d-none');
}

function showQRCode() {
    var qrCodeContainer = document.getElementById('qrCodeContainer');
    qrCodeContainer.classList.toggle('d-none');
}
