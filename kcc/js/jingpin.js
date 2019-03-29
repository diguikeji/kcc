var product_line_id=GetQueryString("product_line_id");

//随机颜色
function getRandomColor(index){ 
	// return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); 
	if((index>0) && brand_color1){
		var r = parseInt(brand_color1.substring(1,3)+'', 16); 
		var g = parseInt(brand_color1.substring(3,5)+'', 16);
		var b = parseInt(brand_color1.substring(5,7)+'', 16);
		var temp = (1-index*0.15);
		if(temp<0 || temp>1){
			temp = 0.1;
		} 
		var a = temp.toFixed(1);
		return "rgba("+r+","+g+","+b+","+a+")";
	}else if(index == 0){
		return brand_color1;
	}else{
		return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); 
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
        	data.sizes.splice(0,0,"全部");
        }
        
        for(var i=0;i<data.sizes.length;i++)
        {
			$("#sizes").append("<div>"+data.sizes[i]+"</div>");
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

		
        for(var i=1;i<sizes.length;i++)
        {
            var obj={};
            var colorValue=colorList[i+1];
            obj.color=colorValue;
            obj.name=sizes[i];

            $("#jingpinTop").append('<span class="jingpin-top-detail">' +
                '<span class="quan2 quan" style="background: '+colorValue+';">' +
                '</span>'+sizes[i]+'</span>');

            sizesList.push(obj);

        }
        huaxian(sizes,3);
		// $("#bottomCol .active").css({"color":brand_color1});
    }

    if($("#bottomCol .active").text()=="竞品对比")
    {
    	 
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
        for(var i=0;i<category_product_lines.length;i++)
        {
            var colorValue=colorList[i];
			if(i == 0){
				colorValue = brand_color1;
			}
            category_product_lines[i].color=colorValue;
            category_product_lines[i].name= category_product_lines[i].product_line_name;

            $("#jingpinTop").append('<span class="jingpin-top-detail">' +
                '<span class="quan2 quan" style="background: '+colorValue+';">' +
                '</span>'+category_product_lines[i].product_line_name+'</span>');
        }
        
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
                            total_ratio:data.totals[j].total_ratio
                        };
                        list[i].data1.push(obj);
                        
                        list[i].data11.push(data.totals[j].attr);
                        list[i].data12.push(data.totals[j].total);
                        list[i].data13.push(data.totals[j].total_ratio);
                        
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

            data.trends[i][0].color=getRandomColor(++index);
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
            ' <div class="time-text">'+data.comments[i].comment_time+'</div>'+
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
        
        for(var i=1;i<sizesList.length;i++)
        {
        	for(var j=0;j<sizesList[i].endXData.length;j++)
        	{
        		sizesList[0].endYData[j]=parseFloat(sizesList[0].endYData[j])+parseFloat(sizesList[i].endYData[j]);
        	}
        	
        	for(var j=0;j<sizesList[i].endData2.length;j++)
        	{
        		sizesList[0].endData2[j]=parseFloat(sizesList[0].endData2[j])+parseFloat(sizesList[i].endData2[j]);
        	}
        	
        	for(var j=0;j<sizesList[i].endData3.length;j++)
        	{
        		sizesList[0].endData3[j]=parseFloat(sizesList[0].endData3[j])+parseFloat(sizesList[i].endData3[j]);
        	}
        	
        }
        
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
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            show:false,
            data: allData[0].endXData
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

    var lineHeight=30;
    if(allData.length==1)
    {
    	lineHeight=80;
    }
   
	for(var i=0;i<allData.length;i++)
    {
        lineHeight=lineHeight+40;
		ySeries2.push(allData[i].name);

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

            obj.total.push(allData[j].endData2[i]);
            obj.total_ratio.push(allData[j].endData3[i]);
			if(maxValue < allData[j].endData2[i]){
				maxValue = allData[j].endData2[i];
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
						formatter: function(value){
							console.log(maxValue);
							if(value.data < maxValue/10){
								return '';
							}else{
								return parseFloat(value.data).toFixed(2);
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
							if(a.data*100 < 10){
								return '';
							}else{
								return (a.data*100).toFixed(2)+ "%";
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
            trigger: 'axis'
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
            data: ySeries2
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
            right: '4%',
            bottom: '8%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            show:false,
            clickable: true,
            axisLabel : {
                formatter: function(value){
						return value+"%";
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
