///<reference path="Image.html">


(function ($) {
    $.dyMobilePrew = $.fn.dyMobilePrew = function (options) {
        opts = $.extend({}, $.fn.dyMobilePrew.defaults, options);

        opts.imgSrcs = opts.imgSrcs || [];
        if (opts.imgObj)
        {
            $(opts.imgObj).each(function () {
                
                if ($(this).attr("src"))
                    opts.imgSrcs.push($(this).attr("src"));
            });
        }

        if (this instanceof jQuery)
        {
            opts.imgObj=$(this);
        }

        createModal();

        return this;
    }
    
    $.dyMobilePrew.opts = this.opts;
    $.dyMobilePrew.imgGuid = this.imgGuid = 0;

    var bodyOverFlowX, bodyOverFlowY;

    ///创建 模态框
    $.dyMobilePrew.createModal = this.createModal = function () {
        $("body").append('\
            <div id="imageModal" style="display:none;position:fixed;opacity:1;background-color:black;top:0px;left:0px;right:0px;bottom:0px;">\
                <div id="imageHead" style="border-bottom: 1px solid white;height:20px;z-index:9999;background-color:black;position:absolute;top:0;left:0;right:0;"></div>\
                <div id="imageBody" style="position:relative;overflow: scroll;height:'+(window.innerHeight-42)+'px;"></div>\
                <div id="imageFooter" style="border-top:1px solid white;height:20px;position:fixed;bottom:0px;left:0px;right:0px;background-color:black;"></div>\
            </div>');

        bodyOverFlowX = $("body").css("overflow-x");
        bodyOverFlowY = $("body").css("overflow-y");

        $("<button>关闭</button>").click(function () {
            closeModal();
        }).appendTo("#imageModal #imageFooter");
        
        if (opts.imgObj.length > 0) {
            opts.imgObj.each(function () {
                $(this).attr("guid", $.dyMobilePrew.imgGuid);

                var jqImg = $("<img style='display:none;width: 100%;opacity: 1;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);' src='" + $(this).attr("src") + "' imgguid='" + ($.dyMobilePrew.imgGuid++) + "'/>");
                jqImg.appendTo("#imageModal>#imageBody");
            });

            opts.imgObj.click(function () {//略缩图点击，进行预览
                openModal();
                $("#imageModal>#imageBody [imgguid=" + $(this).attr("guid") + "]").show();

                var total = $("#imageModal>#imageBody [imgguid]").length;
                var index = $("#imageModal>#imageBody [imgguid]").index($("#imageModal>#imageBody [imgguid=" + $(this).attr("guid")+"]")) + 1;
                $("#imageModal>#imageHead").html("<p class='imgaeIndex' style='color:white;'>" + index + "/" + total + "</p>");
                return;
            });

        }
        else if (opts.imgSrcs.length>0) {
            opts.imgSrcs.forEach(function (item) {
                var jqImg = $("<img style='display:none;width: 100%;opacity: 1;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);' src='" + item + "' imgguid='" + ($.dyMobilePrew.imgGuid++) + "'/>");
                jqImg.appendTo("#imageModal>#imageBody");
            });
        }

        $("#imageModal>#imageBody img[imgguid]").each(function(){
            $(this).click(function () {//.dblclick(function () {
                var winW = window.innerWidth;
                var imgW = $(this).width();
           
                console.log("winW:" + winW);
                console.log("imgW:" + imgW);
                if (winW==imgW) {
                    $(this).css("width", "auto");
                }
                else {
                    $(this).width(winW);
                }
            });
        });
             
    };  // /

    //打开 模态框
    $.dyMobilePrew.openModal=this.openModal  = function ()
    {
        $("body>div#imageModal").show();
        $("body").css("overflow", "hidden");
    }

    //关闭 模态框
    $.dyMobilePrew.closeModal = this.closeModal = function () {
        $("body>div#imageModal").hide();
        $("body>div#imageModal img").hide();
        if(bodyOverFlowX)
            $("body").css("overflow-x",bodyOverFlowX);
        if(bodyOverFlowY)
            $("body").css("overflow-y", bodyOverFlowY);
    }

    $.fn.dyMobilePrew.defaults = {
        imgObj: null,
        imgSrcs :[]
    };
})(jQuery);


