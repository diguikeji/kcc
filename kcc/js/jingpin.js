var product_line_id=GetQueryString("product_line_id");

var nameList = ['好奇','高洁丝','舒洁'];
var brandIndex = GetQueryString("index");
					
//随机颜色
function getRandomColor(index){ 
	// return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
	var brand_name = nameList[brandIndex];
	 if(index == 0){
		 if(brand_name == "好奇"){
			 
			 
			 
			return "#CF102D";
		 }else if(brand_name == "高洁丝"){
			return "#EA002A";
		 }else if(brand_name == "舒洁"){
			 
			return "#278ED0";
		 }else{
			return "#CF102D";
		 }
		 
	 }else if(index == 1){
		 if(brand_name == "好奇"){
		 			return "#FF3D00";
		 }else if(brand_name == "高洁丝"){
		 			return "#FF3D00";
		 }else if(brand_name == "舒洁"){
		 			return "#00A8FF";
					
		 }else{
		 			return "#FF3D00";
		 }
		 
	 }else if(index == 2){
		 if(brand_name == "好奇"){
		 			return "#FF9E80";
		 }else if(brand_name == "高洁丝"){
		 			return "#FF9E80";
		 }else if(brand_name == "舒洁"){
		 			return "#51C4FF";
		 }else{
		 			return "#FF9E80";
		 }
		 
	 }else if(index == 3){
		 if(brand_name == "好奇"){
		 			return "#FFBC80";
		 }else if(brand_name == "高洁丝"){
		 			return "#FFBC80";
		 }else if(brand_name == "舒洁"){
		 			return "#B3E5FC";
		 }else{
		 			return "#FFBC80";
		 }
		 
	 }else if(index == 4){
		 if(brand_name == "好奇"){
		 			return "#FFD480";
		 }else if(brand_name == "高洁丝"){
		 			return "#FFD480";
		 }else if(brand_name == "舒洁"){
		 			return "#BBDEFB";
		 }else{
		 			return "#FFD480";
		 }
		 
	 }else if(index == 5){
		 if(brand_name == "好奇"){
		 			return "#FFE398";
		 }else if(brand_name == "高洁丝"){
		 			return "#FFE398";
		 }else if(brand_name == "舒洁"){
		 			return "#80DEEA";
		 }else{
		 			return "#FFE398";
		 }
		 
	 }else if(index == 6){
		 if(brand_name == "好奇"){
		 			return "#FFFE80";
		 }else if(brand_name == "高洁丝"){
		 			return "#FFFE80";
		 }else if(brand_name == "舒洁"){
		 			return "#B2EBF2";
		 }else{
		 			return "#FFFE80";
		 }
	 }else{
		 if(brand_name == "好奇"){
		 	brand_color1 = "#FFFE80";
			var r = parseInt(brand_color1.substring(1,3)+'', 16); 
			var g = parseInt(brand_color1.substring(3,5)+'', 16);
			var b = parseInt(brand_color1.substring(5,7)+'', 16);
			var temp = (1-(index-6)*0.2);
			var a = temp.toFixed(1);
			return "rgba("+r+","+g+","+b+","+a+")";
				
		 }else if(brand_name == "高洁丝"){
		 	
			brand_color1 = "#FFFE80";
			var r = parseInt(brand_color1.substring(1,3)+'', 16); 
			var g = parseInt(brand_color1.substring(3,5)+'', 16);
			var b = parseInt(brand_color1.substring(5,7)+'', 16);
			var temp = (1-(index-6)*0.2);
			var a = temp.toFixed(1);
			return "rgba("+r+","+g+","+b+","+a+")";
			
		 }else if(brand_name == "舒洁"){
		 	
			brand_color1 = "#B2EBF2";
			var r = parseInt(brand_color1.substring(1,3)+'', 16); 
			var g = parseInt(brand_color1.substring(3,5)+'', 16);
			var b = parseInt(brand_color1.substring(5,7)+'', 16);
			var temp = (1-(index-6)*0.2);
			var a = temp.toFixed(1);
			return "rgba("+r+","+g+","+b+","+a+")";
			
		 }else{
		 	
			brand_color1 = "#B2EBF2";
			var r = parseInt(brand_color1.substring(1,3)+'', 16); 
			var g = parseInt(brand_color1.substring(3,5)+'', 16);
			var b = parseInt(brand_color1.substring(5,7)+'', 16);
			var temp = (1-(index-6)*0.1);
			var a = temp.toFixed(1);
			return "rgba("+r+","+g+","+b+","+a+")";
			
		 }
		 
		
	 }
	
};

mui.plusReady(function() {
	
	

httpRequest();
var message_id=GetQueryString("message_id")
if(message_id)
{
    var wo=plus.webview.currentWebview().opener();
    wo.evalJS("updateStatus('"+message_id+"');");
}


});

$(".shoucang").on("touchstart",function()
{


        Global.commonAjax({
            url: 'app/collect/add-product-line/',
            data:{product_line_id:product_line_id},
            method: 'POST'
        }, function(data){

            console.log("收藏产品线返回数据");
            console.log(JSON.stringify(data));
            if($(".shoucang").hasClass("active"))
            {
                $(".shoucang").removeClass("active")
                mui.toast("取消收藏成功");
            }
            else {
                $(".shoucang").addClass("active")
                mui.toast("收藏成功");
            }
            
            var h = plus.webview.getWebviewById("html/shoucang.html");
			mui.fire(h,'dataRefresh');

        },function(err)
        {
            console.log("收藏产品线返回数据失败"+err);
        });


});



//竞品对比
var competing_product_lines;
//内部对比
var category_product_lines;
//尺寸对比
var sizes;

var product_line_name;

var brandColor;
function httpRequest()
{
    Global.commonAjax({
        url: 'app/brand/get-product-line-info/',
        data:{product_line_id:product_line_id},
        method: 'GET'
    }, function(data){

        console.log("获取产品线信息返回数据");
        console.log(JSON.stringify(data));
        data=data.product_line_info;
        $("#sizes").empty();
        
        if(data.sizes.length>0)
        {
        	data.sizes.splice(0,0,{size:"全部",size:"全部"});
        }
        
        for(var i=0;i<data.sizes.length;i++)
        {
			$("#sizes").append("<div>"+data.sizes[i].size+"</div>");
        }
        $("#sizes div").eq(0).addClass("active");
        $("#product_line_icon").attr("src",baseServerUrl+data.product_line_icon);
        $("#product_line_name").text(data.product_line_name);
        $("#pinglunCount").text(data.product_line_name);
		product_line_name = data.product_line_name;
		brand_color1 = data.brand_color1;
		$("#titleLine").css({"background":brand_color1});
		$("#titleLine2").css({"background":brand_color1});
		$("#titleLine3").css({"background":brand_color1});
		// $("#bottomCol .active").css({"color":brand_color1});
		$(".jingpin-bottom .right .active").css({"color":brand_color1});
		$("#pinglunCount").css({"color":brand_color1});
		
		console.log(brand_color1);
		brandColor=brand_color1;
        competing_product_lines=data.competing_product_lines;

        sizes=data.sizes;
       
        if(sizes.length==0)
        {
        	$("#bottomCol div").eq(2).hide();
        }
        
        category_product_lines=data.category_product_lines;
		
		// console.log(JSON.stringify(category_product_lines));

        if(data.is_my_collect)
        {
            $(".shoucang").addClass("active");
        }

        getCondition();


    },function(err)
    {
        console.log("获取产品线信息返回数据失败"+err);
    });
}


function clearAll()
{
	if(myChart0)
	{
		myChart0.dispose();
	}
	if(myChart1)
	{
		myChart1.dispose();
	}
	if(myChart2)
	{
		myChart2.dispose();
	}

}

var sizesList=[];
function firstInitData()
{
	//alert($("#jingpinRow2").html());
	
    sizesList=[];
    $("#rightModal").hide();
    clearAll();

    $("#jingpinTop").empty();
    

    if($("#bottomCol .active").text()=="尺码对比")
    {

		$(".header-title").text("尺码对比");
        for(var i=1;i<sizes.length;i++)
        {
            var obj={};
            var colorValue=colorList[i+1];
            obj.color=colorValue;
            obj.name=sizes[i].size;
            obj.tag=sizes[i].tag;

            $("#jingpinTop").append('<span class="jingpin-top-detail">' +
                '<span class="quan2 quan" style="background: '+colorValue+';">' +
                '</span>'+sizes[i].size+'</span>');

            sizesList.push(obj);

        }
        huaxian(sizes,3);
		// $("#bottomCol .active").css({"color":brand_color1});
    }

    if($("#bottomCol .active").text()=="竞品对比")
    {
    	$(".header-title").text("竞品对比");
        for(var i=0;i<competing_product_lines.length;i++)
        {
            var colorValue=colorList[i];
			if(competing_product_lines[i].product_line_name == product_line_name){
				colorValue = brand_color1;
			}
            competing_product_lines[i].color=colorValue;
			console.log(colorValue);
            competing_product_lines[i].name= competing_product_lines[i].product_line_name;
            $("#jingpinTop").append('<span class="jingpin-top-detail">' +
                '<span class="quan2 quan" style="background: '+colorValue+';">' +
                '</span>'+competing_product_lines[i].product_line_name+'</span>');
        }

        huaxian(competing_product_lines,1);
		// $("#bottomCol .active").css({"color":brand_color1});
    }

    if($("#bottomCol .active").text()=="内部对比")
    {
		$(".header-title").text("内部对比");
        for(var i=0;i<category_product_lines.length;i++)
        {
            var colorValue=colorList[i];
			if(i == 0){
				colorValue = brand_color1;
			}
			
			//修复问题
			if(category_product_lines[i].product_line_name.indexOf("T6") != -1){
				colorValue = "#AC6A00";
			}else if(category_product_lines[i].product_line_name.indexOf("T5") != -1){
				colorValue = "#F9AC90";
			}else if(category_product_lines[i].product_line_name.indexOf("T4") != -1){
				colorValue = "#FFF100";
			}else if(category_product_lines[i].product_line_name.indexOf("T3") != -1){
				colorValue = "#BFBFBF";
			}else {
				
			}
			
			
            category_product_lines[i].color=colorValue;
            category_product_lines[i].name= category_product_lines[i].product_line_name;

            $("#jingpinTop").append('<span class="jingpin-top-detail">' +
                '<span class="quan2 quan" style="background: '+colorValue+';">' +
                '</span>'+category_product_lines[i].product_line_name+'</span>');
        }
		
		//console.log($("#jingpinTop").html());
        
        huaxian(category_product_lines,2);
		// $("#bottomCol .active").css({"color":brand_color1});
    }




}

//组装数据
function createChartData()
{
	
	if($("#bottomCol .active").text()=="竞品对比")
    {
        var list=competing_product_lines;
    }
    else if($("#bottomCol .active").text()=="内部对比")
    {
        var list=category_product_lines;
    }
    else
    {
        var list=sizesList;
    }
	
	        var data=duibiData;
	
			var typeStr=$(".chart-tab-col .active").text();
			
            var listValue=[];
	        for(var i=0;i<list.length;i++)
            {
                list[i].data=[];
                list[i].xData=[];
                list[i].yData=[];
                list[i].data1=[];
                
                list[i].data11=[];
                list[i].data12=[];
                list[i].data13=[];
                list[i].data14=[];
                list[i].data15=[];
                
                if(data.trends[typeStr])
                {
                	for(var j=0;j<data.trends[typeStr].length;j++)
	                {
	                    if(list[i].name==data.trends[typeStr][j].product_line_name)
	                    {
	                        var obj={
	                            x:data.trends[typeStr][j].week,
	                            y:data.trends[typeStr][j].total
	                        };
	                        list[i].xData.push(data.trends[typeStr][j].week);
	                        list[i].yData.push(data.trends[typeStr][j].total);
	                        list[i].data.push(obj);
	                    }
	                }
                }
                
                
                for(var j=0;j<data.totals.length;j++)
                {
                	if(list[i].name==data.totals[j].product_line_name)
                	{
                		 var obj={
                		 	attr:data.totals[j].attr,
                            total:data.totals[j].total,
                            tag:data.totals[j].tag,
                            sig_tag:data.totals[j].sig_tag,
                            total_ratio:data.totals[j].total_ratio
                        };
                        list[i].data1.push(obj);
                        
                        list[i].data11.push(data.totals[j].attr);
                        list[i].data12.push(data.totals[j].total);
                        list[i].data13.push(data.totals[j].total_ratio);
                        list[i].data14.push(data.totals[j].tag);
                        list[i].data15.push(data.totals[j].sig_tag);
                        
                	}
                }

                listValue.push( list[i].data.length);
                
            }

			//图表数据组装
            var maxIndex=listValue.indexOf(Math.max.apply(Math, listValue));
            for(var i=0;i<list.length;i++)
            {
            	list[i].endData1=trendsList;
                list[i].endData2=[];
                list[i].endData3=[];
                list[i].endData4=[];
                list[i].endData5=[];
            	
            	for(var key in duibiData.trends)
            	{
            		if(list[i].data11.indexOf(key)==-1)
            		{
            			list[i].endData2.push(0);
            			list[i].endData3.push(0);
            		}
            		else{
            			
            			for(var j=0;j<list[i].data1.length;j++)
            			{
            				if(key==list[i].data1[j].attr)
            				{
            					list[i].endData2.push(list[i].data1[j].total);
            					list[i].endData3.push(list[i].data1[j].total_ratio);
            					list[i].endData4.push(list[i].data1[j].tag);
            					list[i].endData5.push(list[i].data1[j].sig_tag);
            					break;
            				}
            			}
            		}
            	}
            	
            	
                list[i].endXData=list[maxIndex].xData;
                list[i].endYData=[];

                for(var j=0;j<list[i].endXData.length;j++)
                {

                        if(list[i].xData.indexOf(list[i].endXData[j])==-1)
                        {
							list[i].endYData.push(0);
                        }
                        else {
                        	
							for(var k=0;k<list[i].data.length;k++)
							{
								if(list[i].data[k].x==list[i].endXData[j])
								{
									list[i].endYData.push(list[i].data[k].y);
									break;
								}
							}
                        }

                }
            }
            
            
            console.log("竞品所有数据");
            console.log(JSON.stringify(list));
            
            myChart();
            
}

var duibiData;
var trendsList=[];
function  huaxian(data,typeValue)
{
	
	trendsList=[];
    var param={};
    param.product_line_id=product_line_id;

    var platform_id="";
    $(".platforms-list .active").each(function(index)
    {
        platform_id=platform_id+","+$(this).attr("data-id");
    });

    platform_id=platform_id.slice(1);

    param.platform_id=platform_id
    param.start_date=$("#startTime").text();
    param.end_date=$("#endTime").text();


    if($("#bottomCol .active").text()!="尺码对比")
    {
        var size= $(".jingpin-chart-tab .active").text();
        if(size)
        {
        	if(size=="全部")
        	{
        		size="";
        	}
        	param.size=size;
        }
        
        $(".jingpin-chart-tab").show();
    }
    else {
        $(".jingpin-chart-tab").hide();
    }

    $("#endTimeStr").text(param.end_date);
    $("#startTimeStr").text(param.start_date);

    //console.log("获取产品线竞品对比数据");
    //console.log(JSON.stringify(param));

    if(typeValue==1)
    {
        var url="app/brand/get-product-line-competing/";
    }
    else if(typeValue==2)
    {
        var url="app/brand/get-product-line-category/";
    }
    else if(typeValue==3)
    {
        var url="app/brand/get-product-line-size/";
    }
	
	
	var brand_color1;
	
    Global.commonAjax({
        url:url,
        data:param,
        method: 'GET'
    }, function(data){

        console.log("获取产品线竞品对比数据返回数据");
        console.log(JSON.stringify(data));
        var html="";
        var html1="";

		var index = 0;
        for(var i in data.trends) {

            data.trends[i][0].color=getRandomColor(index);
			index++;
            html=html+'<div style="border:1px solid '+brandColor+';border-right:0;color:'+brandColor+'">'+i+'</div>';
            trendsList.push(i);
            
			if(typeValue==3)
			{
				for(var j=0;j<data.trends[i].length;j++)
				{
					data.trends[i][j].product_line_name=data.trends[i][j].size;
					//当前产品线 颜色
					if(data.trends[i][j].product_line_name == product_line_name){
						data.trends[i].color = brand_color1;
					}
					
				}
			}
			html1=html1+'<span class="jingpin-top-detail"><span class="quan2 quan" style="background: '+data.trends[i][0].color+';"></span>'+i+'</span>';
	
        }
        
        console.log("所有数据");
        console.log(JSON.stringify(data));
        
        if(typeValue==3)
		{
			for(var j=0;j<data.totals.length;j++)
			{
				data.totals[j].product_line_name=data.totals[j].size;
			}
		}
        

        $(".chart-tab-col").html(html);
        $(".chart-tab-col div:last-child").css({"border-right":"1px solid "+brandColor});
        
        $(".jingpin-top-second").html(html1);

        $(".chart-tab-col div").eq(0).addClass("active");

		duibiData=data;
		createChartData();
		$(".jingpin-chart .chart-tab-col .active").css({"background":brandColor});
		
		getPinglun();


    },function(err)
    {
        console.log("品牌条件返回数据失败"+err);
    });


}


function getPinglun(pIdSize)
{

    var param={};
    
    if(pIdSize)
    {
    	
    	if($("#bottomCol .active").text()=="竞品对比"||$("#bottomCol .active").text()=="内部对比")
	    {
	    	
	        param.product_line_id=pIdSize;
	    }
	    else
	    {
	        param.size=pIdSize;
	    }
    	
    }
    else{
    	param.product_line_id=product_line_id;
    	var sizeValue=$("#sizes .active").text();
    	if(sizeValue=="全部")
    	{
    		sizeValue="";
    	}
    	param.size=sizeValue; 
    }

    var platform_id="";
    $(".platforms-list .active").each(function(index)
    {
        platform_id=platform_id+","+$(this).attr("data-id");
    });

    platform_id=platform_id.slice(1);

    param.platform_id=platform_id
    param.start_date=$("#startTime").text();
    param.end_date=$("#endTime").text();
    
    
    param.attr=$(".chart-tab-col .active").text();

	//alert(JSON.stringify(param));
	
    Global.commonAjax({
        url: 'app/brand/get-product-line-comment/',
        data:param,
        method: 'GET'
    }, function(data){

        console.log("获取产品线评论返回数据");
        console.log(JSON.stringify(data));
		if(data.comments.length == 0){
			$("#pinglunAll").empty();
			$(".pinglun-list").addClass("hideClass");
			$(".command_empty").removeClass("hideClass");
		}else{
			$(".pinglun-list").removeClass("hideClass");
			$(".command_empty").addClass("hideClass");
		}
        $(".pinglun-list").empty();

        for(var i=0;i<data.comments.length;i++)
        {
            var html="";

            if(data.comments[i].resource_urls)
            {
                var imgList=data.comments[i].resource_urls.split("|");
                for(var j=0;j<imgList;j++)
                {
                    html=html+'<img src="'+imgList[j]+'"/>';
                }
            }


            $(".pinglun-list").append('<li>'+
                '<div class="name-col">'+
            '<span class="name-text">'+data.comments[i].nick_name+'</span>'+
            ' <span class="name-tag">'+data.comments[i].platform_name+'</span>'+
            ' <div class="time-text">'+data.comments[i].comment_time.replace("T", " ")+'</div>'+
            ' <span class="right">'+
            ' <img src="../images/icon/state_negative@2x.png"/>'+
            ' <img src="../images/icon/state_positive@2x.png"/>'+
            ' </span>'+
            '</div>'+
            '<div class="content">'+data.comments[i].content+'</div>'+
            '<div class="tag-list">'+
            ' <span>'+data.comments[i].tag+'</span>'+
            '</div>'+
            ' <div class="img-list">'+html+
            ' </div>'+
            '</li>');
        }


    },function(err)
    {
        console.log("获取产品线评论返回数据失败"+err);
    });



}

$(".jingpin-bottom .right div").click(function()
{
    $(".jingpin-bottom .right div").removeClass("active");
    $(".jingpin-bottom .right div").css({"color":"#000"});
    $(this).addClass("active");
	$(this).css({"color":brand_color1});
    firstInitData();

});

$("#chakanPinglun").on("touchstart",function()
{
    $(this).toggleClass("active");
    $("#pinglunCol").toggle();
    hideTip();

});
//数组求最大值
Array.prototype.max = function() {
    var max = this[0];
    var len = this.length;
    for (var i = 1; i < len; i++){
        if (this[i] > max) {
            max = this[i];
        }
    }
    return max;
}

var myChart0;
var myChart1;
var myChart2;

function myChart()
{
	
    var allData;
    if($("#bottomCol .active").text()=="竞品对比")
    {
    	
        allData=competing_product_lines;
    }
    else if($("#bottomCol .active").text()=="内部对比")
    {
        allData=category_product_lines;
    }
    else
    {
        allData=sizesList;
    }
    console.log("结果结果"+JSON.stringify(allData));

    var series=[];
    var key=$(".chart-tab-col .active").text();

	for(var i=0;i<allData.length;i++)
	{
		var  seriesObj={
	            name:allData[i].name,
	            type:'line',
	            smooth: true,
	            symbol: 'circle',
	            itemStyle : {
	                normal : {
	                    color:allData[i].color,
	                    lineStyle:{
	                        color:allData[i].color
	                    }
	                }
	            },
	            data:allData[i].endYData
	        };
	        series.push(seriesObj);
	}

    myChart0 = echarts.init(document.getElementById('main'));
	

    var option = {
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '15%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: allData[0].endXData,
			name: '日期',
			axisLabel: {
				show: false
			}
        },
        yAxis: {
            type: 'value'
        },
        series: series

    };
    myChart0.setOption(option);

	
    var series1=[];
    var ySeries2=[];
    var series2=[];
    
    var ySeries3=[];

    var lineHeight=30;
    if(allData.length==1)
    {
    	lineHeight=80;
    }
    if(allData.length==2)
    {
    	lineHeight=60;
    }
   
	for(var i=0;i<allData.length;i++)
    {
        lineHeight=lineHeight+40;
		// if(allData[i].name != '全部')
		ySeries2.push(allData[i].name);
		if(allData[i].tag)
		{
			ySeries3.push(allData[i].name+" "+allData[i].tag);
		}
		else{
			ySeries3.push(allData[i].name);
		}
		

    }
    
    

	$(".jingpin-row-list").height(lineHeight);
	
	$(".jingpin-row-list div").height(lineHeight);
	
	
    
    var allTrendsList=[];
	console.log("trendsList:");
	console.log(JSON.stringify(trendsList))
	
	var maxValue = 0;
    for (var i=0;i<trendsList.length;i++)
    {
		var obj={};
		obj.name=trendsList[i];
		obj.total=[];
		obj.total_ratio=[];

        for(var j=0;j<allData.length;j++)
        {
			var totalObj={};
			totalObj.value=allData[j].endData2[i];
			totalObj.tag=allData[j].endData5[i];
            obj.total.push(totalObj);
            obj.total_ratio.push(allData[j].endData3[i]);
            
			if(maxValue < parseFloat(allData[j].endData2[i]))
			{
				maxValue = parseFloat(allData[j].endData2[i]);
			}
        }
        
        var seriesObj1={
            name:trendsList[i],
            type: 'bar',
			barWidth: 18,
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            itemStyle : {
                normal : {
                    color:duibiData.trends[trendsList[i]][0].color,
					label: {
						formatter: function(data){
							
							if((maxValue<=0) || (data.data.value < maxValue/4)){
								return '';
							}else{
								return data.data.value+data.data.tag;
							}
						},
						textStyle:{
							fontSize:11,
							color:'#FFF'
						}
					}
                }
            },
            data: obj.total
        }
		
        series1.push(seriesObj1);

		
        var seriesObj2={
            name:trendsList[i],
            type: 'bar',
            stack: '总量',
			barWidth: 18,
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            itemStyle : {
                normal : {
                    color:duibiData.trends[trendsList[i]][0].color,
                     label: {
                        formatter: function (a, b, c) {
                        	
							if(a.data*100 <25){
								return '';
							}else{
								return parseInt(a.data*100)+ "%";
							}
                            
                        },
						textStyle:{
							fontSize:11,
							color:'#FFF'
						}
                    }
                }
               
            },
            data: obj.total_ratio
        }

        series2.push(seriesObj2);


    }

	console.log("数据");
	console.log(JSON.stringify(duibiData));


    myChart1 = echarts.init(document.getElementById('jingpinRow1'));
	
	series1.map(function(item){
		item.data.reverse();
	});
    var option1 = {
        
        tooltip: {
            trigger: 'axis',
            formatter: function (a, b, c) {
            	
				console.log("查看数据");
				
                var str=a[0].name+"";
                for(var i=0;i< a.length;i++)
                {
                    str=str+"<br/>"+a[i].marker+ a[i].seriesName+":"+a[i].value+a[i].data.tag;
                }
                return str;

            }
            
        },
        
        grid: {
            left: '3%',
            right: '4%',
            bottom: '8%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
			axisLabel: {
				clickable: true
			}
        },
        yAxis: {
            type: 'category',
            data: ySeries3
        },
        series: series1

    };
    
 	myChart1.on('click', function(params){
 		var pId=findPId(params.name);
 		
 		 if($("#bottomCol .active").text()=="竞品对比"||$("#bottomCol .active").text()=="内部对比")
	    {
	    	$("#pinglunCount").text(params.name);
	        getPinglun(pId);
	    }
	   	else{
	   		$("#pinglunCount").text(params.name);
	   		getPinglun(params.name);
	   	}
 		
 		
       		
 	});
	
	// series1.reverse();
	
	ySeries2.reverse();
	ySeries3.reverse();

    myChart1.setOption(option1);

    myChart2 = echarts.init(document.getElementById('jingpinRow2'));

	series2.map(function(item){
		item.data.reverse();
	});
    var option2 = {
        tooltip: {
            trigger: 'axis',
            formatter: function (a, b, c) {

                var str=a[0].name+"";
                for(var i=0;i< a.length;i++)
                {
                    str=str+"<br/>"+a[i].marker+ a[i].seriesName+":"+(a[i].value*100).toFixed(2)+"%";
                }
                return str;

            }
            
        },
        grid: {
            left: '3%',
            right: '0%',
            bottom: '8%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            show:false,
            clickable: true,
            axisLabel : {
                formatter: function(value){
						if(value < 20){
							return "";
						}else{
							return value+"%";
						}
						
				}
				
            }
        },
        yAxis: {
            type: 'category',
            data: ySeries2
        },
        series: series2

    };
    
    myChart2.setOption(option2);
       myChart2.on('click', function(params){
       	var pId=findPId(params.name);
   		if($("#bottomCol .active").text()=="竞品对比"||$("#bottomCol .active").text()=="内部对比")
	    {
	    	
	        getPinglun(pId);
	    }
	   	else{
	   		getPinglun(params.name);
	   	}
	   	
	   	$("#pinglunCount").text(params.name);
       	
       });
}

function findPId(pName)
{
	var allData;
	var pId;
    if($("#bottomCol .active").text()=="竞品对比")
    {
    	
        allData=competing_product_lines;
        
    }
    else if($("#bottomCol .active").text()=="内部对比")
    {
        allData=category_product_lines;
    }
    
    for(var i=0;i<allData.length;i++)
    {
    	if(allData[i].name==pName)
    	{
    		pId=allData[i].product_line_id;
    		break;
    	}
    }
    return pId;
   
    
   
}


mui(".chart-tab-col").on('tap','div',function(event){

    $(".chart-tab-col div").removeClass("active");
    $(this).addClass("active");
    $(".jingpin-chart .chart-tab-col div").css({"background":"#fff"});
    $(".jingpin-chart .chart-tab-col .active").css({"background":brandColor});
    getPinglun();
    createChartData();

})

$("#pinglunCol .shadow-col").on("touchstart",function()
{
	$("#pinglunCol").hide();
});


mui(".jingpin-chart-tab").on('tap','div',function(event){

    $(".jingpin-chart-tab div").removeClass("active");
    $(this).addClass("active");
    firstInitData();

})