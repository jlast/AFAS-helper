$(document).ready(function() {
	Configuration.Init();
	Calendar.Init();
	$('.js--tabs').tabs();
	if(Configuration.projecten.length === 0 && Configuration.articles.length === 0){
		$('.js--tabs').tabs({ selected: 1 });
	}
	$('button, a, input[type=button]').click(function(){
		var category = 'button';
		var action = 'click';
		var label = $(this).text();
		TrackAnalytics(page, category, action, label);
	});
	
});