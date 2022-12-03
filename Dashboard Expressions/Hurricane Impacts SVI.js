var svi = FeatureSetByPortalItem(Portal(''), 'e1edc6a18f6a4000800ed7681294b6e8', 0);
var wind = FeatureSetByPortalItem(Portal('https://www.arcgis.com'), '248e7b5827a34b248647afb012c58787', 9);

var storm1;
var pop1;
var hh1;
var min1;
var nov1;
var pov1;
var engl1
var noint1;
var cell1;
var comp1;
var intensity1

var features = [];
var feat;

for (var w in wind){
        var s =  Intersects(svi,w)
        if (Count(Intersects(svi,w))>0){
        hh1 = Sum(s,'B25002_001E') //Housting
        nov1 = mean(s,'B08201_calc_pctNoVehE') //no vehicle
        noint1 = Mean(s,'B28002_calc_pctNoIntE') //no internet
        cell1 = (Sum(s,'b01001_001e')-Sum(s,'B28001_005E'))/Sum(s,'b01001_001e')*100 //no smartphone
        comp1 = Mean(s,'b28001_calc_pctnocompe') //no comp, tab, phone
        engl1 = Mean(s,'b16004_calc_pctge18leae') // no english
        pop1 = Sum(s,'b01001_001e') //total pop
        pov1 = Mean(s,'B17020_calc_pctPovE') //poverty
        min1 = (Sum(s,'b01001_001e')-Sum(s,'b03002_003e'))/Sum(s,'b01001_001e')*100 //minority
        feat = {
        attributes:{pov:pov1,minority:min1,popu:pop1,engl:engl1,nov:nov1,hh:hh1,noint:noint1,comp:comp1,cell:cell1}}
        console(feat)
        Push(features, feat)
            
        }

    
}

var joinedDict = {
    fields: [
        { name: "stormname", type: "esriFieldTypeString" },
        { name: "intensity", type: "esriFieldTypeString" },
        { name: "minority", type: "esriFieldTypeDouble" },  
        { name: "nov", type: "esriFieldTypeDouble" },
        { name: "pov", type: "esriFieldTypeDouble" },
        { name: "hh", type: "esriFieldTypeInteger" },   
        { name: "engl", type: "esriFieldTypeDouble" },   
        { name: "popu", type: "esriFieldTypeInteger" },
        { name: "cell", type: "esriFieldTypeDouble" }, 
        { name: "noint", type: "esriFieldTypeDouble" },   
        { name: "comp", type: "esriFieldTypeDouble" },  

    ],
    'geometryType': '',
    'features':features
};

return FeatureSet(Text(joinedDict));