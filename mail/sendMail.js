const nodemailer = require("nodemailer");
const conf = require("./conf");
const transporter = nodemailer.createTransport({
    service:"QQ",
    auth:{
        user:conf.user,
        pass:conf.pass
    }
});

function sendmail(html){
    var option = {
        from:"915100796@qq.com",
        to:"550937586@qq.com",
        subject : '来自node的邮件',
        html : html
    }
    transporter.sendMail(option, function(error, response){
        if(error){
            console.log("fail: " + error);
        }else{
            console.log(`向${response.accepted}发送成功id为${response.messageId}`);
        }
    });
}

sendmail("测试发送邮件");
