if ($feature.closeactionitem =='Yes'){
    var querytext = "actionneeded  = 'Callback' and parentglobalid = '" + Text($feature.parentglobalid)+"'"
    var fs = First(Filter(FeatureSetByName($datastore, 'actionitems', ["*"], false),querytext))
    return {
      "edit": [{
          "className": "actionitems",
          "updates": [
            {"globalID": fs['GlobalID'], "attributes": {"actiontaken":"Item closed by cal center","itemdateclosed": now()}}
          ]}]}}