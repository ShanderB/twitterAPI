const f = (month) => {

    switch (month.toLowerCase()) {
        case "jan":
            return "01"
        case "feb":
            return "02"
        case "mar":
            return "03"
        case "apr":
            return "04"
        case "may":
            return "05"
        case "jun":
            return "06"
        case "jul":
            return "07"
        case "aug":
            return "08"
        case "sep":
            return "09"
        case "oct":
            return "10"
        case "nov":
            return "11"
        case "dec":
            return "12"

        default: throw "Invalid Month - monthFormatter";
    }
}

module.exports = f;