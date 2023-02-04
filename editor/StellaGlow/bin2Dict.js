
function bin_reader(a) {
  let count=0
  if (typeof a === 'number')
  {
  a=[a]
  }
  for (let i = a.length-1; i >=0 ; i--)
  {
    let b=a[i]%16
    let c=(a[i]-b)/16
    count=count*16+c
    count=count*16+b
  }
        return count;
      }
  function reverse_bin_reader(decimal,minimal=1) {
        let result =new Uint8Array(minimal);
        let counts=0;
        while (decimal > 0) {
          let b = decimal % 16;
          decimal = (decimal - b) / 16;
          let c = decimal % 16;
          decimal = (decimal - c) / 16;
          result[counts]=c * 16 + b;
          counts++;
        }
        return new Uint8Array(result);
      }

function handleFileSelect(data) {
        //index
          let characters_list = []//['Alto','Lisette','Klaus','Rusty','Archibald','Ewan','Popo','Nonoka','Sakuya','Keith','Mordimort','Dorothy','Dante','Hilda','Veronica','Giselle'];
          let characters_values = ['Status','Level','Experience Points','Weapon','Armor', 'Accessory','Item 1','Item 2' ];
          //let game_values = ['Playtime', 'ClearCount', 'Chapter', 'Chapter phase', 'Money'];
        //5 weapon orb
        for (let i = 1; i < 17; i++)
        {
          characters_list.push(`${i}`)
        }
          for (let i = 1; i <= 5; i++) {
            characters_values.push(`Weapon Orb ${i}`);
          }
        //Create a Character template
          let temp = {};
          for (let value of characters_values) {
            temp[value] = 0;
          }
        //Create dict
          let dicts = {};
          for (let character of characters_list) {
            dicts[character] = { ...temp };
          }
          dicts['ClearCount'] = bin_reader(data[32]);
          dicts['Chapter'] = bin_reader(data[68]);
          dicts['Chapter phase'] = bin_reader(data[72]);
          dicts['Money'] = bin_reader(data.slice(96, 100));
          console.log(bin_reader(reverse_bin_reader(dicts['Money'],4)))
          let start_point = 140;  

        //Read each character
          for (let character of characters_list) 
          {
            dicts[character]['Status'] = bin_reader(data[start_point]);
            start_point += 4;
            dicts[character]['Level'] = bin_reader(data[start_point]);
            start_point += 1;
            dicts[character]['Experience Points'] = bin_reader(data[start_point]);
            start_point += 5;
            for (let value of characters_values.slice(3)) 
            {
              dicts[character][value] = bin_reader(data.slice(start_point, start_point + 2));
              start_point += 2;
            }
            
        }
        return dicts;
    }

function applyChange(org,data)
{
  let temp=org,org_array=[];
  let org_length=org.length;
  for (let i=0;i<org_length;i++)
  {
  org_array.push(org[i])
  }
  org=org_array
  let characters_values = ['Status','Level','Experience Points','Weapon','Armor', 'Accessory','Item 1','Item 2','Weapon Orb 1','Weapon Orb 2','Weapon Orb 3','Weapon Orb 4','Weapon Orb 5' ];
  let characters_list = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16']
  org.splice(32,1,reverse_bin_reader(data['ClearCount'],1));
  org.splice(68,1,reverse_bin_reader(data['Chapter'],1))
  org.splice(72,1,reverse_bin_reader(data['Chapter phase'],1))
  org.splice(96,4,...reverse_bin_reader(data['Money'],4))
  let start_point = 140
  for( let character in characters_list.values())
  {
    org.splice(start_point,1,reverse_bin_reader(data[character]['Status'],1));start_point+=4;
    org.splice(start_point,1,reverse_bin_reader(data[character]['Level'],1));start_point+=1;
    org.splice(start_point,1,reverse_bin_reader(data[character]['Experience Points'],1));start_point+=5;

    for (let value in characters_values.slice(3))
    {
      org.splice(start_point,2,...reverse_bin_reader(data[character][value],2));start_point+=2;
    }
  }
  let org_new=""
  for (let i=0;i<org_length;i++)
  {
  org_new+=org[i]
  }
  org=org_new
  //navigator.clipboard.writeText(org)
return org
}
function save(filename, org,data) {
 let new_org=org//applyChange(org,data)
 console.log(new_org)
 const blob = new Blob([new_org],{ type: 'application/octet-stream' });
  if(window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, filename);
  } 
  else{
      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;        
      document.body.appendChild(elem);
      elem.click();        
      document.body.removeChild(elem);
  }
  return new_org
}
export { handleFileSelect,save };