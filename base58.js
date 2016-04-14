var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = alphabet.length;

// encode function converts base10 number to base58 string
function encode(num){
  var encoded = "";
  while(num){
    var remainder = num % base;
    num = Math.floor(num/base);
    encoded = alphabet[remainder].toString() + encoded;
  }
  return encoded;
}

// decode function to convert base58 string to base10 number
    function decode(string){
      var decoded = 0;
      while(string){
        var index = alphabet.indexOf(string[0]);
        var power = string.length - 1;
        decoded += index * (Math.pow(base, power));
        string = string.substring(1);
      }
      return decoded;
    }
