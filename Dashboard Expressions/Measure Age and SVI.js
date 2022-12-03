var svi = $datapoint.sviscore
var d = datediff(now(), $datapoint.dateremoteqaassigned,'days')/2
var col = ['#3D00FF','#501BE2','#6437C6',
'#7753AA','#8B6E8E','#9E8A72','#B2A656',
'#C5C13A','#D9DD1E','#EDF902','#EEE209',
'#F0CB11','#F1B518','#F39E20','#F58727',
'#F6712F','#F85A36','#FA433E','#FB2D45',
'#FD164D','#FF0055']

svi = (20*svi)/1
d = d
var idx = Round((svi+d+d*2)/3,0)

return {
  textColor: '',
  backgroundColor: '',
  separatorColor:'',
  selectionColor: '',
  selectionTextColor: '',
   attributes: {
     attribute1: col[idx],
   }
}