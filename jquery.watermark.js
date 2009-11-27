/*
 * jQuery Watermark plugin
 * Version 1.0-rc2 (12-NOV-2009)
 * @requires jQuery v1.2.3 or later
 *
 * Examples at: http://mario.ec/static/jq-watermark/
 * Copyright (c) 2009 Mario Estrada
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function($)
{
	$.fn.watermark = function(text, css_options){
		css = $.extend({
			color : '#999',
			left: 4
		}, css_options);
		
		return this.each(function()
		{
			var $elem = $(this);
			var label_text = text === undefined ? $(this).attr('title') : title;
			var watermark_container = $('<span class="watermark_container" style="position: relative"></span>');
			var watermark_label = $('<span class="watermark">' + label_text + '</span>');
			
			watermark_container.css({
				float: $elem.css('float'),
				height: $elem.css('height')
			});
			
			$elem.wrap(watermark_container);
			
			if(this.nodeName != 'TEXTAREA')
			{
				var height = $elem.outerHeight();
				var top = '50%';
			}else{
				var pos = $elem.position();
				var top = pos.top + parseInt($elem.css('padding-top')) + parseInt($elem.css('margin-top')) + parseInt($elem.css('border-top-width'));
				var height = $elem.css('line-height');
			}
			
			checkVal($elem.val(), watermark_label);
			
			watermark_label.css({
				position: 'absolute',
				fontFamily: $elem.css('font-family'),
				fontSize: $elem.css('font-size'),
				color: css.color,
				left: (parseInt($elem.css('padding-left')) + css.left) + 'px',
				top: top,
				height: height + 'px',
				lineHeight: height + 'px',
				marginTop: '-' + (height / 2) + 'px',
				marginLeft: $elem.css('margin-left')
			});
			
			watermark_label.click(function()
			{
				$(this).next().focus();
			})

			$elem.before(watermark_label)
			.focus(function()
			{
				checkVal($(this).val(), watermark_label);
				watermark_label.animate({ opacity : 0.7}, 250);
			})
			.blur(function()
			{
				checkVal($(this).val(), watermark_label);
				watermark_label.animate({ opacity : 1}, 250);
			})
			.keydown(function(e)
			{
				$(watermark_label).hide();
			});
		});
	};
	
	checkVal = function(val, label)
	{
		if(val == '') 
			$(label).show();
		else 
			$(label).hide();
	};
	
	$(document).ready(function()
	{
		$('input.jq_watermark[type=text], textarea.jq_watermark, input[type=password].jq_watermark,').each(function(){
			$(this).watermark();
		});
	});
})(jQuery);