var portal = Portal("");
var disputes = Filter(FeatureSetByPortalItem(
    portal,
    "1cc027acc4f04aca8e5b6ddd6bbea287",
    3,
    ["*"],
    false),"datedisputeclosed is null");


var action_items = Filter(FeatureSetByPortalItem(
    portal,
    "1cc027acc4f04aca8e5b6ddd6bbea287",
    6,
    ["*"],
    false),"itemdateclosed is null AND itemassignedteam ='QA Management'");

var roes = FeatureSetByPortalItem(
    portal,
    "1cc027acc4f04aca8e5b6ddd6bbea287",
    0,
    ["roeidpk",'contractorname','qaplasticsheeting'],
    true
);



var features = [];
var feat;
console('a')
for (var d in disputes) {
    var roe = d["disputeroeidpk"]
    for (var p in Filter(roes, "roeidpk = @roe")){
        feat = {
            attributes: {
            adjplasticsheeting: d["adjplasticsheeting"],
			qaplasticsheeting: p["qaplasticsheeting"],
			comments: d["contractordisputenotes"],
			contractorname: p["contractorname"],
			disputetype: d["disputetype"],
			created_date: Number(d["created_date"]),
			created_user: d["created_user"],
			parentglobalid: d["parentglobalid"],
			contractorname: p["contractorname"],
			roeidpk: roe
            },'geometry': Geometry(p)
        }
    Push(features, feat)
    }}
console('b')
for (var t in action_items) {
    var roe = t["actionroeidpk"]
	for (var p in Filter(roes, "roeidpk = @roe")){
        feat = {
            attributes: {
                disputetype: 'Action Item',
                comments: t["comments"],
				parentglobalid: t["parentglobalid"],
				roeidpk: roe
            },'geometry': Geometry(p)
        }
    Push(features, feat)
    }}
    
console('c')
var joinedDict = {
    fields: [
        { name: "disputetype", type: "esriFieldTypeString" },
        { name: "comments", type: "esriFieldTypeString" },             
        { name: "contractorname", type: "esriFieldTypeString" },
        { name: "adjplasticsheeting", type: "esriFieldTypeInteger" },
        { name: "qaplasticsheeting", type: "esriFieldTypeInteger" },
        { name: "contractorname", type: "esriFieldTypeString" },
        { name: "assignedtouser", type: "esriFieldTypeString" },
        { name: "created_date", type: "esriFieldTypeDate" },
        { name: "created_user", type: "esriFieldTypeString" },
		{ name: "parentglobalid", type: "esriFieldTypeString" },
		{ name: "roeidpk", type: "esriFieldTypeString" }
    ],
    'geometryType': "esriGeometryPoint",
    'features':features
};

return FeatureSet(Text(joinedDict));