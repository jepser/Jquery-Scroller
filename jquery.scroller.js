(function( $ ) {
	
	var methods = {
		init : function( options ) {
			var settings = $.extend( {
			  'wrapper'         : '.items',
			  'speed' : 300,
			  'current' : 'current',
			  'prev' : '.prev',
			  'next' : '.next',
			  'direction' : 'left'
			}, options);
			
			return this.each(function(){
				var _this = $(this);
				var wrap = _this.find(settings.wrapper);
				var elem = _this.find(settings.wrapper + ' > *');
				var tagName = elem[0].tagName;
				var itemLength = elem.length;
				var itemWidth = elem.outerWidth() + parseFloat(elem.css('marginLeft')) + parseFloat(elem.css('marginRight'));
				
				$(this).data('scroller', {
					getSize : function(){
						return _this.find(settings.wrapper + ' > *').length;
					},
					moveTo : function(index, speed){
						if(speed == '') speed = settings.speed;
						animateItems(index, speed);
					},
					refresh : function(){
						itemLength = $(tagName, wrap).length;
					}
				});
				
				//init
				elem.first().addClass('current');
				
				//adds the current class
				function currentItem(i){
					$(tagName, _this).removeClass(settings.current).eq(i).addClass(settings.current);
				}
				
				//animate items
				function animateItems(items, speed){
					if(settings.direction = 'left') {
						wrap.animate({ left : - items * itemWidth  }, speed);
					} else {
						wrap.animate({ top : - items * itemWidth  }, speed);
					}
					if(items == itemLength){
						$(settings.next).addClass('disabled');
					}
					if(items == 0){
						$(settings.prev).addClass('disabled');
					}
					currentItem(items);
				}
				
				$(settings.next).click(function(e){
					var i = $('.current', wrap).index();
					if((i + 1) < itemLength){
						animateItems(i + 1, settings.speed);
						$(settings.prev).removeClass('disabled');
					}
					return false;
				});
				
				$(settings.prev).click(function(e){
					var i = $('.current', wrap).index();
					if((i - 1) >= 0){
						animateItems(i - 1, settings.speed);
						$(settings.next).removeClass('disabled');
					}
					return false;
				});
				
			});
			
		}
	}
	
	$.fn.scroller = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
		}    		
	};
})( jQuery );