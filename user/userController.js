const userModel = require('../user/userModel');
const bcrypt = require('bcryptjs');

module.exports.eventSignUp = async (req, res) => {
  let { name, email, password } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();

  if (name == "" || email == "" || password == ""){
    res.json({
        status: "Invalid",
        message: "Empty Input field"
    });
  }else if (!/^[a-zA-Z]*$/.test(name)){
    res.json({
        status: "Invalid",
        message: "Invalid name entered",
    });
}else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
    res.json({
        status: "Invalid",
        message: "Invalid email"
    })
}else if(password.length< 8){
    res.json({
        status: "Invalid",
        message: "Invalid password"
    })
}else{
    //check if user already exists
    userModel.findOne({email}).then(result => {
       if(result ){
        res.json({
            
                status: "Invalid",
                message: "already email exists"
           
        })
    }else{
        //try to create new user

        //password handling
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds).then(hashedPassword => {
            const newUser = new userModel({
                name,
                email,
                password: hashedPassword,
            });
            newUser.save().then(result => {
                res.json({
                    status: "success",
                    message: "SignUp successful",
                    data : result,
                })
                    }).catch(err => {
                        res.json({
                            status: "Invalid",
                            message: "Error occured in creaeting user"
                        })
                    })
        }).catch(err => {
            res.json({
                status: "Invalid",
                message: "error while hashing password!"
            })
        })

    }
    }).catch(err =>{
        console.error(err);
        res.json({
            status: "Invalid",
            message: "error"
        })
    })

}
}

module.exports.eventSignIn = async (req, res) => {
    let { email , password } = req.body;
    email = email.trim();
    password = password.trim();

    if(email == "" || password == ""){
        res.json({
            status: "Invalid",
            message: "Empty credentials"
        })
    }else {
        userModel.findOne({email})
        .then(data => {
        if(data){
            const hashedPassword = data.password;
            bcrypt.compare(password, hashedPassword).then(result => {
                if(result){
                    res.json({
                        status: "Success",
                        message: "Signed in successfully",
                        data: data
                    })
                }else{
                    res.json({
                        status: "Failure",
                        message: "Incorrect password"
                    })
                }
            }).catch(err => {
                res.json({
                    status: "FAILURE",
                    message: "Error while comparing",
                   
                })
            })
        }else{
            res.json({
                status: "FAILED",
                message: "Inappropriate credentials entered",
            })
        }
    }).catch(err=>{
        res.json({
            status: "Failed",
            message: " An error occurred while checking the exsistentials"
        })
    })

    }
    
}
