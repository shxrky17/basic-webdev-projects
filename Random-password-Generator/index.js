const passwordbox=document.getElementById("password");
const length=12;
const uppercase="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase="abcdefghijklmnopqrstuvwxyz";
const numbers="1234567890";
const symbol="@#$%^&*";

const allchar=uppercase+lowercase+numbers+symbol;
function createpassword(){
    let password="";
    password+=uppercase[Math.floor(Math.random()*uppercase.length)];
    password+=lowercase[Math.floor(Math.random()*lowercase.length)];
    password+=numbers[Math.floor(Math.random()*numbers.length)];
    password+=symbol[Math.floor(Math.random()*symbol.length)];

    while(length>password.length){
        password+=allchar[Math.floor(Math.random()*allchar.length)];
    }
    passwordbox.value=password;

}

function copypassword(){
    passwordbox.select();
    document.execCommand("copy");
}

