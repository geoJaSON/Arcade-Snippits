if ($feature.subject=='Complaint'){
    return {
      "edit": [{
          "className": "complaints",
          "adds": [
            {"globalID": Guid(), "attributes": {"situation": $feature.comments,"parentglobalid": $feature.parentglobalid}}
          ]}]}}
    
    else if ($feature.followuprequired =='Yes'){
    return {
      "edit": [{
          "className": "actionitems",
          "adds": [
            {"globalID": Guid(), "attributes": {"actionneeded":"Callback","comments": $feature.comments,"itemassignedteam": 'Call Center',"parentglobalid": $feature.parentglobalid}}
          ]}]}}