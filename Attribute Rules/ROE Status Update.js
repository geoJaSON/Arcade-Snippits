var att_dict = {}
att_dict['progressstatus'] = When($feature.qatype == 'Remote' && $feature.avsource == Null,'Awaiting AV Assignment',
 $feature.qatype == 'Remote' && $feature.avsource != 'USACE' &&  $feature.avsource != null && $feature.dateavcomplete == Null && $feature.dateavfail == null,'With AV',
 $feature.qatype == 'Remote' && ($feature.dateavcomplete != Null || $feature.avsource == 'USACE') && $feature.remoteqaname == Null,'Awaiting Remote QA Assignment',
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
if ($feature.avsource !='USACE' && $feature.avsource !=null && $feature.datesenttoav == Null) {
     att_dict['datesenttoav'] = now()
   }
if ($feature.invoicenumber != Null && $feature.dateinvoiced == Null) {
     att_dict['dateinvoiced'] = now()
   }
if ($feature.avsource !='USACE' && $feature.avsource !=null && $feature.dateavcomplete == Null) {
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
 if ($feature.get== 'Get' && $feature.progressstatus == 'Awaiting Remote QA Assignment') {
     att_dict['remoteqaname'] = $feature.last_edited_user
     att_dict['progressstatus'] = 'With Remote QA'
     att_dict['dateremoteqaassigned'] = now()
     att_dict['get'] = null
    }

 if ($feature.get== 'Get' && $feature.progressstatus == 'Awaiting Field QA Assignment') {
     var querystring = 'ucopname = '+"'"+$feature.last_edited_user+"'"
     var ps =  First(Filter(FeatureSetByName($datastore, "personnel", ['ucopname','partnersname'], false),querystring))
     if (ps != null) {
         att_dict['fieldqaname'] = ps['partnersname']
         att_dict['progressstatus'] = 'With Field QA'
         att_dict['datefieldqaassigned'] = now()
    } att_dict['get'] = null}

if ($feature.qanamesph != null){
      if ($feature.qatype == 'Field'){
            att_dict['datefieldqaassigned'] = now()
            att_dict['fieldqaname']  = $feature.qanamesph
            att_dict['progressstatus'] = 'With Field QA'}
      if ($feature.qatype == 'Remote'){
            att_dict['dateremoteqaassigned'] = now()
            att_dict['remoteqaname']  = $feature.qanamesph
            att_dict['progressstatus'] = 'With Remote QA'}
      att_dict['qanamesph'] = null}

  return {
    "result":{
        "attributes":att_dict
             }
         }