function generateSerialNumber() {

    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    const dateNow = Date.now()

    const letters = ()=>{

        let temp = [];
    
        for (let i = 0; i < alphabet.length; i++) {

              const random = Math.floor((Math.random() * alphabet.length));
        
            const item = alphabet[random];
            temp.push(item)

        }
        
        return temp

    }
    const res = letters().slice(0, 6);
    const slicedNumber = dateNow.toString().split('');

//letters divided into 2
    const firstLetters = res.slice(0, res.length / 2);
    const lastLetters = res.slice(res.length / 2)
    
//numbers divided into 3
    const firstSetNumbers =slicedNumber.slice(0,4);
    const middleSetNumbners = slicedNumber.slice(4,8);
    const lastSetNumbers = slicedNumber.slice(8,13);

    
//merge all arrays together
    const serialNumber = [...firstSetNumbers,...firstLetters,...middleSetNumbners,...lastLetters,...lastSetNumbers];


    //join all text together to form a serial number
   return serialNumber.join('')
}

module.exports = generateSerialNumber;
