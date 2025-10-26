export default class User {
    constructor({ email, password }) {
        if (!this.isEmailValid(email)) {
            throw new Error('Invalid email');
        }

        if (!this.isPasswordValid(password)) {
            throw new Error('Invalid password');
        }

        this.email = email;
        this.password = password;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    login() {
        return this.email.includes('devmentor.pl');
    }

    isEmailValid(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    isPasswordValid(password) {
        return typeof password === 'string' && password.length >= 6;
    }
}