/**
 * SellerController
 *
 * @description :: Server-side logic for managing sellers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'newAuction': function(request,response,next){
        var sha256 = require('sha256');
        var d = new Date().toString();
        var slat = sha256(d);
        var user = sha256(request.session.user.email);
        slat = user+slat;
        return response.render('dashboard/seller/newAuction.ejs', {uid: slat, session: request.session.user});
    },
    'createAuction': function(request,response,next){
        if(request.body.itemUniqueID && request.body.itemName && request.body.itemDesc && request.body.itemPrice && request.body.itemStart && request.body.itemEnd){
            var item = {
                uid: request.body.itemUniqueID,
                name: request.body.itemName,
                description: request.body.itemDesc,
                priceStart: request.body.itemPrice,
                currentBid: request.body.itemPrice, 
                bidStart: request.body.itemStart,
                bidEnd: request.body.itemEnd,
                seller: request.session.user.id,
                bids: [],
            };
            sails.sockets.broadcast("liveAuction","newAuction", {
                uid: request.body.itemUniqueID,
                name: request.body.itemName,
                priceStart: request.body.itemPrice,
                currentBid: request.body.itemPrice, 
                bidStart: request.body.itemStart,
                bidEnd: request.body.itemEnd,
            });
            Auction.create(item).exec(function(auctionCreateError,auctionCreateResult){
                if(auctionCreateError){
                }
                else{
                    console.log(auctionCreateResult);
                    return response.redirect('/auction/'+request.body.itemUniqueID);
                }
            });
        }
        else{
            return response.render('dashboard/seller/newAuction.ejs', {'error': "All Fields are Required",  session: request.session.user});
        }
    }
};

