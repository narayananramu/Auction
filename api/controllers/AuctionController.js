/*
 * AuctionController
 *
 * @description :: Server-side logic for managing auctions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'auction': function(request,response,next){
        Auction.find({'uid': request.param('uid')}).exec(function(auctFail, auctResult){
            if(auctFail){
                console.log(auctFail);
            }
            else{
                return response.render('dashboard/auction/auction.ejs',{auction: auctResult, session: request.session.user, moment: require('moment')});
            }
        });
    },
    'getBids': function(request,response,next){
        Auction.find({'uid': request.param('uid')}).exec(function(auctFail, auctResult){
            if(auctFail){
                console.log(auctFail);
            }
            else{
                sails.sockets.emit(request.socket, 'bids', {bids: auctResult[0].bids});
                return response.json({status: "Ok!"});
            }
        });
    },
    'placeBid': function(request,response,next){
        if(request.session.authenticatedA != "Seller"){
            console.log("Enter");
             Auction.find({'uid': request.param('uid')}).exec(function(auctFail, auctResult){
                 if(auctFail){
                     console.log(auctFail);
                 }
                 else{
                     var bid = {
                         bid: request.param('bid'),
                         buyerId: request.session.user.id,
                         buyerName: request.session.user.name,
                         buyerEmail: request.session.user.email,
                         time: new Date()
                     }
                     var bids = auctResult[0].bids;
                     bids.push(bid);
                     auctResult[0].bids = bids;
                     auctResult[0].currentBid = bid.bid;
                     
                     sails.sockets.broadcast(request.param('uid'), 'aBidUpdate', {currentBid: auctResult[0].currentBid, bid: bid});
                     sails.sockets.broadcast("liveAuction","aBidUpdate",{
                                 uid: auctResult[0].uid,
                                 currentBid: auctResult[0].currentBid
                             });
                     
                     Auction.update({'uid': request.param('uid')},auctResult[0]).exec(function(auctUpFail,auctUpRes){
                         if(auctUpFail){
                            console.log(auctUpFail);
                         }
                         else{
                             return response.json({status: "Ok!"});
                         }
                     });
                 }
            });
        }
    },
    'joinAuctionRoom': function(request,response,next){
        sails.sockets.join(request.socket, request.param('uid'));
        return response.json({res: "Done!"});
    }
};

