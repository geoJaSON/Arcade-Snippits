var p = Portal("https://arcportal-ucop-corps.usace.army.mil/s0portal");
var features = FeatureSetByPortalItem(p, "75a62a31d0314627a52f2911ab0ce2b1", 0);


// Create an empty dictionary to store the counts
var dailyCounts = {};

// Loop through each feature in the layer
for (var f in features) {
    // Extract the report date and convert it to date-only format
    var reportDate = Text(f["report_date"], "MM/DD/YYYY");
    
    // Initialize counts for the day if not already present
    if (!HasKey(dailyCounts, reportDate)) {
        dailyCounts[reportDate] = {
            "installs_complete": 0,
            "installs_on_hold": 0,
            "installs_cancelled": 0,
            "assessments_complete": 0,
            "assessments_on_hold": 0,
            "assessments_cancelled": 0,
            "deinstalls_complete": 0,
            "deinstalls_on_hold": 0,
            "deinstalls_cancelled": 0
            
        };
    }
    
    // Increment counts based on the 'installed' and 'install_on_hold' values
    if (f["installs_complete"] == "Yes") {
        dailyCounts[reportDate]["installs_complete"] += 1;
    }
    if (f["installs_on_hold"] == "Yes") {
        dailyCounts[reportDate]["installs_on_hold"] += 1;
    }
    if (f["installs_cancelled"] == "Yes") {
        dailyCounts[reportDate]["installs_cancelled"] += 1;
    }
    if (f["assessments_complete"] == "Yes") {
        dailyCounts[reportDate]["assessments_complete"] += 1;
    }
    if (f["assessments_on_hold"] == "Yes") {
        dailyCounts[reportDate]["assessments_on_hold"] += 1;
    }
    if (f["assessments_cancelled"] == "Yes") {
        dailyCounts[reportDate]["assessments_cancelled"] += 1;
    }
    if (f["deinstalls_complete"] == "Yes") {
        dailyCounts[reportDate]["deinstalls_complete"] += 1;
    }
    if (f["deinstalls_on_hold"] == "Yes") {
        dailyCounts[reportDate]["deinstalls_on_hold"] += 1;
    }
    if (f["deinstalls_cancelled"] == "Yes") {
        dailyCounts[reportDate]["deinstalls_cancelled"] += 1;
    }

}

// Convert the dictionary to an array of objects for easier visualization
var resultArray = [];
for (var date in dailyCounts) {
    Push(resultArray, {
        "report_date": date,
        "installs_complete": dailyCounts[date]["installs_complete"],
        "installs_on_hold": dailyCounts[date]["installs_on_hold"],
        "installs_cancelled":dailyCounts[date]["installs_on_hold"],
        "assessments_complete":dailyCounts[date]["assessments_complete"],
        "assessments_on_hold":dailyCounts[date]["assessments_on_hold"],
        "assessments_cancelled":dailyCounts[date]["assessments_cancelled"],
        "deinstalls_complete":dailyCounts[date]["deinstalls_complete"],
        "deinstalls_on_hold":dailyCounts[date]["deinstalls_on_hold"],
        "deinstalls_cancelled":dailyCounts[date]["deinstalls_cancelled"]
    });
}

var joinedDict = {
    fields: [
        { name: "report_date", type: "esriFieldTypeDate" },
        { name: "installs_complete", type: "esriFieldTypeInteger" },
        { name: "installs_on_hold", type: "esriFieldTypeInteger" },
        { name: "installs_cancelled", type: "esriFieldTypeInteger" },
        { name: "assessments_complete", type: "esriFieldTypeInteger" },
        { name: "assessments_on_hold", type: "esriFieldTypeInteger" },
        { name: "assessments_cancelled", type: "esriFieldTypeInteger" },
        { name: "deinstalls_complete", type: "esriFieldTypeInteger" },
        { name: "deinstalls_on_hold", type: "esriFieldTypeInteger" },
        { name: "deinstalls_cancelled", type: "esriFieldTypeInteger" }

    ],
    'geometryType': '',
    'features':features
};

return FeatureSet(Text(joinedDict)); 
