window.simplicioTools={},function(a){simplicioTools.appearance={init:function(){this.setFullFrames(),this.setCopyNavigationHeight(),this.setSpecialLetters()},onResize:function(){this.setFullFrames(),this.setCopyNavigationHeight()},setFullFrames:function(){var b=a(window).height()-a(".simplicioNavigation .simplicioNavigationHeader").outerHeight();a(".simplicioFullFrame").each(function(c,d){a(this).height()<b&&a(this).height(b)})},setCopyNavigationHeight:function(){a(".simplicioNavigationHeight").each(function(b,c){a(this).height(a(".simplicioNavigation .simplicioNavigationHeader").outerHeight())})},setSpecialLetters:function(){a(".simplicioFirstParagraphFirstLetter").each(function(b,c){a(this).find("p").first().each(function(){var b=a(this).html(),c='<span class="simplicioLetter">'+b.charAt(0)+"</span>"+b.substring(1,b.length);a(this).html(c)})})}},simplicioTools.scroller={setScrollers:function(){var b=this;a(".simplicioScrollTo").each(function(c,d){var e=a(this).attr("data-scroll-to");a(this).on("click",function(a){a.preventDefault(),b.scrollTo(e)})})},scrollTo:function(b){var c=a(b).position();void 0!==c&&TweenLite.to(window,2,{scrollTo:{y:c.top-a(".simplicioNavigation .simplicioNavigationHeader").outerHeight()},ease:Power4.easeOut})}},simplicioTools.preload={containerImages:function(b){var c=a.Deferred(),d=this,e=a(b),f=a('<i class="fa fa-cog fa-spin"/>');e.parent().prepend(f),e.css("display","none");var g=d.preloadImages(e);return a.when(g).done(function(){e.css("display","block"),f.remove(),c.resolve()}),c.promise()},preloadImages:function(b){var c=a.Deferred(),d=[],e=function(){for(var a in d)if(!d[a].hasLoaded)return!1;return!0};return b.find("img").each(function(b,f){var g={};g.url=a(this).attr("src"),g.data=new Image,g.data.src=g.url,g.hasLoaded=!1,a(g.data).on("load",function(a){g.hasLoaded=!0,e()&&c.resolve()}),d.push(g)}),c.promise()}},a(document).ready(function(){simplicioTools.scroller.setScrollers(),simplicioTools.appearance.init()}),a(window).resize(function(a){simplicioTools.appearance.onResize()})}(jQuery);