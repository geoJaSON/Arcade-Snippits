var fs = Filter(FeatureSetByPortalItem(Portal(''), '2a26825c21c34e3fb12aa51b2c42d529', 0),"debris_removal_date is not null")

var fs_date = {
    geometryType: "",
    fields: [
        {name: "DateShort", type: "esriFieldTypeDate"},
        ],
    features: []
}
for(var f in fs) {
    var d = f.debris_removal_date
    var date_short = Number(Date(Year(d), Month(d), Day(d)))
    Push(fs_date.features, {attributes: {DateShort: date_short}})
}

// group by and order by DateShort
var fs_grouped_by_date = GroupBy(FeatureSet(Text(fs_date)), "DateShort", {name: "Total", expression: "1", statistic: "COUNT"})
var fs_ordered_by_date = OrderBy(fs_grouped_by_date, "DateShort")

// get cumulative count
var fs_cumulative = {
    geometryType: "",
    fields: [
        {name: "DateShort", type: "esriFieldTypeDate"},
        {name: "Total", type: "esriFieldTypeInteger"},
        {name: "Cumulative", type: "esriFieldTypeInteger"},
        ],
    features: []
}
var cumulative = 0
for(var f in fs_ordered_by_date) {
    cumulative += f.Total
    var new_feature = {attributes: {DateShort: Number(f.DateShort), Total: f.Total, Cumulative: cumulative}}
    Push(fs_cumulative.features, new_feature)
}

// return
return FeatureSet(Text(fs_cumulative))