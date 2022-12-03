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