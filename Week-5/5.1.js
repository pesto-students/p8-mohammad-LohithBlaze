function doTask1() {
    return new Promise((resolve, reject) => {
        i = 0;
        for (let i = 0; i < 100000; i++) {
            let temp = Math.floor(Math.random() * 100000);
            if (temp % 5 === 0) {
                resolve(temp);
            }
        }
    });
}

function doTask2() {
    return new Promise((resolve, reject) => {
        throw new Error("rejecting this as I dont feel good!...");
    });
}

function doTask3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(10);
        }, 3000);
    })
}

async function* generator_function() {
    yield await doTask1();
    yield await doTask2();
    yield await doTask3();
}


let asyncGen = generator_function();

asyncGen.next().then((res) => console.log(res), (error) => console.log(error));
asyncGen.next().then((res) => console.log(res), (error) => console.log(error));
asyncGen.next().then((res) => console.log(res), (error) => console.log(error));
