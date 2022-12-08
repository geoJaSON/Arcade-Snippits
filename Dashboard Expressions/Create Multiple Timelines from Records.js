var fs = OrderBy(Filter(FeatureSetByPortalItem(Portal(''), '', 1),"visibility = 'Visible'"),'ms_date')

var events = Distinct(fs,'milestone_event')
console(events)
for (var event in events){
    event = event['milestone_event']
    var fs1 = Filter(fs,"milestone_event = @event")
var html = '<table style="border-collapse: collapse;table-layout:fixed; width:100%" border="1"><tbody><tr>'

for (var t in fs1) {
    html = html + '<td style="text-align: center;"><b>'+Text(t['ms_date'],'DD MMM YY')+'</b></td>'}
    
html = html + '</tr><tr>'
    
for (var t in fs1) {
    html = html + '<td style="text-align: center; background-color: '+t['bg_color']+';"><span style="color: '+t['text_color']+';">'+t['ms_text']+'</span></td>'}
    
html = html +'</tr></tbody></table>'   
    
var fset = {
    fields: [
        {name: 'event', type: "esriFieldTypeString"},
        {name: "htmlstring", type: "esriFieldTypeString" },

    ],
    'geometryType': '',
    'features':[
        {'attributes':
            {'htmlstring':html,
            'event':event}
        }
        
    ]
};
}
return FeatureSet(Text(fset));