var fs = OrderBy(FeatureSetByPortalItem(Portal(''), '89e1b6f072254530bdc4d34a466c82e0', 1),'ms_date')

console(fs)
var html = '<table style="border-collapse: collapse;table-layout:fixed; width:100%" border="1"><tbody><tr>'

for (var t in fs) {
    html = html + '<td style="text-align: center;"><b>'+Text(t['ms_date'],'DD MMM YY')+'</b></td>'}
    
html = html + '</tr><tr>'
    
for (var t in fs) {
    html = html + '<td style="text-align: center; background-color: '+t['bg_color']+';"><span style="color: '+t['text_color']+';">'+t['ms_text']+'</span></td>'}
    
html = html +'</tr></tbody></table>'   
    
var fset = {
    fields: [
        { name: "htmlstring", type: "esriFieldTypeString" },

    ],
    'geometryType': '',
    'features':[
        {'attributes':
            {'htmlstring':html}
        }
        
    ]
};

return FeatureSet(Text(fset));