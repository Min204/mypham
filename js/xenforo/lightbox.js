/*
 * XenForo lightbox.min.js
 * Copyright 2010-2017 XenForo Ltd.
 * Released under the XenForo License Agreement: http://xenforo.com/license-agreement
 */
(function(a,p,q){XenForo.LightBox=function(r,u){var o=a("#LightBox").prop("unselectable",!0),m=o.find(".imageNav"),e=a("#LbImg"),i=o.find(".imageContainer"),n=[],g=a("#LbThumbs"),j=g.data("thumbheight"),k=0,l=0,s="";a("#LbPrev, #LbNext, #LightBox .imageContainer").click(a.context(function(b){b.preventDefault();this.shift(a(b.target).closest(".imageNav").attr("id")=="LbPrev"?-1:1);return!1},this));this.bindNav=function(){a(q).bind({"keydown.lightbox":a.context(function(a){switch(a.keyCode){case 37:case 38:return a.preventDefault(),
this.shift(-1);case 39:case 40:return a.preventDefault(),this.shift(1)}},this),"wheel.lightbox":a.context(function(a,d){d&&(a.preventDefault(),this.shift(d<0?1:-1))},this)})};this.unbindNav=function(){a(q).unbind(".lightbox")};this.shift=function(b){var d=g.find("li:not(#LbThumbTemplate) a");d.each(a.context(function(c,g){if(a(g).data("src")==e.attr("src"))return c+=b,c<0?c=d.length-1:c>=d.length&&(c=0),d.eq(c).triggerHandler("click",[!0]),!1},this))};this.setThumbStrip=function(b){console.info("setThumbStrip(%o)",
b);var d=a("#LbThumbTemplate"),c=this;n=[];g.find("li").not(d).remove();l=0;b.find("img.LbImage").each(a.context(function(b,f){var h=a(f),e=h.parent(".LbTrigger").attr("href")||h.attr("src");if(h.parents(".ignored").length)return this;a.inArray(e,n)==-1&&(n.push(e),setTimeout(function(){preLoader=new Image;preLoader.src=e},1),d.clone().removeAttr("id").appendTo(g).find("a").data("src",e).data("el",h).click(a.context(function(a,b){a.preventDefault();this.setImage(h,b?0:XenForo.speed.fast)},this)).find("img").load(function(){var b=
this;setTimeout(function(){var c=a(b),d=c.width();c.height()>d?(c.css("width",j),c.css("top",(c.height()-j)/2*-1)):(c.css("height",j),c.css(XenForo.switchStringRTL("left"),(c.width()-j)/2*-1));c.css("visibility","visible")},0)}).error(function(){c.removeFailedThumb(this)}).attr("src",h.attr("src")))},this));switch(n.length){case 0:return!1;case 1:m.hide();break;default:m.show()}return this};this.removeFailedThumb=function(b){a(b).closest("li").remove();switch(g.find("li:not(#LbThumbTemplate)").length){case 0:return r.close(),
!1;case 1:m.hide();break;default:m.show()}this.setDimensions(!0);this.selectThumb(s,0);return!0};this.setImage=function(b,d){if(b===void 0)return i.find("img.LbImg").not(e).remove(),e.css("display","").removeAttr("src"),this;var c,t=b.closest(u),f=b.parent(".LbTrigger").attr("href")||b.attr("src"),h=this;c=e.clone(!0).removeAttr("id").css("display","").attr("src","about:blank");var j=a.context(function(){i.find("img.LbImg").not(e).remove();c.css({maxWidth:i.width(),maxHeight:i.height()});c.prependTo(e.parent()).css({position:"static",
"margin-top":(i.height()-c.height())/2,visibility:"visible",display:""});c.attr("src",f);e.css("display","none").attr("src",f)},this);c.one("load",function(){setTimeout(j,0)}).one("error",function(){g.find("li:not(#LbThumbTemplate) a").each(function(b,c){a(c).data("src")==f&&h.removeFailedThumb(c)&&h.setImage(a(g.find("li:not(#LbThumbTemplate) a").get(Math.max(0,b-1))).data("el"),0)})});c.attr("src",f);this.selectThumb(f,d);this.setImageInfo(t,f);this.setContentLink(t);return this};this.selectThumb=
function(b,d){var c=g.find("li:not(#LbThumbTemplate) a");c.find("img").fadeTo(0,0.5);b===void 0&&(b=e.attr("src"));c.each(function(e,f){if(a(f).data("src")==b){s=b;l=e*(j+3);g.stop();if(d){var h={};h[XenForo.switchStringRTL("left")]=k-l;g.animate(h,d,function(){a(f).find("img").fadeTo(d/6,1)})}else g.css(XenForo.switchStringRTL("left"),k-l),a(f).find("img").fadeTo(0,1);a("#LbSelectedImage").text(e+1);a("#LbTotalImages").text(c.length);return!1}});return this};this.setDimensions=function(b){var d=
a(p).height()-r.getConf().top*2-a("#LbUpper").outerHeight()-a("#LbLower").outerHeight();i.css({height:d,lineHeight:0});o.find("img.LbImg").css({maxWidth:i.width(),maxHeight:d});k=Math.max(0,(g.parent().width()-(j+2))/2);b&&console.log("thumbOffset = "+k+", thumbShift = "+l);g.css(XenForo.switchStringRTL("left"),k-l);a("#LbReveal").css(XenForo.switchStringRTL("left"),k).show();return this};this.resetHeight=function(){i.css({height:"",lineHeight:""})};this.setImageInfo=function(b,d){var c=b.find("a.avatar"),
e=c.find("img"),f=!1;if(e.length)f=e.attr("src");else if(f=c.find("span.img").css("background-image"))f=f.replace(/^url\(("|'|)([^\1]+)\1\)$/i,"$2");f?a("#LbAvatar img").attr("src",f):a("#LbAvatar img").attr("src","rgba.php?r=0&g=0&b=0");a("#LbUsername").text(b.data("author"));a("#LbDateTime").text(b.find(".DateTime:first").text());a("#LbNewWindow").attr("href",d);return this};this.setContentLink=function(b){(b=b.attr("id"))?a("#LbContentLink, #LbDateTime").attr("href",p.location.href).attr("hash",
"#"+b):a("#LbContentLink").text("").removeAttr("href");return this}}})(jQuery,this,document);
