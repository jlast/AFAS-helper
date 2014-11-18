var _gaq = _gaq || [];
$(document).ready(function() {
	Configuration.Init();
	Calendar.Init();
	$('.js--tabs').tabs();
	if(Configuration.projecten.length === 0 && Configuration.articles.length === 0){
		$('.js--tabs').tabs({ selected: 1 });
	}
});