/**
 * RegistrationController
 *
 * @description :: Server-side logic for managing registrations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'signup': function(request,response,next){
        return response.render('accounts/register.ejs');
    },
	'register': function(request,response,next){
        if(request.body.accountType && request.body.userEmail && request.body.userName && request.body.userPassword && request.body.userRepassword){
            Accounts.find({email: request.body.userEmail}).exec(function(findEmailError,findEmailResult){
                if(findEmailError){
                    console.log("--------------------------------------");
                    console.info("Error While Finding Exisiting Email!");
                    console.log("--------------------------------------");
                    console.error(findEmailError);
                    return response.render('accounts/register.ejs',{'error': "Internal Server Error!"});
                }
                else{
                    if(request.body.userPassword == request.body.userRepassword){
                        if(findEmailResult.length == 0){
                            var accountType = "Buyer";
                            if(request.body.accountType == "b"){
                                accountType = "Buyer";
                            }
                            else if(request.body.accountType == "s"){
                                accountType = "Seller";
                            }
                            else{
                                return response.render('accounts/register.ejs',{'error': "Invalid Account Type!"}); 
                            }
                            var user = {
                                'accountType': accountType,
                                'email': request.body.userEmail,
                                'name':request.body.userName,
                                'password':request.body.userPassword
                            }
                            Accounts.create(user).exec(function(createUserError,createUserResult){
                                if(createUserError){
                                    console.log("--------------------------------------");
                                    console.info("Error While Creating User!");
                                    console.log("--------------------------------------");
                                    console.error(findEmailError);
                                    return response.render('accounts/register.ejs',{'error': "Internal Server Error!"});
                                }
                                else{
                            return response.render('accounts/register.ejs',{'success': "Your Account has been created successfully!"});
                                }
                            });
                        }
                        else{
                            return response.render('accounts/register.ejs',{'error': "E-mail Address already in use!"});
                        }
                    }
                    else{
                        return response.render('accounts/register.ejs',{'error': "Password Mismatch"});
                    }
                    
                }
            });
        }
        else{
            return response.render('accounts/register.ejs',{'error': "All Fields are Required!"});
        }
    }
};

