var att_dict = {}
att_dict['roeidpk']=nextsequencevalue("roenumber")


var records = Filter($featureset, "appaddress = '"+$feature.appaddress+"'");
if (Count(records) > 1){
    att_dict['workstate']= "Potential Duplicate"
}

if ($feature.sviscore == null){
    var svi_fs = FeatureSetByName($datastore, "SVI", ['RPL_THEMES'], true);
    var feat = First(Intersects(svi_fs, $feature))
    if (feat != null){
    att_dict['sviscore'] = feat['RPL_THEMES'];
    }}

return {
  "result":{
      "attributes":att_dict
           }
       }