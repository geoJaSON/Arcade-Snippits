var portal = Portal('xxxx');
var warnings = FeatureSetByPortalItem(
    portal,
    "xxxx",
    6,
    ["*"],
    true
);

var athoc = FeatureSetByPortalItem(
    portal,
    "xxx",
    1,
    ["*"],
    false
);

var areas = FeatureSetByPortalItem(
    portal,
    "xxxx",
    0,
    ["*"],
    true
);


var freeze_count = 0
var flood_count = 0
var power_count = 0
var water_count = 0
var mand_count = 0
var vol_count = 0
var boil_count = 0

for(var d in Filter(warnings,"(Event LIKE'%Winter%'OR Event LIKE'%Ice%')" )){
    var f_count = Count(Intersects(athoc, d))
	freeze_count += f_count

}

for(var d in Filter(warnings,"Event LIKE'%Flood%'" )){
    var f_count = Count(Intersects(athoc, d))
	flood_count += f_count

}

for(var d in Filter(areas,"poweroutage = 'Yes'" )){
    var f_count = Count(Intersects(athoc, d))
	power_count += f_count

}

for(var d in Filter(areas,"evacuation = 'Mandatory'" )){
    var f_count = Count(Intersects(athoc, d))
	mand_count += f_count

}
for(var d in Filter(areas,"evacuation = 'Voluntary'" )){
    var f_count = Count(Intersects(athoc, d))
	vol_count += f_count

}
for(var d in Filter(areas,"boilwater = 'Yes'" )){
    var f_count = Count(Intersects(athoc, d))
	boil_count += f_count

}
for(var d in Filter(areas,"highwater = 'Yes'" )){
    var f_count = Count(Intersects(athoc, d))
	water_count += f_count

}

var features = [];
var feat;

feat = {
            attributes: {
                water: water_count,
                boil: boil_count,
                mand: mand_count,
                vol: vol_count,
                flood: flood_count,
                freeze: freeze_count,
                power: power_count,

            }
        }

Push(features, feat)

var joinedDict = {
    fields: [
        { name: "water", type: "esriFieldTypeInteger" },
        { name: "boil", type: "esriFieldTypeInteger" },
        { name: "mand", type: "esriFieldTypeInteger" },
        { name: "vol", type: "esriFieldTypeInteger" },
        { name: "water", type: "esriFieldTypeInteger" },
        { name: "flood", type: "esriFieldTypeInteger" },
        { name: "freeze", type: "esriFieldTypeInteger" },
        { name: "power", type: "esriFieldTypeInteger" },
        

    ],
    'geometryType': '',
    'features':features
};

return FeatureSet(Text(joinedDict));






