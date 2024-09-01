var portal = Portal('https://arcportal-ucop-corps.usace.army.mil/s0portal');

// var storms = Filter(FeatureSetByPortalItem(
//     portal,
//     "a583c77de1384a689ede44ac32bec44d",
//     4,
//     ["*"],
//     true
// ),"BASIN='AL'");

var tracts = FeatureSetByPortalItem(
    portal,
    "f649cd52b82c4a7f9e4a4abcc2d9d3a3",
    0,
    ["*"],
    true
);

function estimateDamagedResidences(windSpeed, totalResidences) {
    var a = 0.05  
    var b = 3    
	var V_r_mph = 67
    var damage_percentage = a * Pow((windSpeed / V_r_mph),b)

    var estimatedDamages = damage_percentage * totalResidences;
    return Round(estimatedDamages,0);
}



var trop = 0
var cat1 = 0
var cat2 = 0
var cat3 = 0
var cat4 = 0
var cat5 = 0

var tropd = 0
var cat1d = 0
var cat2d = 0
var cat3d = 0
var cat4d = 0
var cat5d = 0

var features = []
var feat = ''

var fs = FeatureSetByPortalItem(portal, "4c7a71b97839428c98b7a56a094bc97f", 0, ["*"], true);
var storms = Distinct(fs,'storm');
for (var storm in storms){
    var stormname = storm['storm'];
    var dates = Distinct(fs, 'modeldate');

    var modeldate = First(OrderBy(dates, "modeldate DESC"))['modeldate'];

    var polys = Filter(fs, "storm = @stormname AND modeldate = @modeldate AND contourmax > 69");


   for (var poly in polys){
	var s =  Intersects(tracts,poly)
        if (Count(s)>0){
			var housing = Sum(s,"H0010001")
            if (poly['contourmax'] <= 74){
                trop += housing
                tropd +=estimateDamagedResidences(70,housing)
            }
            if (poly['contourmax'] > 74 && poly['contourmax'] <= 95){
                cat1 += housing
                cat1d += estimateDamagedResidences(85,housing)
            }
            if (poly['contourmax'] > 95 && poly['contourmax'] <= 110){
                cat2 += housing
                cat2d += estimateDamagedResidences(103,housing)
            }
            if (poly['contourmax'] > 110 && poly['contourmax'] <= 130){
                cat3 += housing
                cat3d += estimateDamagedResidences(120,housing)
            }
            if (poly['contourmax'] > 130 && poly['contourmax'] < 155){
                cat4 += housing
                cat4d += estimateDamagedResidences(140,housing)
            }
            if (poly['contourmax'] > 155 ){
                cat5 += housing
                cat5d += estimateDamagedResidences(155,housing)
            }
        }
    }
   feat = {attributes:{"housing":trop,"stormname":stormname,"cat":"Tropical","damage":tropd}}
   Push(features, feat)
   
   feat = {attributes:{"housing":cat1,"stormname":stormname,"cat":"CAT 1","damage":cat1d}}
   Push(features, feat)
   
   feat = {attributes:{"housing":cat2,"stormname":stormname,"cat":"CAT 2","damage":cat2d}}
   Push(features, feat)
   
   feat = {attributes:{"housing":cat3,"stormname":stormname,"cat":"CAT 3","damage":cat3d}}
   Push(features, feat)
   
   feat = {attributes:{"housing":cat4,"stormname":stormname,"cat":"CAT 4","damage":cat4d}}
   Push(features, feat)
   
   feat = {attributes:{"housing":cat5,"stormname":stormname,"cat":"CAT 5","damage":cat5d}}
   Push(features, feat)
   
   
}

var joinedDict = {
    fields: [
        { name: "housing", type: "esriFieldTypeInteger" },
        { name: "stormname", type: "esriFieldTypeString" },
        { name: "cat", type: "esriFieldTypeString" },  
        { name: "damage", type: "esriFieldTypeInteger" }, 

    ],
    'geometryType': '',
    'features':features
};

return FeatureSet(Text(joinedDict));


