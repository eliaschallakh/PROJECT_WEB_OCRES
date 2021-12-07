const format = (Time) => {
    if (Time !== undefined) {
        const date = new Date(Time);
        console.log(date)
        // const date2
        // console.log(new Date())
        const time = date.toString().split(" ")[4];
        let hours = time.split(":")[0];
        const minutes = time.split(":")[1];
        let exactminutes = minutes.split(":")[0];
        const ampm = hours >= 12 ? "PM" : "AM";
        hours %= 12;
        hours = hours || 12; // the hour '0' should be '12'
        exactminutes = exactminutes < 10 ? exactminutes : exactminutes;
        const strTime = `${hours}:${exactminutes} ${ampm}`;
        return `${date.toString().split(" ")[0]} ${date.toString().split(" ")[1]} ${
            date.toString().split(" ")[2]
        } ${date.toString().split(" ")[3]} ${strTime}`;
    }
    return "--";
};
console.log(format('2021-11-28T15:00:00.000Z'))