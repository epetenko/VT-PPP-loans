var jqueryNoConflict = jQuery;

var pymChild = null;

// begin main function
jqueryNoConflict(document).ready(function(){




    // Change google spreadsheet link here

   // We're using a json to load because Google Sheets was being a little slow
    $.ajax({
  url: "data/VT_PPP_loans.json",
}).done(function(data) {

    writeTableWith(data)

});

});





var width = $('body').width()



// pull data from google spreadsheet
function initializeTabletopObject(dataSpreadsheet){
    Tabletop.init({
        key: dataSpreadsheet,
        callback: writeTableWith,
        simpleSheet: true,
        debug: false
    });


}

// create table headers
function createTableColumns(){



    /* swap out the properties of mDataProp to reflect
    the names of columns in the Google Sheet. Swap out the properties of sTitle for the column title you want displayed. */


    var tableColumns =   [
        {'mDataProp': 'LoanAmount', 'sTitle': 'LoanAmount', 'sClass': 'left'},
        {'mDataProp': 'BusinessName', 'sTitle': 'BusinessName', 'sClass': 'left'},
            {'mDataProp': 'name', 'sTitle': 'Business category', 'sClass': 'left'},

        {'mDataProp': 'Address', 'sTitle': 'Address', 'sClass': 'left'},
        {'mDataProp': 'City', 'sTitle': 'City', 'sClass': 'left'},
     // {'mDataProp': 'State', 'sTitle': 'State', 'sClass': 'left'},
     //    {'mDataProp': 'Zip', 'sTitle': 'Zip', 'sClass': 'left'},
        // {'mDataProp': 'NAICSCode', 'sTitle': 'NAICSCode', 'sClass': 'left'},
        {'mDataProp': 'BusinessType', 'sTitle': 'BusinessType', 'sClass': 'left'},  
        
   // {'mDataProp': 'RaceEthnicity', 'sTitle': 'RaceEthnicity', 'sClass': 'left'},
   //      {'mDataProp': 'Gender', 'sTitle': 'Gender', 'sClass': 'left'},
   //   {'mDataProp': 'Veteran', 'sTitle': 'Veteran', 'sClass': 'left'},
        {'mDataProp': 'NonProfit', 'sTitle': 'NonProfit', 'sClass': 'left'},
        {'mDataProp': 'JobsReported', 'sTitle': 'JobsReported', 'sClass': 'left'},
        {'mDataProp': 'DateApproved', 'sTitle': 'DateApproved', 'sClass': 'left'},        
        {'mDataProp': 'Lender', 'sTitle': 'Lender', 'sClass': 'left'}
        // {'mDataProp': 'name', 'sTitle': 'Business category', 'sClass': 'left'},

    ];
    return tableColumns;

}


// create the table container and object
function writeTableWith(dataSource){


  

    jqueryNoConflict('#demo').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-hover" id="data-table-container"></table>');

    var oTable = jqueryNoConflict('#data-table-container').dataTable({
        'sPaginationType': 'bootstrap',
        'iDisplayLength': displaylength(width),
        'aaSorting': [[ 0, 'desc' ]],
        "deferRender": true,
        'aaData': dataSource, 
        'aoColumns': createTableColumns(),
        'oLanguage': {
            'sLengthMenu': '_MENU_ <br>records per page'
        }
    });
    
pymChild = new pym.Child(); 



};



function displaylength(bodywidth) {
    if (bodywidth > 450)
    {
        return 25
    }
    else {
        return 10
    }
}



//define two custom functions (asc and desc) for string sorting
jQuery.fn.dataTableExt.oSort['string-case-asc']  = function(x,y) {
    return ((x < y) ? -1 : ((x > y) ?  0 : 0));
};

jQuery.fn.dataTableExt.oSort['string-case-desc'] = function(x,y) {
    return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};
