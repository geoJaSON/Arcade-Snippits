if ($feature.subject=='Complaint'){
var querytext = "GlobalID = '" + Text($feature.parentglobalid)+"'"
var fs = First(Filter(FeatureSetByName($datastore, 'BLUE_ROOF.BLUE_ROOF_OWNER.roe', ["appfirstname","applastname","appprimaryphone","datecontractorcomplete"], false),querytext))
if (fs['datecontractorcomplete'] != null){var roof = 'Roof Not Installed'}
else {var roof = 'Roof Installed'}
return {
  "edit": [{
      "className": "BLUE_ROOF.BLUE_ROOF_OWNER.complaints",
      "adds": [
        {"globalID": Guid(), "attributes": {"situation": $feature.comments,"complaintroeidpk":$feature.callroeidpk,"parentglobalid": $feature.parentglobalid,"primarycontactphone":fs['appprimaryphone'],"primarycontactname":fs['appfirstname']+" "+fs['applastname'],"roofstatus":roof}}
      ]}]}}

else if ($feature.followuprequired =='Yes'){
return {
  "edit": [{
      "className": "BLUE_ROOF.BLUE_ROOF_OWNER.actionitems",
      "adds": [
        {"globalID": Guid(), "attributes": {"actionneeded":"Callback","comments": $feature.comments,"itemassignedteam": 'Call Center',"parentglobalid": $feature.parentglobalid,"actionroeidpk":$feature.callroeidpk,"itemdateopened": $feature.created_date}}
      ]}]}}
