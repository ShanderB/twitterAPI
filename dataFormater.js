const formatMonth = require('./monthFormatter.js');

const f = (data) => {

    var day = data.created_at.substring(8, 10);
    var month = formatMonth(data.created_at.substring(4, 7));
    var year = data.created_at.substring(26);
    var minutes = data.created_at.substring(14, 16);
    var hour = data.created_at.substring(11, 13);
    var seconds = data.created_at.substring(17, 19);

    return `${year}-${month}-${day}T${hour}:${minutes}:${seconds}`;
}

module.exports = f;