function reverse_bin_reader_legacy(decimal,min_range) {
    let binary = decimal_to_binary(decimal);
    let reverse_binary = '';
    let padding = 8 - binary.length % 8;
    for (let i = 0; i < padding; i++) {
      reverse_binary += '0';
    }
    
    reverse_binary += binary;
    padding = min_range-reverse_binary.length/8
    for (let i =0;i<padding;i++)
    {
      reverse_binary='00000000'+reverse_binary
    }
    let result = '';
    for (let i = 0; i < reverse_binary.length; i += 8) {
      let chunk = reverse_binary.substr(i, 8);
      let ascii = parseInt(chunk, 2);
      result = String.fromCharCode(ascii)+result;
    }
    return result;
  }
  