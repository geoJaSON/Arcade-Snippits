var querytext = "roeidpk = '" + Text($feature.disputeroeidpk)+"'"
var fs = First(Filter(FeatureSetByName($datastore, 'roe', ["roeidpk","opendispute"], false),querytext))
if (fs != null) {
return {
  "edit": [{
      "className": "roe",
      "updates": [
        {"globalID": fs['GlobalID'], "attributes": {"opendispute":"Yes"}}
      ]}]}}