//Tasking Number
var inputString = $feature.tasking_number;
if (TypeOf(inputString) == 'String'){
var charcount = Count(inputString);
if (charcount > 1){
var lastCharacter = inputString[charcount-1];
var subString = Mid(inputString,0,charcount-1)

var alpha = ["A", "B", "C","D", "E", "F", "G", "H", "I","a", "b", "c","d", "e", "f", "g", "h", "i"];

if (IndexOf(alpha, lastCharacter) >= 0) {
  return {
  "result":{
      "attributes": {'tasking_designator':Upper(lastCharacter),'tasking_number_base':substring}
           }
       }
} 
}
return {
  "result":{
      "attributes": {'tasking_number_base':$feature.tasking_number,'tasking_designator':Null}
           }
       }
}

//Gen Naming
var records = Filter($featureset, "parentglobalid = '"+$feature.parentglobalid+"' AND gen_tasking_number = '"+$feature.gen_tasking_number+"'");
var dis = Distinct(records,['gen_barcode'])
var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
return {
  "result":{
      "attributes": {'gen_designator': letters[Count(dis)-1]}
           }
       }
