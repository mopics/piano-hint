

export class BinaryConvert {
    static convertBase( num ){
        return {
            from:( baseForm )=>{
                return {
                    to:( baseTo )=>{
                        return parseInt(num, baseForm).toString( baseTo );
                    }
                }
            }
        }
    }
    // binary to decimal
    static bin2dec = function( num:string ){
        return BinaryConvert.convertBase( num ).from( 2 ).to( 10 );
    }
    // binary to heximal
    static bin2hex = function (num) {
        return BinaryConvert.convertBase(num).from(2).to(16); 
    };
    // decimal to binary
    static dec2bin = function (num) {
        return BinaryConvert.convertBase(num).from(10).to(2);
    };
    
    // decimal to hexadecimal
    static dec2hex = function (num) {
        return BinaryConvert.convertBase(num).from(10).to(16);
    };
    
    // hexadecimal to binary
    static hex2bin = function (num) {
        return BinaryConvert.convertBase(num).from(16).to(2);
    };
    
    // hexadecimal to decimal
    static hex2dec = function (num) {
        return BinaryConvert.convertBase(num).from(16).to(10);
    };
}

    /*
    * Usage example:
    * BinaryConvert.bin2dec('111'); // '7'
    * BinaryConvert.dec2hex('42'); // '2a'
    * BinaryConvert.hex2bin('f8'); // '11111000'
    * BinaryConvert.dec2bin('22'); // '10110'
    */