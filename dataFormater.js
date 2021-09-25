    //Sat Sep 25 15:18:42 +0000 2021
function formatDate(data){

    var day = data.created_at.substring(8,10);
    var month = data[0].created_at.substring(4,7);
    var year = data[0].created_at.substring(26);
    var minutes = data[0].created_at.substring(14,16);
    var hour = data[0].created_at.substring(11,13);
}