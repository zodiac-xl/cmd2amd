let binaryArr2int = (binaryArr, binaryLength)=> {
    //maxLength =20
    let num2 = '00000000000000000000'.slice(-binaryLength);

    num2 = num2.split('');
    binaryArr.forEach((item)=> {
        if (binaryLength < item) {
            console.log('binarymap2int 中binaryLength设置错误')
        }
        num2[binaryLength - item] = 1;
    });
    num2 = num2.join('');
    return parseInt(num2, 2).toString(10);
};


//竞对，"type"为4-动态售价时生效，其余传0。二进制表示，
// 第n位分别代表：1-"豆瓣",2-"时光网",5-"格瓦拉",7-"QQ",8-"点评",9-"微信",10-"糯米", 11-"淘宝"。
// 二进制表示选中为1，反之为0。
// 例如11为长度的二进制11100010000=1808表示选中"淘宝","糯米","微信","格瓦拉"。

//1808 = 11100010000  to [11,10,9,5]
let int2binaryArr = (num10, binaryLength)=> {
    //maxLength =20
    let binaryArr = [];
    let num2 = parseInt(num10).toString(2);

    num2 = num2.split('');

    let num2L = num2.length;
    num2.forEach((item, index)=> {
        if (item == 1) {
            binaryArr.push(num2L - index);
        }
    });
    return binaryArr;
};
export default {
    binaryArr2int,
    int2binaryArr
};
