export default class Payment {

    constructor(subject) {
        this.paymentSubject = subject;
    }

    creditCrad({ id, username, description }) {
        console.log(`\na payment occured from ${username}`)
        this.paymentSubject.notify({id,username});
    }


}