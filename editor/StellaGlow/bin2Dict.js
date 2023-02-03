
function bin_reader(a) {
        let count = 0;
        let counts=0;
        let temp=[];
        for (let i of a)
        {
            temp.push(i)
        }
        for (let i of temp.reverse()) {
        let k=i.charCodeAt(0)
          let b=k%16;
          let c=(k-b)/16;
          count = count * 16 + c;
          count = count * 16 + b;
        }
        return count;
      }
      
function handleFileSelect(data) {
        //index
          let characters_list = ['Alto','Lisette','Klaus','Rusty','Archibald','Ewan','Popo','Nonoka','Sakuya','Keith','Mordimort','Dorothy','Dante','Hilda','Veronica','Giselle'];
          let characters_values = ['Status','Level','Experience Points','Weapon','Armor', 'Accessory','Item 1','Item 2' ];
          //let game_values = ['Playtime', 'ClearCount', 'Chapter', 'Chapter phase', 'Money'];
        //5 weapon orb
          for (let i = 0; i < 5; i++) {
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
          let start_point = 140;

        //Read each character
          for (let character of characters_list) {
            dicts[character]['Status'] = bin_reader(data[start_point]);
            start_point += 4;
            dicts[character]['Level'] = bin_reader(data[start_point]);
            start_point += 1;
            dicts[character]['Experience Points'] = bin_reader(data[start_point]);
            start_point += 5;
            for (let value of characters_values.slice(3)) {
              dicts[character][value] = bin_reader(data.slice(start_point, start_point + 2));
            }
            
        }
        return dicts;
    }
    
export { handleFileSelect };