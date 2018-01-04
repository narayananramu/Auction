/**
 * AuthenaticationController
 *
 * @description :: Server-side logic for managing authenatications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'signin': function(request,response,next){
        response.render('accounts/login.ejs');
    },
    'login': function(request,response,next){
        if(request.body.userEmail && request.body.userPassword && request.body.accountType){
            var id = "Seller";
            if(request.body.accountType == "b"){
                var id = "Buyer";
            }
                
            Accounts.find({email: request.body.userEmail, accountType: id}).exec(function(findEmailError, findEmailResult){
                if(findEmailError){
                    console.log("--------------------------------------");
                    console.info("Error While Finding Exisiting Email!");
                    console.log("--------------------------------------");
                    console.error(findEmailError);
                    return response.render('accounts/login.ejs',{'error': "Internal Server Error!"});
                }
                else{
                    if(findEmailResult.length == 1 && findEmailResult[0].password == request.body.userPassword){
                        request.session.user = findEmailResult[0];
                        request.session.authenticatedAt = new Date()
                        request.session.authenticatedA = findEmailResult[0].accountType;
                        response.redirect('/dashboard');
                    }
                    else{
                        response.render('accounts/login.ejs',{'error': "Invalid Credentials!"});
                    }
                }
            });
        }
        else{
            response.render('accounts/login.ejs',{'error': "All Fields are Required!"});
        }
    }
};

