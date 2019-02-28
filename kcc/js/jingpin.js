var product_line_id=GetQueryString("product_line_id");


//随机颜色
function getRandomColor(){ 
return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); 
} 

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
    if(!$(this).hasClass("active"))
    {

        Global.commonAjax({
            url: 'app/collect/add-product-line/',
            data:{product_line_id:product_line_id},
            method: 'POST'
        }, function(data){

            console.log("收藏产品线返回数据");
            console.log(JSON.stringify(data));
            $(".shoucang").addClass("active");
            mui.toast("收藏成功");


        },function(err)
        {
            console.log("收藏产品线返回数据失败"+err);
        });


    }
});



//竞品对比
var competing_product_lines;
//内部对比
var category_product_lines;
//尺寸对比
var sizes;


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
        for(var i=0;i<data.sizes.length;i++)
        {
			$("#sizes").append("<div>"+data.sizes[i]+"</div>");
        }
        $("#sizes div").eq(0).addClass("active");
        $("#product_line_icon").attr("src",baseServerUrl+data.product_line_icon);
        $("#product_line_name").text(data.product_line_name);

        competing_product_lines=data.competing_product_lines;

        sizes=data.sizes;
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

var sizesList=[];
function firstInitData()
{

    $("#rightModal").hide();
    huanIndex=0;
    if($("#bottomCol .active").text()=="尺码对比")
    {

        for(var i=0;i<sizes.length;i++)
        {
            var obj={};
            var colorValue=getRandomColor();
            obj.color=colorValue;
            obj.name=sizes[i];

            $("#jingpinTop").append('<span class="jingpin-top-detail">' +
                '<span class="quan2 quan" style="background: '+colorValue+';">' +
                '</span>'+sizes[i]+'</span>');

            sizesList.push(obj);
            huaxian(sizes[i],i,sizes.length-1,3);

        }

    }

    if($("#bottomCol .active").text()=="竞品对比")
    {
        for(var i=0;i<competing_product_lines.length;i++)
        {
            var colorValue=getRandomColor();
            competing_product_lines[i].color=colorValue;
            competing_product_lines[i].name= competing_product_lines[i].product_line_name;
            $("#jingpinTop").append('<span class="jingpin-top-detail">' +
                '<span class="quan2 quan" style="background: '+colorValue+';">' +
                '</span>'+competing_product_lines[i].product_line_name+'</span>');

            huaxian(competing_product_lines[i].product_line_id,i,competing_product_lines.length-1,1);

        }

    }

    if($("#bottomCol .active").text()=="内部对比")
    {
        for(var i=0;i<category_product_lines.length;i++)
        {
            var colorValue=getRandomColor();
            category_product_lines[i].color=colorValue;
            category_product_lines[i].name= category_product_lines[i].product_line_name;

            $("#jingpinTop").append('<span class="jingpin-top-detail">' +
                '<span class="quan2 quan" style="background: '+colorValue+';">' +
                '</span>'+category_product_lines[i].product_line_name+'</span>');
            huaxian(category_product_lines[i].product_line_id,i,category_product_lines.length-1,2);
        }

    }




}

var huanIndex=0;
function  huaxian(product_line_id_value,indexValue,indexLength,typeValue)
{

    var param={};
    param.product_line_id=product_line_id_value;

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
        param.size=size;
        $(".jingpin-chart-tab").show();
    }
    else {
        $(".jingpin-chart-tab").hide();
    }

    $("#endTimeStr").text(param.end_date);
    $("#startTimeStr").text(param.start_date);

    console.log("获取产品线竞品对比数据");
    console.log(JSON.stringify(param));

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


    Global.commonAjax({
        url:url,
        data:param,
        method: 'GET'
    }, function(data){

        console.log("获取产品线竞品对比数据返回数据");
        console.log(JSON.stringify(data));

        if(typeValue==1)
        {
            competing_product_lines[indexValue].data=data;
        }
        else if(typeValue==2)
        {
            category_product_lines[indexValue].data=data;
        }
        else if(typeValue==3)
        {
            sizesList[indexValue].data=data;
        }

        huanIndex++;

        if(data.totals.length>0)
        {
            if(indexValue==0)
            {
                var html="";
                var html1="";
                for(var i=0;i<data.totals.length;i++)
                {
                    data.totals[i].color=getRandomColor();
                    html=html+'<div>'+data.totals[i].attr+'</div>';
                    html1=html1+'<span class="jingpin-top-detail"><span class="quan2 quan" style="background: '+data.totals[i].color+';"></span>'+data.totals[i].attr+'</span>';
                }

                $(".chart-tab-col").html(html);
                $(".jingpin-top-second").html(html1);

                $(".chart-tab-col div").eq(0).addClass("active");
                getPinglun();
            }

            if(huanIndex==(indexLength+1))
            {
                myChart();
            }

        }


    },function(err)
    {
        console.log("品牌条件返回数据失败"+err);
    });


}


function getPinglun()
{

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
    param.size=$(".jingpin-chart-tab .active").text();
    param.attr=$(".chart-tab-col .active").text();

    Global.commonAjax({
        url: 'app/brand/get-product-line-comment/',
        data:param,
        method: 'GET'
    }, function(data){

        console.log("获取产品线评论返回数据");
        console.log(JSON.stringify(data));
        $("#pinglunCount").text(data.comments.length);
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
    $(this).addClass("active");

    firstInitData();

});

$("#chakanPinglun").click(function()
{
    $(this).toggleClass("active");
    $("#pinglunCol").toggle();

});

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
    var jingpinRowHtml2="";
    for(var i=0;i<allData.length;i++)
    {

        var chartData=allData[i].data.trends[key];

        jingpinRowHtml2=jingpinRowHtml2+'<div class="jingpin-row"><span class="left">'+allData[i].name+'</span>';

        var oneData=[];
        for(var j=0;j<chartData.length;j++)
        {
            oneData.push(chartData[j].total);
        }

        var lineData=allData[i].data.totals;

        jingpinRowHtml2=jingpinRowHtml2+'<div class="line-col">';



        for(var j=0;j<lineData.length;j++)
        {
            var baifenbi=parseInt(100*lineData[j].total_ratio);
            jingpinRowHtml2=jingpinRowHtml2+'<span style="width: '+baifenbi+'%;background:'+allData[0].data.totals[j].color+';">'+baifenbi+'%</span>';
        }

        jingpinRowHtml2=jingpinRowHtml2+'</div></div>';

        var  seriesObj={
            name:allData[i].name,
            type:'line',
            stack: '总量',
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
            data:oneData
        };



        series.push(seriesObj);
    }

    $("#jingpinRow2").html(jingpinRowHtml2);


    var xAxis=[];
    for(var i=0;i<allData[0].data.trends[key].length;i++)
    {
        xAxis.push(allData[0].data.trends[key][i].week);
    }


    var myChart = echarts.init(document.getElementById('main'));

    var option = {
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
            type: 'category',
            boundaryGap: false,
            data: xAxis
        },
        yAxis: {
            type: 'value'
        },
        series: series

    };

    myChart.setOption(option);

}



mui(".chart-tab-col").on('tap','div',function(event){

    $(".chart-tab-col div").removeClass("active");
    $(this).addClass("active");
    myChart();

})


mui(".jingpin-chart-tab").on('tap','div',function(event){

    $(".jingpin-chart-tab div").removeClass("active");
    $(this).addClass("active");
    getPinglun();
    firstInitData();

})
