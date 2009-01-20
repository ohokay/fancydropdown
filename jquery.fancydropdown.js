/* -------
	written by: Jeff Mehlhoff (jeffmehlhoff@gmail.com), in the first month of the two thousand and nineth year	
*/

(function(jQuery) {

	jQuery.fancydropdown = {
		// only one right now.
		defaults: {
			size_dropdown_to_fit: true,
			css_class_name: '.fancydropdown',
			header_class: ':header',
			add_default_styles: true,
			speed: '',
			add_hover_class: true,
			add_list_hover_class: true,
			return_false: false
		}
	};
	
	jQuery.fn.extend({
		fancydropdown:function(config) {
			//load configs from default hash, and the users config
			var config = jQuery.extend({}, jQuery.fancydropdown.defaults, config);
			// add base element identifier

			// if isn't assigned to the base document
			if(this[0] == document) {
				config.base_element = this;
			} else {
				config.base_element = "#" + this.attr("id");
			}
					
			//get the party started
			jQuery.fancypants(config);

			return this;
		}
	});

	jQuery.fancypants = function(config) {
		//total dropdowns found within the scope
		
		if(config.base_element[0] == document) //if document
		{
			dropdowns_found = jQuery(config.base_element).find(config.css_class_name).not('.is_fancy'); //find
		} else {
			dropdowns_found = jQuery(config.base_element).contents('div' + config.css_class_name); //find
		}
		
		if(dropdowns_found.length > 0)
		{	
			// add special class to each element
			jQuery(dropdowns_found).each(function()
			{
				//add relative positioning to main element if add_default_styles is true
				if(config.add_default_styles) {
					jQuery(this).css({
						position: 'relative'
					});
					jQuery(this).addClass('is_fancy');
				}
				
				if(config.add_hover_class) {
					jQuery(this).click(function() {
						$(this).toggleClass('fancydropdown_active');
					});
				}
				
				// Add header classes
				// Todo: Add conditional to make sure a header is specified
				var base = jQuery(this).find("" + config.header_class + ":first");
				jQuery(base).addClass('fancydropdown_header');
				
				var header_text = jQuery(base).html(); //add initial header text to a variable
				var selected_node = '';
				var selected_text = jQuery(base).html(); //variable holds the currently selected text
				
				//
				jQuery(this).find(".fancydropdown_selected:first").each(function(){
					jQuery(base).html(jQuery(this).html());
					selected_text = jQuery(this).html();
				});
				
				// add cursor: pointer if wanted
				if(config.add_default_styles) {
					jQuery(base).css({ cursor: 'pointer' });
				}
				//find target list
				var list = jQuery(this).find("ul:first");
				
				// Add mouse event to the header element
				jQuery(base).click(function(){
						jQuery(base).html(header_text);
						jQuery(list).toggle(config.speed);
				});
				
				// Hide list elements
				jQuery(list).css({
					position: 'relative',
					display: 'none',
					overflow: 'auto'
				});
				
				// check for clicks outside of the dropbox
				$(document).click(function(e){
					if($(e.target).attr("class") == '')
					{
						jQuery(list).hide(config.speed); // hide
						jQuery(base).html(selected_text);
					}
				});
				
				//list element links
				jQuery(list).find("li").click(function(){	
					
					jQuery(base).html(jQuery(this).html());
					selected_text = jQuery(this).html(); // added current selection to variable
					
					// search for dropdowns
					jQuery(list).find("li.fancydropdown_selected").each(function(){
						jQuery(this).removeClass('fancydropdown_selected');
					});
					
					jQuery(this).addClass('fancydropdown_selected');
					
					jQuery(list).hide(config.speed); // hide
					
					if(config.return_false) {
						return false;
					}
					
					if(config.add_hover_class) {
						jQuery(this).click(function() {
							$(this).toggleClass('fancydropdown_active');
						});
					}
					
				});
			});
		}
	} //end $.fancypants

})(jQuery);