import { sha3_256 } from 'js-sha3'

export const isAddress = (address) => {
  return address.includes('0x') && address.length == 42;
};

export const isChecksumAddress = (address) => {
  // Check each case
  address = address.replace('0x','');
  //var addressHash = sha3(address.toLowerCase());
	var addressHash = sha3_256(address.toLowerCase());
    for (var i = 0; i < 40; i++ ) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
}
