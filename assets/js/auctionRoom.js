$(document).ready(function(){
    roomUrl = window.location.href.toString();
    io.socket.get(roomUrl+"/participate",function(data){
    });
    io.socket.get(roomUrl+"/bids",function(data){
    });
    
    io.socket.on("aBidUpdate",function(data){
        var time = moment(data.bid.time).calendar();
        $('input#bidPrice').attr("min",data.currentBid);
        $('input#bidPrice').val(data.currentBid);
        $("label#cbid").html(data.currentBid);
        
        row = $("<tr></tr>");
        item = $("<td>"+data.bid.bid+"</td>");
        sbid = $("<td>"+data.bid.buyerName+"</td>");
        cbid = $("<td>"+data.bid.buyerEmail+"</td>");
        bs = $("<td>"+time+"</td>");
        row.append(item,sbid,cbid,bs);
        $("table#tb").prepend(row);
        
        $("label#cbid").addClass("bg-success");
        setTimeout(function(){
            $("label#cbid").removeClass("bg-success");
        },2000);
        
    });
    
    io.socket.on("bids",function(data){
        for(var i=0; i<data.bids.length; i++){
            var time = moment(data.bids[i].time).calendar();
            row = $("<tr></tr>");
            item = $("<td>"+data.bids[i].bid+"</td>");
            sbid = $("<td>"+data.bids[i].buyerName+"</td>");
            cbid = $("<td>"+data.bids[i].buyerEmail+"</td>");
            bs = $("<td>"+time+"</td>");
            row.append(item,sbid,cbid,bs);
            $("table#tb").prepend(row);
        }
    });
    
    $("button#bidMe").click(function(){
        $(this).prop('disabled',true);
        io.socket.get("/csrfToken", function(token){
            console.log(token);
            console.log(roomUrl+"/bid");
            var a = parseInt($('input#bidPrice').attr("min"));
            var b =  parseInt($('input#bidPrice').val());
            if(b>a){
                io.socket.post(roomUrl+"/bid",{_csrf: token._csrf, bid: $('input#bidPrice').val()}, function(data){
                    $("button#bidMe").prop('disabled',false);
                });
            }
            else{
                alert("Bid Value should be higher the Current Bid Value!");
            }
        });
    });
});