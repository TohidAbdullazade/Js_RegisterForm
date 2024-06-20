function getName() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let data = "Rahib";
            if (data) {
                resolve(data);
            } else {
                reject("Name is undefined")
            }
        }, 1000);
    });
}

function getSurname() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let data = "Rzayev";
            if (data) {
                resolve(data);
            } else {
                reject("Surname is undefined")
            }
        }, 2000);
    });
}

Promise.all([getName(), getSurname()])
    .then((res) => {
        if (res) {
            console.log(res[0]);
            console.log(res[1]);
        } else {
            throw new Error("Error with data fetching ");
        }
    })
    .catch((err) => {
        console.log(err);
    });
