
$(document).ready(function(){

	/**
	 * Init
	 *
	 * @return
	 */
	function init() {

		/* ====== Initialization ====== */

		$(".boxVisu").children("h4").hide();
		
		var resource = window.location.href.split('resource=');
		res = resource[1].split('#');
		
		if(res[0]) {
			// Draw visualization
			getData(res[0], 0, true, false);
		}
	

	   	/* ========== EVENT ========== */

		// Accordion
		$('.accordion-toggle').on('click', function() {
			$(this).closest('.panel-group').children().each(function() {
				$(this).find('>.panel-heading').removeClass('active');
			});
			$(this).closest('.panel-heading').toggleClass('active');
		});
		
		// Change information to show
		$(".checkData").on("click",function() {

			// Destroy canvas
			var canvas = document.getElementById('myChart0');
			var context = canvas.getContext('2d');
			canvas.remove();

			// Create new canvas
			var newCanvas = document.createElement("canvas");
			newCanvas.id = 'myChart0';
			newCanvas.class = 'chart';
			newCanvas.height = 2000;
			newCanvas.width = 1600;

			// Append canvas to document
			div = document.getElementById('seeMoreChart0');
			div.appendChild(newCanvas);

			// Call getData methode to draw visualisation
			var nameData = $(this).attr("id");

			// Change title
			if(nameData == "disponibilite_parking") {
		    	$("#titleVisualisation").html("Visualisation - Parkings - Places disponibles");
		    } else if (nameData == "archive_fiche") {
		    	$("#titleVisualisation").html("Visualisation - Archives");
		    } else if (nameData == "bp_2017_fonction") {
		    	$("#titleVisualisation").html("Visualisation - Budget prévisionnel - 2017 fonction");
		    } else if (nameData == "population_2008") {
		    	$("#titleVisualisation").html("Visualisation - Population 2008");
		    } else if (nameData == "bp_2016_fonction") {
                $("#titleVisualisation").html("Visualisation - Budget prévisionnel - 2016 fonction");
			}

			getData(nameData, 0, true, false);
		});

        $("#validate_compare").on('click', function(){
        	$('#chart0_compare').remove();
        	$('#chart1_compare').remove();

        	$('#seeMoreChartCompare').append('<canvas id="chart0_compare" height="5000" width="600" style="display:inline-block;"></canvas>');
        	$('#seeMoreChartCompare').append('<canvas id="chart1_compare" height="5000" width="600" style="display:inline-block;margin-left:50px;"></canvas>');

            // Call getData methode to draw visualisation
            var nameData = $('#select_compare_1').val();
            var nameDataCompare = $('#select_compare_2').val();

            $("#titleVisualisation").html("Visualisation - Comparaison - "+nameData+" - "+nameDataCompare);

            getData(nameData, 0, false, true);
            getData(nameDataCompare, 1, false, true);
		});
	};

	/**
	 * Get datas from opendata la rochelle plateform
	 *
	 * @return
	 */
 	function getData(nameData, position, height, compare) {
	 	
		if(nameData !== null) {
			var resource = nameData;
		} else {
			// Get url datas
			var resource = window.location.href.split('resource=');
			res = resource[1].split('#');
			resource = res[0];
		}
	   	if(resource == "disponibilite_parking") {
	    	BddLink = '&db=stationnement&table=disponibilite_parking&format=json';

	    } else if (resource == "population_2008") {
	    	BddLink = '&db=insee&table=population_2008&format=json';

	    } else if (resource == "archive_fiche") {
	    	BddLink = '&db=archive&table=fiche&format=json';

	    } else if (resource == "bp_2017_fonction") {
	    	BddLink = '&db=budget&table=bp_2017_fonction&format=json';

	    } else if (resource == "bp_2016_fonction") {
        	BddLink = '&db=budget&table=bp_2016_fonction&format=json';
		}

	    ajaxRequest(BddLink, position, function(data){
    		_drawVisu(data, position, height, compare);
			_enablePanel(data.metadata.dataType);
    	});

    	return;
	};

	/**
	 * Draw visualisation
	 *
	 * @param  {Object}     data       Data from opendata la rochelle plateform
	 *
	 * @return
	 */
	function _drawVisu(data, position, height, compare) {

		// Initialization options
	    var opts = {};
	    opts["legend"] = true;
        opts["link"] = false;
        opts["height"] = height;
        opts["compare"] = compare;


        // Graph type
        var graph = data.metadata.graph.possibleGraphs[0];

		// Draw a visualization
        drawGraph(data.data, graph, position, data.metadata, position, data.linkMetadata, opts);
        if (!compare) {
            drawTable(data.data, data.metadata, data.linkMetadata, position + 1);
            //drawMap(obj.opendata.answer.data, 3, metadata, MetadataLink);
        }
        //Info
        //Download link

        return;
	};

	/**
	 * Enable panels
	 *
	 * @param  {String}     datatype       Possible data type : HistorisedNotLocalisable, NotHistorisedLocalisable, NotHistorisedNotLocalisable, HistorisedLocalisable 
	 *
	 * @return
	 */
	function _enablePanel(datatype) {
		if(datatype == "HistorisedNotLocalisable"){
			$('#tab3').hide();
			$('#tab1').show();
			$('#tab2').show();
			// $('timeline').show();
		}
		else if(datatype == "NotHistorisedLocalisable"){
			// $('timeline').hide();
			$('#tab1').show();
			$('#tab2').show();
			$('#tab3').show();
            //hehe
		}
		else if(datatype == "NotHistorisedNotLocalisable"){
			$('#tab3').hide();
			// $('timeline').hide();
			$('#tab1').show();
			$('#tab2').show();
		}
		else if(datatype == "HistorisedLocalisable"){
			$('#tab1').show();
			$('#tab2').show();
			$('#tab3').show();
			// $('timeline').show();
		}
		else{
			$('#tab1').hide();
			$('#tab2').hide();
			$('#tab3').hide();
			// $('timeline').hide();
		}
	};
    
    function openNav() {
        document.getElementById("accordion1").style.width = "250px";
    }

    function closeNav() {
        document.getElementById("accordion1").style.width = "0";
    }

    init();
});
