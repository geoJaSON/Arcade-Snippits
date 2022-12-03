var portal = Portal('');
var layer = FeatureSetByPortalItem(
    portal,
    "2172a93535cf4710bab0c221cf7c9273",
    0,
    ["*"],
    false
);
var features = [];
var feat;

for (var t in layer) {
    var rs = FeatureSetByRelationshipName(t, 'SWG_Accountability_X_Evac_employees', ['*'], false)
    var rs = OrderBy(rs,'status')
    var rs_count = Count(rs)
    var html = '<table style="width: 100%;"><tbody><tr>';
    var html2 = '<td style="border-collapse: collapse; border-style: solid; border-color: #000000;text-align: center; width: 100/'+rs+'%; background-color: '
    for (var r in rs) {
        var col = When(r['status']=='Duty Location/Telework/Leave','#00FF00',
		r['status']=='Flooded','#ff0000',
		r['status']=='No Power','#FFFF00',
		r['status']=='Safe Haven','#FFBF00',
		'#f2f1ec')
		var ch = When(r['status']=='Duty Location/Telework/Leave','✔',
		r['status']=='Flooded','🌊',
		r['status']=='No Power','🔌',
		r['status']=='Safe Haven',
		'🏨',
		'❓')
        html = html + html2+col+';">'+ch+'</td>'
		}
    html = html + '</tr></tbody></table>';
    feat = {
        attributes:{
            globalid : t['globalid'],
            office : t['officedesc'],
            office_sym : t['orgcode'],
            acc_count : rs_count,
            percentage : t['percent_accounted'],
            table : html,
            update_time : Number(t['last_edited_date'])
			}
    }
    Push(features, feat)
}
    

var joinedDict = {
    fields: [
        { name: "globalid", type: "esriFieldTypeGUID" },
        { name: "office", type: "esriFieldTypeString" },     
        { name: "office_sym", type: "esriFieldTypeString" },             
        { name: "acc_count", type: "esriFieldTypeInteger" },
        { name: "percentage", type: "esriFieldTypeInteger" },
        { name: "table", type: "esriFieldTypeString" },
        { name: "update_time", type: "esriFieldTypeDate" },
    ],
    'geometryType': '',
    'features':features
};

return FeatureSet(Text(joinedDict));
