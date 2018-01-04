$(document).ready(function(){
    io.socket.get('/live');
    io.socket.on("newAuction",function(data){
        console.log(data);
        bstime = moment(data.bidStar).calendar();
        betime = moment(data.bidEnd).calendar();
        row = $("<tr></tr>");
        item = $("<td><a href='/auction/"+data.uid+"'>"+data.name+"</td>");
        sbid = $("<td>"+data.priceStart+"</td>");
        cbid = $("<td data-uid="+data.uid+" class=''>"+data.currentBid+"</td>");
        bs = $("<td>"+bstime+"</td>");
        be = $("<td>"+betime+"</td>");
        row.append(item,sbid,cbid,bs,be);
        $("table#tb").prepend(row);
        console.log(row);
    });
    io.socket.on("aBidUpdate",function(data){
        console.log(data);
        $("td[data-uid="+data.uid+"]").html(data.currentBid);
        $("td[data-uid="+data.uid+"]").addClass("bg-success");
        setTimeout(function(){
            $("td[data-uid="+data.uid+"]").removeClass("bg-success");
        },5000);
    });
});