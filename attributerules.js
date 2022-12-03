//%% On Insert
var att_dict = {}
att_dict['roeidpk']=$feature.OBJECTID

var stats = GroupBy($featureset, 'appaddress', [ { name: 'count1', expression: "1", statistic: 'COUNT' } ]);
var fil1 = Filter(stats, "appaddress = '"+$feature.appaddress+"'");
var dup1 = Sum(fil1,'count1');
if (dup1 > 1){
    att_dict['workstate']= "Potential Duplicate"
}
return {
  "result":{
      "attributes":att_dict
           }
       }




att_dict;

//% On edit_features
var att_dict = {}
att_dict['progressstatus'] = When($feature.qatype == 'Remote' && $feature.avsource == Null,'Awaiting AV Assignment',
 $feature.qatype == 'Remote' && $feature.avsource == 'Axim' && $feature.dateavcomplete == Null && $feature.dateavfail == null,'With AV',
 $feature.qatype == 'Remote' && $feature.dateavcomplete != Null && $feature.remoteqaname == Null,'Awaiting Remote QA Assignment',
 $feature.qatype == 'Remote' && $feature.dateqacomplete == Null && $feature.remoteqaname != Null && $feature.dateremoteqafail == Null,'With Remote QA',

 $feature.qatype == 'Field' && $feature.fieldqaname ==Null,'Awaiting Field QA Assignment',
 $feature.qatype == 'Field' && $feature.fieldqaname !=Null && $feature.dateqacomplete == Null,'With Field QA',



 $feature.dateqacomplete !=Null && $feature.dateqaspass == Null,'With QAS',
 $feature.dateqaspass != Null && $feature.contractorname == Null,'Awaiting QC Assignment',
 $feature.contractorname != Null && $feature.datecontractorcomplete == Null,'With QC',
 $feature.fitype == 'Remote' && $feature.datecontractorcomplete != Null && $feature.finame == Null,'Awaiting Remote FI Assignment',
 $feature.fitype == 'Remote' && $feature.datepassedfi == Null && $feature.finame != Null && ($feature.datefailedfi == Null || $feature.finewinspection =='Yes'),'With Remote FI',
 $feature.datefailedfi != Null && $feature.finewinspection =='No' && $feature.datepassedfi ==Null,'Failed FI',
 $feature.fitype == 'Field' && $feature.dateqccomplete != Null && $feature.finame == Null,'Awaiting Field FI Assignment',
 $feature.fitype == 'Field' && $feature.datepassedfi == Null && $feature.finame != Null && ($feature.datefailedfi == Null || $feature.finewinspection =='Yes'),'With Field FI',
 $feature.datepassedfi != Null && $feature.invoicenumber == Null,'Awaiting Invoicing',
 $feature.invoicenumber != Null,'Invoiced',
 ''
 )

if ($feature.qatype == 'Remote') {
     if ($feature.remoteqaname != Null && $feature.dateremoteqaassigned == Null) {
   att_dict['dateremoteqaassigned'] = now()
   }
 }
if ($feature.qatype == 'Field') {
     if ($feature.fieldqaname != Null && $feature.datefieldqaassigned == Null) {
   att_dict['datefieldqaassigned'] = now()
   }
 }
if ($feature.contractorname != Null && $feature.datesenttocontractor == Null) {
     att_dict['datesenttocontractor'] = now()
   }
if ($feature.avsource != Null && $feature.datesenttoav == Null) {
     att_dict['datesenttoav'] = now()
   }
if ($feature.invoicenumber != Null && $feature.dateinvoiced == Null) {
     att_dict['dateinvoiced'] = now()
   }
if ($feature.avsource =='USACE' && $feature.dateavcomplete == Null) {
     att_dict['dateavcomplete'] = now()
   }
if ($feature.workstate == 'Deleted' && $feature.datedeleted == Null) {
    att_dict['datedeleted'] = now()
   }
if ($feature.workstate == 'Disqualified' && $feature.datedisqualified == Null) {
    att_dict['datedisqualified'] = now()
   }
 if ($feature.workstate == 'Confirmed Duplicate' && $feature.dateduplicate == Null) {
     att_dict['dateduplicate'] = now()
    }

  return {
    "result":{
        "attributes":att_dict
             }
         }









//%
//Sent to AV
if (IsEmpty($datapoint.datesenttoav) ==false && $datapoint.avsource != 'USACE') {var sav_sym = '✔'; var sav_color ='50C878'}
else if ($datapoint.qatype == 'Remote' && IsEmpty($datapoint.datesenttoav) == true && $datapoint.avsource != 'USACE') {var sav_sym = '...'; var sav_color ='0000FF'}
else {var sav_sym = ''; var sav_color ='D3D3D3'}

//AV Complete
if (IsEmpty($datapoint.dateavcomplete) ==false && $datapoint.avsource != 'USACE') {var avc_sym = '✔'; var avc_color ='50C878'}
else if (IsEmpty($datapoint.dateavfail) ==false && $datapoint.avsource != 'USACE') {var avc_sym = '<b>X</b>'; var avc_color ='FF0000'}
else if (IsEmpty($datapoint.dateavfail) ==true && IsEmpty($datapoint.datesenttoav) ==false && IsEmpty($datapoint.dateavcomplete) ==true) {var sav_sym = '...'; var sav_color ='0000FF'}
else if ($datapoint.qatype =='Remote' && $datapoint.avsource != 'USACE') {var avc_sym = ''; var avc_color ='FFBF00'}
else {var avc_sym = ''; var avc_color ='D3D3D3'}

//Sent Remote QA
if (IsEmpty($datapoint.dateavcomplete) == false && IsEmpty($datapoint.dateremoteqaassigned)==false) {var srqa_sym = '✔'; var srqa_color ='50C878'}
else if (IsEmpty($datapoint.dateavcomplete) ==false&& IsEmpty($datapoint.dateremoteqaassigned)==true) {var srqa_sym = '...'; var srqa_color ='0000FF'}
else if ($datapoint.qatype =='Remote') {var srqa_sym = ''; var srqa_color ='FFBF00'}
else {var srqa_sym = ''; var srqa_color ='D3D3D3'}

//Remote QA Complete
if (IsEmpty($datapoint.dateqacomplete) == false) {var rqa_sym = '✔'; var rqa_color ='50C878'}
else if (IsEmpty($datapoint.dateremoteqaassigned) == false && IsEmpty($datapoint.dateqacomplete) ==true && IsEmpty($datapoint.dateremoteqafail) == true) {var rqa_sym = '...'; var rqa_color ='0000FF'}
else if (IsEmpty($datapoint.dateremoteqafail) == false) {var rqa_sym = '<b>X</b>'; var rqa_color ='FF0000'}
else if ($datapoint.qatype =='Remote') {var rqa_sym = ''; var rqa_color ='FFBF00'}
else {var rqa_sym = ''; var rqa_color ='D3D3D3'}

//Sent Field QA
if ($datapoint.qatype =='Field' && IsEmpty($datapoint.datefieldqaassigned)==false) {var sfqa_sym = '✔'; var sfqa_color ='50C878'}
else if ($datapoint.qatype =='Field' && IsEmpty($datapoint.datefieldqaassigned)==true) {var sfqa_sym = '...'; var sfqa_color ='0000FF'}
else if ($datapoint.qatype =='Field') {var sfqa_sym = ''; var sfqa_color ='FFBF00'}
else {var sfqa_sym = ''; var sfqa_color ='D3D3D3'}

//Field QA Complete
if ($datapoint.qatype =='Field' && IsEmpty($datapoint.dateqacomplete)== false) {var fqa_sym = '✔'; var fqa_color ='50C878'}
else if ($datapoint.qatype =='Field' && IsEmpty($datapoint.datefieldqaassigned)==false) {var fqa_sym = '...'; var fqa_color ='0000FF'}
else if ($datapoint.qatype =='Field') {var fqa_color = ''; var fqa_color ='FFBF00'}
else {var fqa_sym = ''; var fqa_color ='D3D3D3'}

//QAS Approved
if(IsEmpty($datapoint.dateqacomplete)== false && IsEmpty($datapoint.dateqaspass)== true) {var qas_sym = '...'; var qas_color ='0000FF'}
else if (IsEmpty($datapoint.dateqaspass)== false) {var qas_sym = '✔'; var qas_color ='50C878'}
else {var qas_sym = ''; var qas_color ='FFBF00'}

//Sent to Ktr
if (IsEmpty($datapoint.dateqaspass)== false && IsEmpty($datapoint.datesenttocontractor)== true) {var sqc_sym = '...'; var sqc_color ='0000FF'}
else if (IsEmpty($datapoint.datesenttocontractor)== false) {var sqc_sym = '✔'; var sqc_color ='50C878'}
else {var sqc_sym = ''; var sqc_color ='FFBF00'}

//Dispute Resolved
if ($datapoint.opendispute== "Open") {var dr_sym = '...'; var dr_color ='0000FF'}
else if ($datapoint.opendispute== "Closed") {var dr_sym = '✔'; var dr_color ='50C878'}
else {var dr_sym = ''; var dr_color ='D3D3D3'}

//QC Complete
if (IsEmpty($datapoint.datecontractorcomplete)== true && IsEmpty($datapoint.datesenttocontractor)== false) {var qc_sym = '...'; var qc_color ='0000FF'}
else if (IsEmpty($datapoint.datecontractorcomplete)== false) {var qc_sym = '✔'; var qc_color ='50C878'}
else {var qc_sym = ''; var qc_color ='FFBF00'}

//Sent FI
if (IsEmpty($datapoint.datecontractorcomplete)== false && IsEmpty($datapoint.datepassedfi)== true && IsEmpty($datapoint.datefailedfi)== true) {var fi_sym = '...'; var fi_color ='0000FF'}
else if (IsEmpty($datapoint.datepassedfi)== false) {var qc_sym = '✔'; var qc_color ='50C878'}
else if (IsEmpty($datapoint.datepassedfi)== true && IsEmpty($datapoint.datefailedfi)== false) {var fi_sym = '<b>X</b>'; var fi_color ='FF0000'}
else {var qfi_sym = ''; var fi_color ='FFBF00'}

//Invoice
if (IsEmpty($datapoint.datepassedfi)== false && IsEmpty($datapoint.datepaid)== true) {var si_sym = '...'; var si_color ='0000FF'}
else if (IsEmpty($datapoint.dateinvoiced)== false) {var si_sym = '✔'; var si_color ='50C878'}
else {var si_sym = ''; var si_color ='FFBF00'}

return {
  textColor: '#ffffff',
  backgroundColor: '',
  separatorColor:'#ffffff',
  selectionColor: '##001242',
  selectionTextColor: '',
  attributes: {
     s1: sav_sym,
     c1: sav_color,
     s2: avc_sym,
     c2: avc_color,
     s3: srqa_sym,
     c3: srqa_color,
     s4: rqa_sym,
     c4: rqa_color,
     s5: sfqa_sym,
     c5: sfqa_color,
	 s6: fqa_sym,
	 c6:fqa_color,
	 s7:qas_sym,
	 c7:qas_color,
	 s8:sqc_sym,
	 c8:sqc_color,
	 s9:'',
	 c9:'',
	 s10:dr_sym,
	 c10:dr_color,
	 s11:qc_sym,
	 c11:qc_color,
	 s12:'',
	 c12:'',
	 s13:'',
	 c13:'',
	 s14:fi_sym,
	 c14:fi_color,
	 s15:si_sym,
	 c15:si_color
   }
}
