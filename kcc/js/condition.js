var picker;

function dateCol($obj,type)
{
	if(picker != null){
		picker.dispose();
	}
    var options = {"type":"date","value":$($obj).text()};

    if(type==2)
    {
        picker = new mui.DtPicker(options);
        picker.show(function(rs) {

            $($obj).text(rs.text);

            picker.dispose();

        });
        
        $(".mui-dtpicker").prepend("<span style='position:absolute;left:50%;top:10px;margin-left:-20px;color:#666;font-size:14px;'>结束日期</span>");
  
        
    }
    else{

        picker = new mui.DtPicker(options);
        picker.show(function(rs) {

            $($obj).text(rs.text);

            picker.dispose();
            dateCol2();

        });
		
		$(".mui-dtpicker").prepend("<span style='position:absolute;left:50%;top:10px;margin-left:-20px;color:#666;font-size:14px;'>开始日期</span>");
  

    }



}

function  dateCol2()
{
    var options = {"type":"date","value":$("#startTime").text()};

    picker = new mui.DtPicker(options);
    picker.show(function(rs) {

        $("#endTime").text(rs.text);

        picker.dispose();

    });
    
    $(".mui-dtpicker").prepend("<span style='position:absolute;left:50%;top:10px;margin-left:-20px;color:#666;font-size:14px;'>结束日期</span>");
    
}


mui("body").on('tap','#shadowCol',function(event){

	$("#shadowCol").hide();
	$(".right-modal-col").animate({"right":"-3rem"},300,function() {
        
        $(".right-modal-col").hide();
        
    });
    
    hideTip();

});




function  showCondition()
{
	$("#shadowCol").show();
	$(".right-modal-col").show();
    $(".right-modal-col").animate({"right":"0"},300);
    hideTip();
    
    
}

function  getCondition()
{

    Global.commonAjax({
        url: 'app/brand/get-platforms/',
        method: 'GET'
    }, function(data){

        console.log("平台搜索条件");
        console.log(JSON.stringify(data));

        var tagListHtml="";
        var childHtml="";
        for(var i=0;i<data.platforms.length;i++)
        {
            tagListHtml=tagListHtml+"<span class='active pid"+i+"' data-length='"+data.platforms[i].childs.length+"' data-pid='"+i+"'>"+data.platforms[i].parent_name+"</span>";

            for(var j=0;j<data.platforms[i].childs.length;j++)
            {
                childHtml=childHtml+"<span class='active child"+i+"' data-pid='"+i+"' data-id='"+data.platforms[i].childs[j].platform_id+"'>"+data.platforms[i].childs[j].platform_name+"</span>";;
            }

        }
        var startTime=moment().subtract(90,"days").format("YYYY-MM-DD");
        var endTime=moment().subtract(1,"days").format("YYYY-MM-DD");

		$("#shadowCol").remove();
		$(".right-modal-col").remove();
        $("body").append('<div class="shadow-col hide" ontouchmove="return false;" id="shadowCol"></div>'+
            ' <div class="right-modal-col" ontouchmove="return false;">'+
            '  <div class="modal-row">'+
            '<div class="modal-title">平台</div>'+
            ' <div class="tag-list platforms">'+tagListHtml+
            '  </div>'+
            ' </div>'+
            ' <div class="modal-row">'+
            ' <div class="modal-title">店铺</div>'+
            ' <div class="tag-list platforms-list">'+childHtml+
            ' </div>'+
            ' </div>'+
            ' <div class="modal-row">'+
            '<div class="modal-title">日期</div>'+
            ' <div class="tag-list date-list">'+
            ' <span date-id="1">当天</span>'+
            ' <span date-id="2">本周</span>'+
            '<span date-id="3">本月</span>'+
            ' <span date-id="4">本季度</span>'+
            '<span date-id="5">近半年</span>'+
            ' <span date-id="6">近一年</span>'+
            ' </div>'+
            ' </div>'+
            ' <div class="date-main clearfix">'+
            ' <div class="date-col" id="startTime" onclick="dateCol(this,1)">'+startTime+'</div>'+
            ' <div class="line"></div>'+
            ' <div class="date-col" id="endTime" onclick="dateCol(this,2)">'+endTime+'</div>'+
            ' </div>'+
            ' <div class="modal-bottom">'+
            ' <span ontouchstart="reset();">重置</span>'+
            ' <span onclick="modalConfirm()">确定</span>'+
            '</div>'+
            '</div>');

        modalConfirm();


    },function(err)
    {
        console.log("平台搜索条件失败"+err);
    });

    


}



    function modalConfirm()
    {
        if($(".platforms .active").length==0)
        {
            mui.toast("请选择平台");
            return;
        }

        if($(".platforms-list .active").length==0)
        {
            mui.toast("请选择店铺");
            return;
        }

		$("#shadowCol").hide();
		$(".right-modal-col").animate({"right":"-3rem"},300,function() {
	        
	        $(".right-modal-col").hide();
	        
	    });
	    hideTip();
        firstInitData();
        
    }


mui("body").on('tap','.platforms span',function(event){

        $(this).toggleClass("active");
        var dataId=$(this).attr("data-pid");
        if($(this).hasClass("active"))
        {
            $(".child"+dataId).addClass("active");
        }
        else {
            $(".child"+dataId).removeClass("active");
        }

    });

    mui("body").on('tap','.platforms-list span',function(event){

        $(this).toggleClass("active");

        $(".platforms span").each(function()
        {
            var pid=$(this).attr("data-pid");
            var dLength=$(this).attr("data-length");
            
            var activePLength=$(".platforms-list .active.child"+pid).length;
            
            if(activePLength==dLength)
            {
                $(this).addClass("active");
            }
            else if(activePLength==0)
            {
                $(this).removeClass("active");
            }
        });


    });

    mui("body").on('tap','.date-list span',function(event){

        $(".date-list span").removeClass("active");
        $(this).addClass("active");

       var id=$(this).attr("date-id");

        var currentQuarter = moment().quarter() // 当前是第几季度
        var currentYear = moment().year() // 当前年

        var endMonth = 3 * parseInt(currentQuarter) //当季度最后一个月

        if(endMonth < 10)
            endMonth = '0' + endMonth
        else
            endMonth += ''

        var endMonthDays = moment(currentYear + '-' + endMonth).daysInMonth(); // 末尾月天数
        var endDays = currentYear + '-' + endMonth + '-' + endMonthDays //完整年月日整合


        if(id==1)
        {
            $("#startTime").text(moment().format("YYYY-MM-DD"));
            $("#endTime").text(moment().format("YYYY-MM-DD"));
        }
        else if(id==2)
        {
            $("#startTime").text(moment().week(moment().week()).startOf('week').format('YYYY-MM-DD'));
            $("#endTime").text(moment().week(moment().week()).endOf('week').format('YYYY-MM-DD'));
        }
        else if(id==3)
        {
            $("#startTime").text(moment().month(moment().month()).startOf('month').format('YYYY-MM-DD'));
            $("#endTime").text(moment().month(moment().month()).endOf('month').format('YYYY-MM-DD'));
        }
        else if(id==4)
        {

            $("#startTime").text(moment(moment(currentYear + '-01-01').toDate()).quarter(currentQuarter).format("YYYY-MM-DD"));
            $("#endTime").text( moment(endDays).format("YYYY-MM-DD"));
        }
        else if(id==5)
        {
            if(currentQuarter<=2)
            {
                $("#startTime").text(moment(currentYear + '-01-01').format("YYYY-MM-DD"));
                $("#endTime").text(moment(currentYear + '-06-30').format("YYYY-MM-DD"));
            }
            else {
                $("#startTime").text(moment(currentYear + '-07-01').format("YYYY-MM-DD"));
                $("#endTime").text(moment().year(moment().year()).endOf('year').format("YYYY-MM-DD"));
            }
        }
        else if(id==6)
        {
            $("#startTime").text(moment().year(moment().year()).startOf('year').format("YYYY-MM-DD"));
            $("#endTime").text(moment().year(moment().year()).endOf('year').format("YYYY-MM-DD"));
        }

    });



function reset()
{
    $("#rightModal .tag-list span").addClass("active");
    $(".date-list span").removeClass("active");

    var startTime=moment().subtract(90,"days").format("YYYY-MM-DD");
    var endTime=moment().subtract(1,"days").format("YYYY-MM-DD");
    $("#startTime").text(startTime);
    $("#endTime").text(endTime);

}
