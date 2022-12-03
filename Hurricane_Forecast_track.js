var land = FeatureSetByPortalItem(Portal('xxxx'), '2faaa8bb39dd40b4b5de47ddf5559ad6', 1,['*'],true)
var points = FeatureSetByPortalItem(Portal('xxxx'), '27cf804d39094a5981f9bbc45f45634c', 0,['*'],true)
var line = OrderBy(Filter(FeatureSetByPortalItem(Portal('xxxx'), '27cf804d39094a5981f9bbc45f45634c', 2,['*'],true), "BASIN = 'AL'"),'OBJECTID ASC')
var currentpoints = FeatureSetByPortalItem(Portal('xxxx'), '27cf804d39094a5981f9bbc45f45634c', 1);



var lowdist1 = 10000000
var wind1
var mlb1
var gust1
var time1
var name1
var features = [];
var feat;
var cat1
var str1
for (var l in line){
    name1 = l['STORMNAME']
	var maxDate = Max(Filter(currentpoints,"STORMNAME = @name1"),'OBJECTID');

    var curwind1 = Round(First(Filter(currentpoints, 'OBJECTID = @maxDate'))['INTENSITY'])
	console('b')
	var curmlb1 = Round(First(Filter(currentpoints, 'OBJECTID = @maxDate'))['MSLP'])

	    
	//}
    if (Count(Intersects(land,l)) >0){
        for (var m in Intersects(land,l)){
            var landfall1 = m['NAMELSAD']}
            var xy = Centroid(m)
            console(xy)
        for (var p in points){
            var curdist1 = DistanceGeodetic(p, xy, 'miles')
            console(curdist1)
            console(lowdist1)
            console(p['DATELBL'])
            if (curdist1 < lowdist1) {
                lowdist1 = curdist1
                wind1 = Round(p['MAXWIND'])
                mlb1 = Round(p['MSLP'])
                gust1 = Round(p['GUST'])
                time1 = p['DATELBL']
                str1 = p['TCDVLP']
                cat1 = p['SSNUM']
            }
}}
    
    feat = {
        attributes:{cat:cat1,str:str1,curwind:curwind1,curmlb:curmlb1,name:name1,lowdist:lowdist1,wind:wind1,mlb:mlb1,time:time1,gust:gust1,landfall:landfall1}}
    Push(features, feat)
}

var joinedDict = {
    fields: [
        { name: "lowdist", type: "esriFieldTypeString" },
        { name: "wind", type: "esriFieldTypeString" },     
        { name: "mlb", type: "esriFieldTypeString" },             
        { name: "time", type: "esriFieldTypeString" },
        { name: "curwind", type: "esriFieldTypeString" },
        { name: "curmlb", type: "esriFieldTypeString" },
        { name: "str", type: "esriFieldTypeString" },
        { name: "cat", type: "esriFieldTypeInteger" },
        { name: "gust", type: "esriFieldTypeString" },
        { name: "name", type: "esriFieldTypeString" },
        { name: "landfall", type: "esriFieldTypeString" }
    ],
    'geometryType': '',
    'features':features
};

return FeatureSet(Text(joinedDict));



Advanced Formatting

var c1 = When($datapoint.curwind >= 50 && $datapoint.curwind < 74,'Tropical Storm',
$datapoint.curwind >= 74 && $datapoint.curwind < 95,'Cat 1 Hurricane',
$datapoint.curwind >= 95 && $datapoint.curwind < 111,'Cat 2 Hurricane',
$datapoint.curwind >= 111 && $datapoint.curwind < 129,'Cat 3 Hurricane',
$datapoint.curwind >= 129 && $datapoint.curwind < 156,'Cat 4 Hurricane',
$datapoint.curwind >= 156,'Cat 5 Hurricane','')

if (IsEmpty($datapoint.landfall)){var lftext = 'No landfall forecasted'}
else {var lftext = '<p style="text-align: center;">Forecasted landfall near</p><h3 style="text-align: center;">'+$datapoint.landfall+'</h3><p style="text-align: center;">at <strong>'+$datapoint.time+'</strong></p><p style="text-align: center;">as a <strong>'+$datapoint.str+' '+$datapoint.cat+' </strong></p><p style="text-align: center;">Expected Sustained Winds at '+ $datapoint.wind+' mph</p><p style="text-align: center;">Max Gusts at&nbsp;'+$datapoint.gust+' mph</p><p style="text-align: center;">Pressure at&nbsp;'+$datapoint.mlb+' mlb</p>'}
    

return {
  textColor: '',
  backgroundColor: '',
  separatorColor:'#f2f1ec',
  selectionColor: '',
  selectionTextColor: '',
   attributes: {
     c: c1,
     lf: lftext
   }
}
