var p = Portal('')
var u = GetUser(p)['username']
console(u)
var fs = Filter(FeatureSetByPortalItem(p, '1cc027acc4f04aca8e5b6ddd6bbea287', '0',['roeidpk','sviscore','dateremoteqaassigned','remoteqaname','appaddress','globalid','workstate','progressstatus'],true),"remoteqaname = @u AND workstate = 'Valid' AND progressstatus = 'With Remote QA'")

return fs