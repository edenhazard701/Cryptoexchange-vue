/**
 * @author asoocool
 */



function DDManager(acomp)
{
	this.acomp = acomp;
	
	this.isDraggable = false;
	this.isDroppable = false;
	
	this.touchStart = null;
	this.touchMove = null;
	this.touchEnd = null;
	this.touchCancel = null;
	
	this.option = 
	{
		isDropPropagation: false,
		direction: DDManager.DIR_BOTH 
	};
	
	this.dragBound = null; //{left:0, top:0, right:0, bottom:0};
	this.offsetX = 0;
	this.offsetY = 0;
}

DDManager.DROP_CLASS = 'drop_group';
DDManager.DIR_BOTH = 0;
DDManager.DIR_VERTICAL = 1;
DDManager.DIR_HORIZENTAL = 2;

DDManager.prototype.setDDOption = function(option)
{
	for(var p in option)
	{
		//if(!option.hasOwnProperty(p)) continue;
		if(this.option[p]!=undefined) this.option[p] = option[p];
	}
};

DDManager.prototype.setDragBound = function(bound)
{
	this.dragBound = bound;
};

DDManager.prototype.setOffset = function(offsetX, offsetY)
{
	this.offsetX = offsetX;
	this.offsetY = offsetY;
};


DDManager.prototype.enableDrag = function(isDraggable)
{
	if(this.isDraggable==isDraggable) return;
	
    this.isDraggable = isDraggable;
    
    var thisObj = this, dragComp = this.acomp, dragEle;	//실제로 드래그 될 dom
    
    //listview item
    if(dragComp.item) dragEle = $(dragComp.item);
    else dragEle = dragComp.$ele;
    
    if(this.isDraggable)
    {
		var boxObj, halfX, halfY, dragSX, dragSY, isStart,
			isDown = false;
		
		function _dragSet()
		{
			dragEle.css('z-index', 99999);
			
			boxObj = dragEle[0].getBoundingClientRect();
			halfX = parseInt(boxObj.width/2, 10);
			halfY = parseInt(boxObj.height/2, 10);
			dragSX = boxObj.left + halfX - thisObj.offsetX;
			dragSY = boxObj.top + halfY - thisObj.offsetY;
			isStart = false;
			
			//미리 동작시켜두면 속도가 향상된다. 0.001 타임을 조금이라도 줘야 함.
			//dragEle.anima({translateX:0, translateY:0}, 0.001, 'linear');
		}

		_dragSet();

		this.touchStart = function(e) 
		{
			isDown = true;
		
			e.preventDefault();
			e.stopPropagation();
			
			_dragSet();
		};

		this.touchMove = function(e) 
		{
			if(!isDown) return;
			
			e.preventDefault();
			e.stopPropagation();
			
			var touchs = e.changedTouches[0];
			var touchX = touchs.clientX, touchY = touchs.clientY; 
			
			if(thisObj.dragBound)
			{
				if(touchX<thisObj.dragBound.left) touchX = thisObj.dragBound.left;
				else if(touchX>thisObj.dragBound.right) touchX = thisObj.dragBound.right;
				
				if(touchY<thisObj.dragBound.top) touchY = thisObj.dragBound.top;
				else if(touchY>thisObj.dragBound.bottom) touchY = thisObj.dragBound.bottom;
			}
			
			switch(thisObj.option.direction)
			{
				case 0: dragEle.anima({translateX:touchX-dragSX, translateY:touchY-dragSY}, 0, 'linear'); break;
				case 1: dragEle.anima({translateY:touchY-dragSY}, 0, 'linear'); break;
				case 2: dragEle.anima({translateX:touchX-dragSX}, 0, 'linear'); break;
			}
			
			if(!isStart)
			{
				isStart = true;
				
				//이벤트로 처리하지 말고 함수 오버라이딩으로 처리
				//dragComp.reportEvent('dragStart', touchs, 1);
			}
		};

		this.touchEnd = function(e) 
		{
			if(!isDown) return;
			isDown = false;
		
			e.preventDefault();
			e.stopPropagation();
			
			var touchs = e.changedTouches[0];
			var touchX = touchs.clientX, touchY = touchs.clientY;
			
			if(thisObj.dragBound)
			{
				if(touchX<thisObj.dragBound.left) touchX = thisObj.dragBound.left+1;
				else if(touchX>thisObj.dragBound.right) touchX = thisObj.dragBound.right-1;
				
				if(touchY<thisObj.dragBound.top) touchY = thisObj.dragBound.top+1;
				else if(touchY>thisObj.dragBound.bottom) touchY = thisObj.dragBound.bottom-1;
			}
			
			//dragEle.anima({translateX:0, translateY:0}, 0.001, 'linear');
			/*
			dragEle.css(
			{ 
				left: (touchs.clientX-halfX)+'px', 
				top: (touchs.clientY-halfY)+'px' 
			});
			*/

			$( $('.'+DDManager.DROP_CLASS+':visible').get().reverse() ).each(function()
			{
				if(dragEle[0]===this) return;
				
				//drop 영역
				var dropBox = this.getBoundingClientRect();

				if(dropBox.left<=touchX && dropBox.right>=touchX &&
				   dropBox.top<=touchY && dropBox.bottom>=touchY)
				{
					var info = 
					{
						'dropComp': dragComp, 
						'clientX': (touchX-dropBox.left-halfX),
						'clientY': (touchY-dropBox.top-halfY)
					};
					
					var droppable = this.acomp;
					if(!droppable) droppable = this.view;	//listview item
					
					//droppable.reportEvent('drop', info, 1);
					
					if(!droppable.ddManager.option.isDropPropagation) return false;
				}
			});
			
			//dragComp.reportEvent('dragEnd', touchs, 1);
		};
		
		this.touchCancel = function(e) 
		{
			thisObj.touchEnd(e);
			
			//e.preventDefault();
			//e.stopPropagation();
			//dragComp.reportEvent('dragFail', touchs);
		};

		AEvent.bindEvent(dragEle[0], AEvent.ACTION_DOWN, this.touchStart);
		AEvent.bindEvent(dragEle[0], AEvent.ACTION_MOVE, this.touchMove);
		AEvent.bindEvent(dragEle[0], AEvent.ACTION_UP, this.touchEnd);
		AEvent.bindEvent(dragEle[0], AEvent.ACTION_CANCEL, this.touchCancel);
	}
	else
	{
		AEvent.unbindEvent(dragEle[0], AEvent.ACTION_DOWN, this.touchStart);
		AEvent.unbindEvent(dragEle[0], AEvent.ACTION_MOVE, this.touchMove);
		AEvent.unbindEvent(dragEle[0], AEvent.ACTION_UP, this.touchEnd);
		AEvent.unbindEvent(dragEle[0], AEvent.ACTION_CANCEL, this.touchCancel);
		
		this.touchStart = null;
		this.touchMove = null;
		this.touchEnd = null;
		this.touchCancel = null;
		
		dragEle.css(
		{
			'-webkit-transform': '',
			'-webkit-transition-property': '',
			'-webkit-transition-duration': '',
			'-webkit-transition-timing-function': '',
			'-webkit-transition-delay': ''
		});
	}
};

DDManager.prototype.enableDrop = function(isDroppable)
{
	if(this.isDroppable==isDroppable) return;
	
    this.isDroppable = isDroppable;
    
    var dropEle = null;
    
    //listview item
    if(this.acomp.item) dropEle = $(this.acomp.item);
    else dropEle = this.acomp.$ele;
    
    if(this.isDroppable) dropEle.addClass(DDManager.DROP_CLASS);
	else dropEle.removeClass(DDManager.DROP_CLASS);
};

