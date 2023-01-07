class MyOwnPromise {
    constructor(executeFunction) {
        this.handleError = () => { };
        this.handleSuccess = () => { };

        this.onResolve = this.onResolve.bind(this);
        this.onReject = this.onReject.bind(this);
        executeFunction(this.onResolve, this.onReject);
    }

    then(handleSuccess) {
        this.handleSuccess = handleSuccess;
        return this;
    }

    catch(handleError) {
        this.handleError = handleError;
        return this;
    }

    onResolve(value) {
        this.handleSuccess(value);
    }

    onReject(error) {
        this.handleError(error);
    }
}


function getNumber() {
    return new MyOwnPromise((resolve, reject) => {
        setTimeout(() => {
            let number = Math.floor(Math.random() * 1001);
            if (number % 5 === 0) {
                reject(number);
            } else {
                resolve(number);
            }
        }, 100);
    });
}

getNumber().then((value) => {
    console.log(` resolved: ${value}`);
}).catch((error) => {
    console.log(` rejected: ${error}`);
});
