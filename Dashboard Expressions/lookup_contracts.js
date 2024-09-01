var querydate = $feature.eventdate;
var querytext = "datestart < @querydate AND dateend > @querydate";
var fs = Filter(FeatureSetByName($datastore, 'BLUE_ROOF.BLUE_ROOF_OWNER.aci_contracts', ["*"], true), querytext);

var contracts = Intersects(fs, $feature);
var contractString = "";
for (var v in contracts) {
    if (contractString != "") {
        contractString += ",";
    }
    contractString += Text(v['OBJECTID']);
}

return {
    "result": {
        "attributes": {'contracts': contractString}
    }
};
