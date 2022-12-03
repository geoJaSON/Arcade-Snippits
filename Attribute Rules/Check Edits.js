var adds_list = []

if (Round(Geometry($originalFeature)['x'],5) != Round(Geometry($feature)['x'],5)){
Push(adds_list,{"globalID": Guid(), "attributes": {"comment": 'Point moved from '+ Round(Geometry($originalFeature)['x'],5)+ ', '+ Round(Geometry($originalFeature)['y'],5)+ ' to '+Round(Geometry($feature)['x'],5)+ ', '+ Round(Geometry($feature)['y'],5),"parentglobalid": $feature.GlobalID}})}

if ($originalFeature.workstate != $feature.workstate){
Push(adds_list,{"globalID": Guid(), "attributes": {"comment":"Work state changed from "+$originalFeature.workstate+' to '+$feature.workstate ,"parentglobalid": $feature.GlobalID}})}

if ($originalFeature.qatype!= $feature.qatype){
Push(adds_list,{"globalID": Guid(), "attributes": {"comment":"QA type changed to "+$feature.qatype,"parentglobalid": $feature.GlobalID}})}

if ($originalFeature.appaddress!= $feature.appaddress){
Push(adds_list,{"globalID": Guid(), "attributes": {"comment":"Address changed from "+$originalFeature.appaddress+' to '+$feature.appaddress,"parentglobalid": $feature.GlobalID}})}


if (Count(adds_list)>0) {
return {
  "edit": [{
      "className": "notes",
      "adds": adds_list}]}}