var portal = Portal('xxxx');
var warnings = FeatureSetByPortalItem(
    portal,
    "xxx",
    6,
    ["*"],
    true
);

var athoc = FeatureSetByPortalItem(
    portal,
    "xxx",
    1,
    ["*"],
    true
);

var features = [];
var feat;

for(var d in Filter(warnings,"(Severity LIKE'%Moderate%') OR (Severity LIKE'%Severe%')" )){
    for ( var i in Intersects(athoc, d)){
        feat = {
            attributes: {
                name: i['objectid'],
                event: d['Event']
            },
            'geometry': Geometry(i)
        }
        Push(features, feat)
    }
}

var joinedDict = {
    fields: [
        { name: "name", type: "esriFieldTypeString" },
        { name: "event", type: "esriFieldTypeString" }
    ],
    'geometryType': 'esriGeometryPoint',
    'features':features
};

return FeatureSet(Text(joinedDict));
