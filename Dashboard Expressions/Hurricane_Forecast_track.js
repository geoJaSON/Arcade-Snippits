var land = FeatureSetByPortalItem(Portal(''), '2faaa8bb39dd40b4b5de47ddf5559ad6', 1,['*'],true)
var points = FeatureSetByPortalItem(Portal(''), '27cf804d39094a5981f9bbc45f45634c', 0,['*'],true)
var line = OrderBy(Filter(FeatureSetByPortalItem(Portal(''), '27cf804d39094a5981f9bbc45f45634c', 2,['*'],true), "BASIN = 'AL'"),'OBJECTID ASC')
var currentpoints = FeatureSetByPortalItem(Portal(''), '27cf804d39094a5981f9bbc45f45634c', 1);


var lowdist1 = 10000000
var wind1
var mlb1
var gust1
var time1
var name1
var landfall1
var features = [];
var feat;
var cat1
var basin1
var str1
for (var l in line){
    if (l['STORMTYPE']!=' ') {
        console(l['STORMNUM'])
        console(IsEmpty(l['STORMTYPE']))
        name1 = l['STORMNAME']
        basin1 = l['BASIN']
    	var maxDate = Max(Filter(currentpoints,"STORMNAME = @name1"),'OBJECTID');
    
        var curwind1 = Round(First(Filter(currentpoints, 'OBJECTID = @maxDate'))['INTENSITY']*1.15)
    	var curmlb1 = Round(First(Filter(currentpoints, 'OBJECTID = @maxDate'))['MSLP'])

        if (Count(Intersects(land,l)) >0){
            for (var m in Intersects(land,l)){
                console('a')
                var landfall1 = m['namelsad']}
                var xy = Centroid(m)
                console('b')
            for (var p in points){
                var curdist1 = DistanceGeodetic(p, xy, 'miles')
                if (curdist1 < lowdist1) {
                    lowdist1 = curdist1
                    wind1 = Round(p['MAXWIND']*1.15)
                    mlb1 = Round(p['MSLP'])
                    gust1 = Round(p['GUST']*1.15)
                    time1 = p['DATELBL']
                    str1 = p['TCDVLP']
                    cat1 = p['SSNUM']
                }
    }}
        
        feat = {
            attributes:{cat:cat1,basin:basin1,str:str1,curwind:curwind1,curmlb:curmlb1,name:name1,wind:wind1,mlb:mlb1,time:time1,gust:gust1,landfall:landfall1}}
        Push(features, feat)
    }}

var joinedDict = {
    fields: [
        { name: "lowdist", type: "esriFieldTypeString" },
        { name: "wind", type: "esriFieldTypeString" },     
        { name: "mlb", type: "esriFieldTypeString" },             
        { name: "time", type: "esriFieldTypeString" },
        { name: "curwind", type: "esriFieldTypeDouble" },
        { name: "curmlb", type: "esriFieldTypeString" },
        { name: "basin", type: "esriFieldTypeString" },
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