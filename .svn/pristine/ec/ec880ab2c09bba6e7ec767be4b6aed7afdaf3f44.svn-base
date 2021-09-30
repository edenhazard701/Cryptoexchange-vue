// $(function () {
// 	slideMenu(); //모바일 메뉴
// 	layerPopup(); //레이어팝업
// 	lang(); //언어선택
// 	reward(); //나의 보상확인
// 	eventBtnMotion(); //사전가입 이벤트 모션
// 	anc(); //앵커
// 	//mouseEvent(); //마우스휠 이벤트
// 	//countNumber(); //사전가입자 수 카운트
// 	//사전가입자 수 카운트 30초마다 반복 실행
// 	setInterval(function()
// 	{
// 		 countNumber(); //사전가입자 수 카운트
// 	},30000);
// })

//모바일 메뉴
function slideMenu(){
	openSlideMenu(); //모바일 메뉴 열기
	closeSlideMenu(); //모바일 메뉴 닫기
}

//모바일 메뉴 열기
function openSlideMenu(){
	$(".btn-menu-mo").click(function(){
		$(".menu-mo").toggle("slide", {direction:"right"}, 400);
	});
}

//모바일 메뉴 닫기
function closeSlideMenu(){
	//닫기 버튼
	$(".menu-mo > .btn-close").click(function(){
		$(".menu-mo").toggle("slide", {direction:"right"}, 400);
	});

	//딤드 클릭
	$("body").on("click", ".dim", function(e){
		$(".menu-mo").toggle("slide", {direction:"right"}, 400);
	});

	//딤드 클릭
	$(".menu-mo .menuListClose").click(function(e){
		$(".menu-mo").toggle("slide", {direction:"right"}, 400);
	});
}

//언어선택
function lang(){
	$(".header > .btn-lang").click(function(){
		if (!$(this).hasClass("on")) {
			$(this).addClass("on");
		}else{
			$(this).removeClass("on");
		}
		$(".header > .lang").toggle();
	});
}

//나의 보상확인
// function reward(){
// 	$(".section03 .btn-email").click(function(){
// 		var dp = $(".reward-box").css("display")

// 		if (dp == "none") {
// 			$(".reward-box").slideDown();
// 		}
// 	});
// }

//레이어팝업
function layerPopup(){
	var overlay =  ("<div class='modal-overlay'></div>");

	//open
	$(document).on("click", "button[data-modal-id]", function(e){
		$("body").append(overlay);
    $(".modal-overlay").fadeTo(300, 0.7);
    //$(".js-modalbox").fadeIn(500);
		var modalBox = $(this).attr('data-modal-id');
		console.log('modalBox = ', modalBox)
		console.log(this)
		console.log($(this).data())

		$('#'+modalBox).fadeIn($(this).data());
	});

	//close
	$(document).on("click", ".js-modal-close-info", function(e){
		$(".modal-box, .modal-overlay").fadeOut(300, function() {
	      $(".modal-overlay").remove();
	  })
	})

	$(window).resize(function() {
    $(".modal-box").css({
      top: ($(window).height() - $(".modal-box").outerHeight()) / 2,
      left: ($(window).width() - $(".modal-box").outerWidth()) / 2
    });

	});

	$(window).resize();
}


//앵커 이동
function anc(){
	//앵커 클릭 애니메이션
	$(".anc > li > a").click(function(e){
		e.preventDefault();
		$('html, body').animate(
			{scrollTop: $($(this).attr('href')).offset().top}
			, 400);
	})

	//비주얼 스크롤 버튼 클릭
	$(".move-scroll > a").click(function(e){
		e.preventDefault();
		$('html, body').animate(
			{scrollTop: $($(this).attr('href')).offset().top}
			, 400);

		$(".anc > li").each(function(idx){
			$(".anc > li").eq(idx).removeClass("active");
			$(".anc > li").eq(1).addClass("active");
		});
	})

  //앵커 클릭 시 현재 앵커 표시
	$(".anc > li").click(function(){

		$(".anc > li").removeClass("active");
		var index = $(this).index();
		$(".anc > li").eq(index).addClass("active");

	});
}

//이벤트 영역 애니메이션
function eventView(){
	if ($(".event-box > .event01").css("display") == "none" && $(".event-box > .event02") .css("display") == "none") {
		$(".event-box > .event01").toggle("slide", {direction:"left"}, 1000);
		$(".event-box .detail .text-box").css("opacity", 0);
		$(".event-box > .event01").animate({marginTop: '-23px'}, 1000);
		$(".event-box > .event02").toggle("slide", {direction:"right"}, 1000);
		$(".event-box > .event02").animate({marginTop: '23px'}, 1000);
	}
}


//사전가입 이벤트 모션
function eventBtnMotion(){
// eventBtnMotion = () => {
	if (matchMedia("(min-width: 1081px)").matches) {
		//console.log("pc");
  	//1080px 초과
		//사전가입 보상 열기 버튼
		$(".event.event01 .btn-detail.open").click(function(){
			
			if (!$(".event-box .event.event01 + .detail").hasClass("anim")) {
				$(".event-box .detail .text-box").css("opacity", 1);

				$(".event-box .event.event01 + .detail").toggle("slide", {direction:"left"}, 400);
				$(".event-box .event.event02").css("opacity", 0);
				$(".event-box .event.event01 + .detail").addClass("anim");
				$(".event.event01 .btn-detail.open").toggle();

			}
		});
		//사전가입 보상 닫기 버튼
		$(".event-box .event.event01 + .detail > .btn-detail.close").click(function(){
			// alert();
			if ($(".event-box .event.event01 + .detail").hasClass("anim")) {
				$(".event-box .event.event01 + .detail").toggle("slide", {direction:"left"}, 400);
				$(".event-box .event.event02").css("opacity", 1);
				$(".event-box .event.event01 + .detail").removeClass("anim");
				$(".event.event01 .btn-detail.open").toggle();
			}
		});
		//레퍼럴 보상 열기 버튼
		$(".event.event02 .btn-detail.open").click(function(){
			$(".event-box .event.event02").animate({marginLeft: '-50%'}, 400);
			$(".event-box .event.event01").css("opacity", 0);
			$(".event-box .detail .text-box").css("opacity", 1);
			$(".event-box .event.event02").css("position", "relative");
			$(".event-box .event.event02 + .detail").toggle("slide", {direction:"right"}, 400);
			$(".event-box .event.event02 .e-title > .btn-detail.open").toggle();
			$(".event-box .event.event02").css("border-top-right-radius", 0);
			$(".event-box .event.event02").css("border-bottom-right-radius", 0);
			$(".event-box .event.event02").css("border-top-left-radius", "10px");
			$(".event-box .event.event02").css("border-bottom-left-radius", "10px");
		});
		//레퍼럴 보상 닫기 버튼
		$(".event-box .event.event02 + .detail > .btn-detail.close").click(function(){
			$(".event-box .event.event02").animate({marginLeft: '0'}, 400);
			$(".event-box .event.event01").css("opacity", 1);
			$(".event-box .event.event02").css("position", "inherit");
			$(".event-box .event.event02 + .detail").toggle("slide", {direction:"right"}, 400);
			$(".event-box .event.event02 .e-title > .btn-detail.open").toggle();
			$(".event-box .event.event02").css("border-top-right-radius", "10px");
			$(".event-box .event.event02").css("border-bottom-right-radius", "10px");
			$(".event-box .event.event02").css("border-top-left-radius", 0);
			$(".event-box .event.event02").css("border-bottom-left-radius", 0);
		});
	}else {
		// 1080px 이하
		//console.log("mobile");
		
		//사전가입 보상 열기/닫기
		$(".event-box .event.event01 .btn-detail.open").click(function(){
			// alert();
			$(".event-box .event.event01 + .detail").slideToggle();
			$(".event-box .event.event01 + .detail").css("position", "relative");

			if (!$(this).hasClass("close")) {
				$(this).addClass("close");
			}else{
				$(this).removeClass("close");
			}
		});

		//레퍼럴 보상 열기/닫기
		$(".event-box .event.event02 .btn-detail.open").click(function(){
			$(".event-box .event.event02 + .detail").slideToggle();
			$(".event-box .event.event02 + .detail").css("position", "relative");

			if (!$(this).hasClass("close")) {
				$(this).addClass("close");
			}else{
				$(this).removeClass("close");
			}
		});

	}
}


// PmtMain 이동

// $(window).scroll(function(){
// 	//헤더 고정
// 	if ($(".wrap").hasClass("type-main")) {
// 		if ($(document).scrollTop() > 0) {
// 			$(".header").addClass("add-bg");
// 		}else{
// 			$(".header").removeClass("add-bg");
// 		}
// 	}

// 	var pos = $(document).scrollTop();
// 	// console.log(pos);

// 	var position01 = $(".section01").offset().top;
// 	var position02 = $(".section02").offset().top;
// 	var position02_minus = position02 - 80;
// 	var position03 = $(".section03").offset().top;
// 	var position04 = $(".section04").offset().top;
// 	var position05 = $(".section05").offset().top;

// 	if(pos == position01){
// 		$(".anc").removeClass("no-visual");
// 	}
// 	else if (pos == position01 || pos < position02_minus) {
// 		$(".anc > li").each(function(idx){
// 			$(".anc > li").eq(idx).removeClass("active");
// 			$(".anc > li").eq(0).addClass("active");
// 			$(".anc").addClass("no-visual");
// 		});
// 	}else if (pos < position02_minus || pos < position03) {
// 		countNumber(); //사전가입자 수 카운트
// 		eventView(); //사전가입보상, 레퍼럴보상 show 이벤트
// 		$(".anc > li").each(function(idx){
// 			$(".anc > li").eq(idx).removeClass("active");
// 			$(".anc > li").eq(1).addClass("active");
// 			$(".anc").addClass("no-visual");
// 		});

// 	}else if (pos == position03 || pos < position04) {
// 		$(".anc > li").each(function(idx){
// 			$(".anc > li").eq(idx).removeClass("active");
// 			$(".anc > li").eq(2).addClass("active");
// 			$(".anc").addClass("no-visual");
// 		});
// 	}else if (pos == position04 || pos < position05) {
// 		$(".anc > li").each(function(idx){
// 			$(".anc > li").eq(idx).removeClass("active");
// 			$(".anc > li").eq(3).addClass("active");
// 			$(".anc").addClass("no-visual");
// 		});
// 	}else if (pos == position05 || pos > position04) {
// 		$(".anc > li").each(function(idx){
// 			$(".anc > li").eq(idx).removeClass("active");
// 			$(".anc > li").eq(4).addClass("active");
// 			$(".anc").addClass("no-visual");
// 		});
// 	}
// });

//마우스휠 이벤트
function mouseEvent(){
	if (matchMedia("(min-width: 1081px)").matches) {
		var current;
		$('body').mousewheel(function(event, delta) {
				var $current = $('div.current');

				console.log("delta : "+delta);
				console.log("current"+$current);

				if (delta > 0) {
						$prev = $current.prev();

						if ($prev.length) {
							//첫번째 섹션이 아닌 경우에만 prev에 current 클래스 추가
							if (!$(".section01").hasClass("current")) {
								$('body').scrollTo($prev);
								$current.removeClass('current');
								$prev.addClass('current');
							}
						}
				} else {
						$next = $current.next();

						if ($next.length) {
							$('body').scrollTo($next);
							$current.removeClass('current');
							$next.addClass('current');
						}
				}
				event.preventDefault();
		});
	}
}

//사전가입자 수 카운트
function countNumber(){
	$('.counting').each(function() {
  var $this = $(this),
      countTo = $this.attr('data-count');

  $({ countNum: $this.text()}).animate({
    countNum: countTo
  },
  {
    duration: 500,
    easing:'linear',
    step: function() {
      $this.text(Math.floor(this.countNum));
    },
    complete: function() {
			var total = this.countNum;

			$this.text(numberWithCommas(total));
    }
  });
});
}

//천단위 콤마
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
