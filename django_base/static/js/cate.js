// get category by name, like Science
function get_category(url, container, pre) {
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		success:function(data){
            set_category_block(data.results, container, pre);
        }
    });
};

// set category block
function set_category_block(data, container, pre) {
     var $cate_block_pure = $("<div />", {
            "class": "pure-g cate-block-pure"
        });
     $.each(data, function(k, v) {
         var $cate_block = $("<div />", {
                "class": "cate-block pure-u-1 pure-u-sm-1-1 " + 
                         "pure-u-md-1-3"
            });
         var $cate_block_a = $("<a />", {
                "class": "cate-block-a",
                "href": pre + "/" + v["name"] + "/"
            });
         var $cate_block_outside = $("<div />", {
                "class": "cate-block-outside"
            });
         var $cate_block_inside = $("<div />", {
                "class": "cate-block-inside"
            });
         var $cate_title = $("<div />", {
                "class": "cate-title pure-u-2-3 pure-u-sm-2-3 pure-u-md-2-3"
            });
         if (pre == "/group") {
             var $cate_img_span = $("<span />", {
                    "class": "cate-count-span pure-u-6-24 pure-u-sm-6-24 pure-u-md-6-24",
                    "text": v["playlist"].length
                });
             var $cate_img = $("<img />", {
                    "class": "cate-count-span-inside",
                });
         }
         else {
             var $cate_img_span = $("<span />", {
                    "class": "cate-img-span pure-u-6-24 pure-u-sm-6-24 pure-u-md-6-24",
                });
             var $cate_img = $("<img />", {
                    "class": "cate-img",
                    "src": 'http://' + window.location.hostname + 
                    '/static/imgs/' + v["thumbnail"] + '.png'
                });
         }
         var $cate_grep = $("<span />", {
                "class": "cate-grep pure-u-2-24 pure-u-sm-2-24 pure-u-md-2-24",
            });
         var $cate_wrapper_span = $("<span />", {
                "class": "cate-wrapper-span pure-u-16-24 pure-u-sm-16-24 pure-u-md-16-24",
            });
         var $cate_span = $("<p />", {
                "class": "cate-span",
                "text": v["name"]
            });
         container.append($cate_block_pure);
         $cate_block_pure.append($cate_block)
         $cate_block.append($cate_block_a);
         $cate_block_a.append($cate_block_outside);
         $cate_block_outside.append($cate_block_inside);
         $cate_block_inside.append($cate_title);
         $cate_title.append($cate_img_span);
         $cate_title.append($cate_grep);
         $cate_title.append($cate_wrapper_span);
         $cate_img_span.append($cate_img);
         $cate_wrapper_span.append($cate_span);
         height = $cate_block_inside.outerHeight();
     });
}

// get non empty channel by category
function get_channel(name, container) {
    $.ajax({
		url: "/api/inner/?name=" + name,
		type: "GET",
		dataType: "json",
		success:function(data){
            set_channel_block(data.results, container);
        },
        error: function(){
        }
    }); 
}


function set_channel_block(data, container) {
     var $details_outside_div = $("<div />", {
         "class": "pure-g details-outside-div"
     });
     if (data[0].length != 0) {
         var $details_div = $("<div />", {
             "class": "pure-u-1 pure-u-md-1-1 pure-u-sm-1-1 details-div"
         });
         var $details_title = $("<div />", {
             "class": "details-title pure-u-2-3 pure-u-sm-2-3 pure-u-md-2-3"
         });
         var $details_title_img = $("<img />", {
             "class": "details-title-img",
             "src": "../../static/imgs/tv.png"
         });
         var $details_title_span = $("<h1 />", {
             "class": "details-title-span",
             "text": data[0]["name"].toUpperCase(),
             "id": data[0]["name"].replace(' ', '-'),
         });
         var $details_content = $("<div />", {
             "class": "details-content"
         });

         $details_outside_div.append($details_div);
         $details_title.append($details_title_img);
         $details_title.append($details_title_span);
         $details_div.append($details_title);
         $details_div.append($details_content);
         get_channel_info(data[0]["playlist"], data[0]["name"], $details_content);
    }
    container.append($details_outside_div);
}


function get_channel_info(data, type, container) {
    $.each(data, function(k, v) {
        url = "https://www.googleapis.com/youtube/v3/channels?part=snippet, statistics&key=AIzaSyBABK-dxkscLAibISE0-cgNW9Wk7wd5uEY&id=" + v["channel_id"];
        $.ajax({
	    	url: url,
	    	type: "GET",
	    	dataType: "json",
            cache: true,
            headers: {
                'Cache-Control': 'max-age=1000',
            },
	    	success:function(data){
                var title = data["items"][0]["snippet"]["title"];
                var description = data["items"][0]["snippet"]["description"];
                var thumbnails = data["items"][0]["snippet"]["thumbnails"]["high"]["url"];
                var sub_count = data["items"][0]["statistics"]["subscriberCount"];

                 var $channel_div = $("<div />", {
                     "class": "channel-div"
                 });
                 var $channel_inside_a = $("<a />", {
                     "class": "channel-indide-a pure-u-md-2-3 pure-u-sm-2-3",
                     "id": "channel-" + v["channel_id"],
                     "href": "http://" + window.location.hostname + "/channel/" + v["channel_title"] + "/"
                 });
                 var $channel_inside_type = $("<input />", {
                     "class": "channel-indide-type",
                     "type": "hidden",
                     "value": type,
                 });
                 var $channel_inside_div = $("<div />", {
                     "class": "channel-indide-div pure-u-g"
                 });
                 var $channel_clear = $("<div />", {
                     "class": "clear"
                 });
                 var $channel_details = $("<div />", {
                     "class": "channel-details pure-u-1-1 pure-u-md-1-1 pure-u-sm-4-6 pure-u-lg-5-6"
                 });
                 var $channel_details_inside = $("<div />", {
                     "class": "channel-details-inside"
                 });
                 var $channel_title = $("<div />", {
                     "class": "channel-title",
                 });
                 var $channel_content = $("<div />", {
                     "class": "channel-content"
                 });
                 var $channel_content_span = $("<span />", {
                     "class": "channel-content-span",
                     "text": description
                 });
                 var $channel_thumbnail = $("<div />", {
                     "class": "channel-thumbnail pure-u-1-3 pure-u-md-2-6 pure-u-sm-2-6 pure-u-lg-1-6"
                 });
                 var $channel_thumbnail_inside = $("<div />", {
                     "class": "channel-thumbnail_inside"
                 });
                 var $channel_name = $("<span />", {
                     "class": "channel-name",
                     "text": title
                 });
                 var $channel_sub_div = $("<div />", {
                     "class": "channel-sub-div",
                 });
                 var $channel_sub_span = $("<span />", {
                     "class": "channel-sub-span",
                     "text": readSub(sub_count)
                 });
                 var $channel_sub_img_span = $("<span />", {
                     "class": "channel-img-sub-span",
                 });
                 var $channel_sub_img = $("<img />", {
                     "class": "channel-sub-img",
                     "src": "../../static/imgs/youtube_64.png"
                 });
                 var $channel_img = $("<img />", {
                     "class": "channel-img",
                     "src": thumbnails
                 });
                 $channel_div.append($channel_inside_a);
                 $channel_div.append($channel_inside_type);
                 $channel_inside_a.append($channel_inside_div);
                 $channel_inside_div.append($channel_thumbnail);
                 $channel_details.append($channel_details_inside);
                 $channel_details_inside.append($channel_title);
                 $channel_details_inside.append($channel_content);
                 $channel_inside_div.append($channel_details);
                 $channel_inside_div.append($channel_clear);
                 $channel_content.append($channel_content_span);
                 $channel_title.append($channel_name);
                 $channel_title.append($channel_sub_div);
                 $channel_sub_img_span.append($channel_sub_img);
                 $channel_sub_div.append($channel_sub_span);
                 $channel_sub_div.append($channel_sub_img_span);
                 $channel_thumbnail.append($channel_thumbnail_inside);
                 $channel_thumbnail_inside.append($channel_img);
                 container.append($channel_div);
            },
            error: function(){
            },
        }); 
    }); 
}
