function simpleDragDirective() {
	
	var setPosition = function (event, element, offsetX, offsetY) {
		var newLeft,
			newTop;

		if (event.pageX && event.pageY) {
			newLeft = event.pageX - offsetX;
			newTop = event.pageY - offsetY;
			
			element.css("left", newLeft);
			element.css("top", newTop);
		}
	};
	
	return  {
		link: function (scope, element, attr) {
			var offsetX = 0;
			var offsetY = 0;
			element.bind({
				dragstart: function (e) {
					var event = e.originalEvent;
					offsetX = event.offsetX;
					offsetY = event.offsetY;

					setPosition(event, element, offsetX, offsetY);

					element.css("position", "absolute");
				},
				dragover: function (e) {
					var event = e.originalEvent;
					e.stopPropagation();
					e.preventDefault();
					var dt = e.originalEvent.dataTransfer;
					dt.effectAllowed = dt.dropEffect = 'none';

					setPosition(event, element, offsetX, offsetY);
				},
				dragenter: function (e) {
					e.stopPropagation();
					e.preventDefault();
					var dt = e.originalEvent.dataTransfer;
					dt.effectAllowed = dt.dropEffect = 'none';
				}
			});
		}
	}
}