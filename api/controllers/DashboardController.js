/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	dashboard: function(request,response,next){
        if(request.session.authenticatedA == "Seller"){
            return response.render('dashboard/seller/dashboard.ejs',{session: request.session.user});
        }
        else{
            return response.render('dashboard/buyer/dashboard.ejs',{session: request.session.user});
        }
    },
    liveServer: function(request,response,next){
        console.log("Attempt");
        if(request.isSocket){
            console.log("Connected");
            sails.sockets.join(request.socket, "liveAuction");
            var query = Auction.find();
            query.sort("id DESC");
            query.limit(10);
            query.exec(function(queryError, queryResult){
                if(queryError){
                    console.log(queryError);
                }
                else{
                    for(var i=(queryResult.length-1); i>=0; i--){
                        sails.sockets.emit(request.socket,"newAuction", {
                            uid: queryResult[i].uid,
                            name: queryResult[i].name,
                            priceStart: queryResult[i].priceStart,
                            currentBid: queryResult[i].currentBid, 
                            bidStart: queryResult[i].bidStart,
                            bidEnd: queryResult[i].bidEnd,
                        });
                    }
                    return response.json({status: "Ok!"});
                }
            });
        }
        else{
            response.json("Only Sockets!");
        }
    },
    logout: function(request,response,next){
        request.session.destroy();
        return response.redirect("/");
    }
};

