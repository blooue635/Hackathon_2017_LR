/**
 * Define ajax request
 *
 * @param  {String}     d       End of the URL
 * @param  {Number}     i       Position of chart (0, 1, 2 or 3)
 *
 * @return
 */
function ajaxRequest(d, i, callback) {
    jQuery.ajax({
        type: "POST",
        url: '../rest.php',
        data: {functionname: 'getOpenData', arguments: d},
        success:function(data) {
            // Parse data in Json
            var obj = JSON.parse(data);

            // TODO Get metadata
            // Temporal solution
            switch (d){
                case '&db=insee&table=population_2008&format=json':
                    $.getJSON( "../metaData/insee.json", function(metadata){
                        var dataToSend = {};
                        dataToSend["data"] = obj.opendata.answer.data;
                        dataToSend["i"] = i;
                        dataToSend["metadata"] = metadata;
                        dataToSend["linkMetadata"] = "../metaData/insee.json";
                        return callback(dataToSend);
                    });
                    break;
                case '&db=stationnement&table=disponibilite_parking&format=json':
                    $.getJSON( "../metaData/parking.json", function(metadata){
                        var dataToSend = {};
                        dataToSend["data"] = obj.opendata.answer.data;
                        dataToSend["i"] = i;
                        dataToSend["metadata"] = metadata;
                        dataToSend["linkMetadata"] = "../metaData/parking.json";
                        return callback(dataToSend);
                    });
                    break;
                case '&db=archive&table=fiche&format=json':
                    $.getJSON( "../metaData/archive.json", function(metadata){
                        var dataToSend = {};
                        dataToSend["data"] = obj.opendata.answer.data;
                        dataToSend["i"] = i;
                        dataToSend["metadata"] = metadata;
                        dataToSend["linkMetadata"] = "../metaData/archive.json";
                        return callback(dataToSend);
                    });
                    break;
                case '&db=budget&table=bp_2017_fonction&format=json':
                    $.getJSON( "../metaData/budget.json", function(metadata){
                        var dataToSend = {};
                        dataToSend["data"] = obj.opendata.answer.data;
                        dataToSend["i"] = i;
                        dataToSend["metadata"] = metadata;
                        dataToSend["linkMetadata"] = "../metaData/budget.json";
                        return callback(dataToSend);
                    });
                    break;
                case '&db=budget&table=bp_2016_fonction&format=json':
                    $.getJSON( "../metaData/budget2016.json", function(metadata){
                        var dataToSend = {};
                        dataToSend["data"] = obj.opendata.answer.data;
                        dataToSend["i"] = i;
                        dataToSend["metadata"] = metadata;
                        dataToSend["linkMetadata"] = "../metaData/budget2016.json";
                        return callback(dataToSend);
                    });
            }
        }
    });
}; 
