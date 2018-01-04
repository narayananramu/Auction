module.exports.routes = {
    '/':{
        controller: 'Authentication',
        action: 'signin'
    },
    'GET /register':{
        controller: 'Registration',
        action: 'signup'
    },
    'POST /register':{
        controller: 'Registration',
        action: 'register'
    },
    'GET /login':{
        controller: 'Authentication',
        action: 'signin'
    },
    'POST /login':{
        controller: 'Authentication',
        action: 'login'
    },
    'GET /dashboard':{
        controller: 'Dashboard',
        action: 'dashboard'
    },
    'GET /live':{
        controller: 'Dashboard',
        action: 'liveServer'
    },
    'GET /newAuction':{
        controller: 'Seller',
        action: 'newAuction'
    },
    'POST /newAuction':{
        controller: 'Seller',
        action: 'createAuction'
    },
    'GET /auction/:uid':{
        controller: 'Auction',
        action: 'auction'
    },
    'GET /auction/:uid/bids':{
        controller: 'Auction',
        action: 'getBids'
    },
    'GET /auction/:uid/participate':{
        controller: 'Auction',
        action: 'joinAuctionRoom'
    },
    'POST /auction/:uid/bid':{
        controller: 'Auction',
        action: 'placeBid'
    },
    'GET /logout':{
        controller: 'Dashboard',
        action: 'logout'
    }
};
