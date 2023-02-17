var popupString = ''


for (var f in FeatureSetByRelationshipName($feature,"DR_4619_CALDOR_FIRE_Debris_visits")){
        popupString += "Date: " + Text(f.visit_date, 'DD MMM YY') + TextFormatting.NewLine + 
        "Safety Concern: " +
        DefaultValue(f.safety_concerns, 'no data') + TextFormatting.NewLine +
        "Environmental Concern: " +
        DefaultValue(f.environmental_concerns, 'no data') + TextFormatting.NewLine + TextFormatting.NewLine
}

return popupString
