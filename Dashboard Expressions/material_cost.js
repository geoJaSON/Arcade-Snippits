var p = Portal("https://arcportal-ucop-corps.usace.army.mil/s0portal");
var brms = Filter(FeatureSetByPortalItem(p, "8a29b3bda7d7462da7d11df72f1d2126", 0), "contractorname is not null");
var events = FeatureSetByPortalItem(p, "e09a2f2afd1a45dc89b0b8d43f58cbb8", 1);

var features = [];
var feat;

for (var event in events) {
    var englink = event['eventid']
    var contractlist = event['contracts'];
    var capacity = 0
    // Convert the contractlist string into an array of IDs
    var contractArray = Split(contractlist, ",");
    
    // Create a where clause using the array of IDs
    var whereClause = "OBJECTID IN (";
    for (var i = 0; i < Count(contractArray); i++) {
        if (i > 0) {
            whereClause += ",";
        }
        whereClause += contractArray[i];
    }
    whereClause += ")";

    var contracts = Filter(FeatureSetByPortalItem(p, "e09a2f2afd1a45dc89b0b8d43f58cbb8", 2), whereClause);
    Console("Number of contracts: " + Count(contracts));
    
        for (var c in contracts){
            var plasticx = 0
            var panelx = 0
            var rafterx = 0
            var minordebrisx = 0
            var majordebrisx = 0
            var srrx = 0
            var processingx = 0
            
            var cname = c['contractorname']
            var contractset = Filter(brms,'eventid = @englink AND contractorname = @cname')
            console(cname)
            console(Count(contractset))
            for (var roe in contractset){
                plasticx = c['plasticsheetingshingle']
                panelx = c['structuralpanels']
                rafterx = c['rafters']
                if (roe['qadebris'] =='Minor'){minordebrisx = c['minordebris']}
                if (roe['qadebris'] =='Major'){majordebrisx = c['majordebris']}
                srrx = roe['qasmallroofrepair'] * c['smallroofrepair']
                capacity = c['capacity']
            
            
            
    
    feat = {
            attributes: {
                ktr: roe['contractorname'],
                event: roe['eventid'],
                plasticsheeting: roe['qaplasticsheeting'] * plasticx,
                structurepanels: roe['qastructurepanels'] * panelx,
                rafters: roe['qarafters'] * rafterx,
                minordebris: minordebrisx,
                majordebris: majordebrisx,
                smallroofrepair: srrx,
                processing: processingx,
                total: (roe['qaplasticsheeting'] * plasticx)+(roe['qastructurepanels'] * panelx)+(roe['qarafters'] * rafterx)+minordebrisx+majordebrisx+srrx+processingx,
				usedCapacity : ((roe['qaplasticsheeting'] * plasticx)+(roe['qastructurepanels'] * panelx)+(roe['qarafters'] * rafterx)+minordebrisx+majordebrisx+srrx+processingx)/capacity*100,
				capacity: capacity

        }
    }
    Push(features, feat)
            }
        
    }

}
console(Count(features))
var joinedDict = {
    fields: [
        { name: "ktr", type: "esriFieldTypeString" },
        { name: "event", type: "esriFieldTypeString" }, 
        { name: "plasticsheeting", type: "esriFieldTypeDouble" },             
        { name: "structurepanels", type: "esriFieldTypeDouble" },
        { name: "rafters", type: "esriFieldTypeDouble" },
        { name: "minordebris", type: "esriFieldTypeDouble" },
        { name: "majordebris", type: "esriFieldTypeDouble" },
        { name: "smallroofrepair", type: "esriFieldTypeDouble" },
        { name: "processing", type: "esriFieldTypeDouble" },
        { name: "total", type: 	"esriFieldTypeDouble"},
		{name: "capacity", type: "esriFieldTypeDouble"},
		{ name: "usedCapacity", type: "esriFieldTypeDouble"}
    ],
    'geometryType': '',
    'features':features
};

return FeatureSet(Text(joinedDict)); 
