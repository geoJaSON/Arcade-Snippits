var portal = Portal('');
var layer1 = FeatureSetByPortalItem(
    portal,
    "ab6017089de34b84ac312a051e53af47",
    0,
    ["*"],
    false
);


var features = [];
var feat;

for (var t in layer1) {
    feat = {
        attributes:{
            globalid : t['globalid'],
            status : UrlEncode(t['status']),
            issues : UrlEncode(t['issues']),
            look_ahead : UrlEncode(t['look_ahead']),
            
			storymap_link : IIF(IsEmpty(t['storymap_url'])==false,Concatenate('🔗<a href="',t['storymap_url'],'"><span style="color:#ffffff"><strong>StoryMap</strong></span></a>'),''),
            
			projectwise_link : IIF(IsEmpty(t['projectwise_url'])==false,Concatenate('🔗<a href="',t['projectwise_url'],'"><span style="color:#ffffff"><strong>Projectwise</strong></span></a>'),''),
            
			products_link : IIF(IsEmpty(t['products_url'])==false,Concatenate('🔗<a href="',t['products_url'],'"><span style="color:#ffffff"><strong>Products</strong></span></a>'),'')
        }
    }
    Push(features, feat)
}

var joinedDict = {
    fields: [
        { name: "globalid", type: "esriFieldTypeGUID" },
        { name: "status", type: "esriFieldTypeString" },     
        { name: "issues", type: "esriFieldTypeString" },             
        { name: "look_ahead", type: "esriFieldTypeString" },
        { name: "storymap_link", type: "esriFieldTypeString" },
        { name: "projectwise_link", type: "esriFieldTypeString" },
		{ name: "products_link", type: "esriFieldTypeString" },
    ],
    'geometryType': '',
    'features':features
};

return FeatureSet(Text(joinedDict));
